import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const{data}  = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getRole = async () => {
    const role = await $authHost.get('api/user/getRole' )
    return role
}

export const getEmail = async () => {
    const email = await $authHost.get('api/user/getEmail' )
    return email
}

export const getId = async () => {
    const id = await $authHost.get('api/user/getId' )
    return id
}