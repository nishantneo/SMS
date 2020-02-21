import React from "react";
import {  MDBDataTable, MDBBtn, MDBInput,MDBContainer,MDBModal, MDBModalBody,MDBModalHeader, MDBModalFooter } from "mdbreact";
import GlobalSetting from '../GlobalSetting';

import {add, getProfile,fetchUser} from '../Functions/UserFunctions';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)

    );
    return valid;
}

class Task extends React.Component {

    constructor() {
        super()
        this.state = {
            columns: [
                {
                    field: 'id',
                    label: 'No'
                },
                {
                    field: 'name',
                    label: 'Name'
                },
                {
                    field: 'email',
                    label: 'Email'
                },
                {
                    field: 'edit',
                    label: 'Edit'
                },
                {
                    field: 'delete',
                    label: 'Delete'
                }
            ],
            rows: [],
            user: [],
            input: '',
            name: '',
            email:'',
            password:'',
            id:'',
            errors: {
                name: '',
                email: '',
                password: '',
            },
            modal: false,
            showModal2:false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'name':
                errors.name =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value});
    }
    onSubmit (e) {
        e.preventDefault()

        const newTask = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        console.log('hhh')
        if(validateForm(this.state.errors)) {
            add(newTask).then(res => {
                if (res.ok)
                {
                    GlobalSetting.createNotification('success','Record Submitted Successfully.');
                    this.getTasks();
                }
            })
        }
        else
        {
            console.log('Invalid Form')
            this.props.history.push(`/task`)
        }
        this.addToggle();
    }
    addToggle = () => {

        this.setState({
            modal: !this.state.showModal2,
            showModal1:false
        });
    }
    editToggle = () => {

        this.setState({
            modal: !this.state.showModal2,
            showModal2:false
        });
    }
    deleteToggle = () => {

        this.setState({
            modal: !this.state.deleteModal,
            deleteModal:false
        });
    }

    componentDidMount() {
        this.getTasks();

    }

    getTasks = () => {

        let uri = GlobalSetting.url + `userlists/`;
        fetch(uri, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.usertoken}`}
        })
            .then(res => res.json())
            .then(json => {
                let rows = [];
                json.forEach(item => rows.push({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    delete: <MDBBtn color="info" class="btn btn-info btn-sm" data-toggle="modal" onClick={() => this.deleteTaskModal(item.id)}>X</MDBBtn>,
                    edit: <MDBBtn color="info" class="btn btn-info btn-sm"  data-toggle="modal" onClick={() => this.editTask(item.id)}>Edit</MDBBtn>,

                }));

                this.setState({ rows });
            })
            .catch(err => console.error(err));
    }



    updateInput = (value) => this.setState({ input: value });

    deleteTask = () => {
        let id=this.state.id;
        let uri = GlobalSetting.url + `user/delete/`;
        fetch(uri+`${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.usertoken}`}
        }).then(res => {
            if (res.ok)
            {
                GlobalSetting.createNotification('success','Deleted Successfully.');
              //  this.getTasks();
            }

        })
            .catch(err => console.error(err));
    }

    editTask = (id) => {
        fetchUser(id).then(res => {
            this.setState({
                name: res.user.name,
                email: res.user.email,
                password: res.user.password,
            })
        })
        this.setState({ showModal2:true, showModal1:false})
    }

    deleteTaskModal = (id) => {
        fetchUser(id).then(res => {
            this.setState({
                id: res.user.id,
            })
        })

        this.setState({ deleteModal:true, showModal1:false,id:id})
    }

    render() {
        const {errors} = this.state;
        return (
            <>
                <div className="text-right "><MDBBtn onClick={() => this.setState({ showModal1:true, showModal2:false}) } class="btn btn-info btn-sm" data-target="#modalAdd" color="info "  >Add Task</MDBBtn></div>
                <MDBModal isOpen={this.state.showModal1}  toggle={this.addToggle}>
                    <form noValidate onSubmit={this.onSubmit}>
                        <MDBModalHeader toggle={this.addToggle}>Add User</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput  icon="user"   name="name"    onChange={this.handleChange} noValidate placeholder="User"  />
                            {errors.name.length > 0 &&
                            <span className='error'>{errors.name}</span>}
                            <MDBInput  icon="lock"   name="password"   onChange={this.handleChange} noValidate  placeholder="Password " />
                            {errors.password.length > 0 &&
                            <span className='error'>{errors.password}</span>}
                            <MDBInput  icon="inbox"  name="email"    onChange={this.handleChange} noValidate  />
                            {errors.email.length > 0 &&
                            <span className='error'>{errors.email}</span>}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.addToggle}>Close</MDBBtn>
                            <MDBBtn type="submit"  color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBModal isOpen={this.state.showModal2}  onClose={() => this.setState({ showModal2:false})} tabindex="-1" role="dialog">
                    <form noValidate onSubmit={this.onSubmit}>
                        <MDBModalHeader toggle={this.editToggle}>Edit User</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput  icon="user"   name="name"  value={this.state.name}  onChange={this.handleChange} noValidate placeholder="User"  />
                            {errors.name.length > 0 &&
                            <span className='error'>{errors.name}</span>}
                            <MDBInput  icon="lock"   name="password"  value={this.state.password} onChange={this.handleChange} noValidate  placeholder="Password " />
                            {errors.password.length > 0 &&
                            <span className='error'>{errors.password}</span>}
                            <MDBInput  icon="inbox"  name="email"  value={this.state.email}  onChange={this.handleChange} noValidate  />
                            {errors.email.length > 0 &&
                            <span className='error'>{errors.email}</span>}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.editToggle}>Close</MDBBtn>
                            <MDBBtn type="submit"  color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBModal isOpen={this.state.deleteModal}  onClose={() => this.setState({ deleteModal:false})} tabindex="-1" role="dialog">
                    <form noValidate onSubmit={this.deleteTask}>
                        <MDBModalHeader toggle={this.deleteToggle}>Delete User</MDBModalHeader>
                        <MDBModalBody>
                            <h6>Are you sure Want to Delete this record..?</h6>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.deleteToggle}>Close</MDBBtn>
                            <MDBBtn type="submit"  color="primary">Yes</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={{ columns: this.state.columns, rows: this.state.rows }}
                />
                <NotificationContainer/>
            </>
        );
    }
};

export default Task;