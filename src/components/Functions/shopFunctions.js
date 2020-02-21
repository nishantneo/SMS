import axios from 'axios'

import GlobalSetting from '../GlobalSetting';
let baseUrl=GlobalSetting.url ;

export const getAllProduct = () => {

    return axios
        .get(baseUrl+'productlists', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const editProduct=(id)=>{
    return axios
        .get(baseUrl+'product/edit/'+`${id}`, {
            headers:{Authorization:'Bearer ${localStorage.usertoken'}
        }).then(response=>{
            return response.data
        }).catch(err=>{
            console.log(err)
        })

}

export const add = newProduct => {
    let baseUrl='http://10.0.28.126:90/api/';
    return axios
        .post(baseUrl+'product/add', newProduct, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response
        })
        .catch(err => {
            console.log(err)
        })
}