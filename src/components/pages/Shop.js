import React, {Component} from 'react';
import {  MDBDataTable, MDBBtn, MDBInput,MDBContainer,MDBModal, MDBModalBody,MDBModalHeader, MDBModalFooter } from "mdbreact";
import GlobalSetting from '../GlobalSetting';
import {getAllProduct,editProduct,add} from '../Functions/shopFunctions';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const validNumberRegex = RegExp(/^[+-]?([0-9]*[.])?[0-9]+$/);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)

    );
    return valid;
}

class Shop extends Component {
    constructor() {
        super()
        this.state={
            columns: [
                {'label': 'No', 'field': 'ID'},
                {'label': 'CODE', 'field': 'CODE'},
                {'label': 'PRICE', 'field': 'PRICE'},
                {'label': 'Edit', 'field': 'edit'},
                {'label': 'Delete', 'field': 'delete'}
            ],
            rows:[],
            deleteModal:false,
            input: '',
            stock_code:'',
            price:'',
            brand:'',
            errors: {
                stock_code: '',
                price: '',
                brand: '',
            },
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange (e) {
        alert();
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
     * validation
     * @param event
     */
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'stock_code':
                errors.name =
                    value.length < 4
                        ? 'STOCK_CODE  must be 4 characters long!'
                        : '';
                break;
            case 'price':
                errors.price =
                    validNumberRegex.test(value)
                        ? ''
                        : 'Number is not valid!';
                break;
            case 'brand':
                errors.brand =
                    value.length < 2
                        ? 'Brand must be 2 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value});
    }


    componentDidMount() {
        this.getProducts();
    }
    getProducts()
    {
        getAllProduct().then(json => {
            let rows = [];
            json.forEach(item => rows.push({
                ID: item.ID,
                CODE: item.CODE,
                PRICE: item.PRICE,
                delete: <MDBBtn color="info" data-toggle="modal" onClick={() => this.deleteProductModal(item.ID)}>X</MDBBtn>,
                edit: <MDBBtn color="info"  data-toggle="modal" onClick={() => this.editProductModal(item.ID)}>Edit</MDBBtn>,
            }));
            this.setState({ rows });
        })
            .catch(err => console.error(err));
    }
    deleteProductModal(id)
    {
        this.setState({ deleteModal:true,id:id})
    }
    editProductModal(id)
    {
        editProduct(id).then(res=>{
            this.setState({
                    stock_code:res.product.CODE,
                    price:res.product.PRICE,
                    brand:res.product.BRAND,
                    ID:res.product.ID
            })
        })
        this.setState({
            editModal:true,
            id:id
        })
    }
    onSubmit(e)
    {

        e.preventDefault();
        let NewProduct={
            stock_code:this.state.stock_code,
            price:this.state.price,
            brand:this.state.brand,
            ID:this.state.ID
        }

        add(NewProduct).then(res => {

            if (res.statusText=="OK")
            {
                GlobalSetting.createNotification('success','Record Submitted Successfully');
                this.getProducts();
            }

        })
            .catch(err => console.error(err));
       this.editToggle();
    }
    deleteProduct = () => {

        let id=this.state.id;
        let uri = GlobalSetting.url + `product/delete/`;
        fetch(uri+`${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.usertoken}`}
        }).then(res => {

           console.log(res)
            if (res.statusText=="OK")
            {
                GlobalSetting.createNotification('success','Deleted Successfully.');
                this.getProducts();
            }

        })
            .catch(err => console.error(err));
    }

    addToggle=()=>{
        this.setState({
            modal:!this.state.addModal,
            addModal:false
        })
    }
    deleteToggle=()=>
    {
        this.setState({
            modal: !this.state.deleteModal,
            deleteModal:false
        });
    }

    editToggle=()=>
    {
        this.setState({
            modal: !this.state.editModal,
            editModal:false,

        })
    }
    render ()
    {
        const data = {
            columns: this.state.columns,
            rows :this.state.rows

        };
        const {errors} = this.state;
        return (

            <>
                <div className="text-right "><MDBBtn onClick={() => this.setState({ addModal:true, editModal:false}) } class="btn btn-info btn-sm" data-target="#modalAdd" color="info "  >Add Product</MDBBtn></div>
                <MDBModal isOpen={this.state.deleteModal}  onClose={() => this.setState({ deleteModal:false})} tabindex="-1" role="dialog">
                    <form noValidate onSubmit={this.deleteProduct}>
                        <MDBModalHeader toggle={this.deleteToggle}>Delete Product</MDBModalHeader>
                        <MDBModalBody>
                            <h6>Are you sure Want to Delete this record..?</h6>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.deleteToggle}>Close</MDBBtn>
                            <MDBBtn type="submit"  color="primary">Yes</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBModal isOpen={this.state.addModal}  onClose={() => this.setState({ addModal:false})} tabindex="-1" role="dialog">
                    <form noValidate onSubmit={this.onSubmit}>
                        <MDBModalHeader toggle={this.addToggle}>Add Product</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput  icon="user"   name="stock_code"    onChange={this.handleChange} noValidate   />
                            {errors.stock_code.length > 0 &&
                            <span className='error'>{errors.stock_code}</span>}
                            <MDBInput  icon="lock"   name="price"   onChange={this.handleChange} noValidate   />
                            {errors.price.length > 0 &&
                            <span className='error'>{errors.price}</span>}
                            <MDBInput  icon="inbox"  name="brand"    onChange={this.handleChange} noValidate  />
                            {errors.brand.length > 0 &&
                            <span className='error'>{errors.brand}</span>}

                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.addToggle}>Close</MDBBtn>
                            <MDBBtn type="submit"  color="primary">Add</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBModal isOpen={this.state.editModal}  onClose={() => this.setState({ editModal:false})} tabindex="-1" role="dialog">
                    <form noValidate onSubmit={this.onSubmit}>
                        <MDBModalHeader toggle={this.editToggle}>Edit Product</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput  icon="user"   name="stock_code"  value={this.state.stock_code}  onChange={this.handleChange} noValidate   />
                            {errors.stock_code.length > 0 &&
                            <span className='error'>{errors.stock_code}</span>}
                            <MDBInput  icon="lock"   name="price"  value={this.state.price} onChange={this.handleChange} noValidate   />
                            {errors.price.length > 0 &&
                            <span className='error'>{errors.price}</span>}
                            <MDBInput  icon="inbox"  name="brand"  value={this.state.brand}  onChange={this.handleChange} noValidate  />
                            {errors.brand.length > 0 &&
                            <span className='error'>{errors.brand}</span>}

                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.editToggle}>Close</MDBBtn>
                            <MDBBtn type="submit"  color="primary">Yes</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />
                <NotificationContainer/>
            </>
        );
    }
}
export default Shop;