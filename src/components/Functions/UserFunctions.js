import axios from 'axios'

import GlobalSetting from '../GlobalSetting';
let baseUrl=GlobalSetting.url ;
export const register = newUser => {

    let baseUrl=GlobalSetting.url ;
    return axios
        .post('register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const login = user => {
    let baseUrl=GlobalSetting.url ;
    return axios
        .post(
            baseUrl+'login',
            {
                email: user.email,
                password: user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile = () => {
    let baseUrl=GlobalSetting.url ;
    return axios
        .get(baseUrl+'profile', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUsers = () => {
    let baseUrl=GlobalSetting.url ;
    return axios
        .get(baseUrl+'userlists', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const add = newTask => {
    let baseUrl='http://10.0.28.126:90/api/';
    return axios
        .post(baseUrl+'task/add', newTask, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const fetchUser = (id) => {

    return axios
        .get(baseUrl+'task/edit/'+`${id}`, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}