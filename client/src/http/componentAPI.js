import { $authHost, $host } from "./index";
//import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}
export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}
export const deleteOneType = async (id) => {
    const { data } = await $host.post('api/type/' + id)
    return data
}
export const updateOneType = async (id, name) => {
    const { data } = await $host.post('api/type/' + id + '/' + name)
    return data
}


export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}
export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand')
    return data
}
export const deleteOneBrand = async (id) => {
    const { data } = await $host.post('api/brand/' + id)
    return data
}
export const updateOneBrand = async (id, name) => {
    const { data } = await $host.post('api/brand/' + id + '/' + name)
    return data
}


export const createComponent = async (component) => {
    const { data } = await $authHost.post('api/component', component)
    return data
}
export const fetchComponents = async (typeId, brandId, page, limit = 5, name) => {
    const { data } = await $host.get('api/component', {
        params: {
            typeId, brandId, page, limit, name
        }
    })
    return data
}
export const fetchOneComponent = async (id) => {
    const { data } = await $host.get('api/component/' + id)
    return data
}
export const deleteOneComponent = async (id) => {
    const { data } = await $host.post('api/component/' + id)
    return data
}
export const updateOneComponent = async (component, id, name = 1) => {
    const { data } = await $host.post('api/component/' + id + '/' + name, component)
    return data
}
export const updateAmountComponent = async (component) => {
    const { data } = await $host.post('api/component/updateComponentAmount/1/1', component)
    return data
}


export const createInfo = async (info) => {
    const { data } = await $authHost.post('api/info', info)
    return data
}
export const fetchInfos = async () => {
    const { data } = await $host.get('api/info/')
    return data
}
export const fetchComponentInfo = async (componentId) => {
    const { data } = await $host.get('api/info/' + componentId)
    return data
}
export const deleteOneInfo = async (id) => {
    const { data } = await $host.post('api/info/' + id)
    return data
}
export const updateOneInfo = async (id, description) => {
    const { data } = await $host.post('api/info/' + id + '/' + description)
    return data
}


export const createBasket = async (basket) => {
    const { data } = await $authHost.post('api/basket', basket)
    return data
}
export const fetchBasket = async (orderId) => {
    const { data } = await $host.get('api/basket/' + orderId)
    return data
}


export const createOrder = async (order) => {
    const { data } = await $authHost.post('api/order', order)
    return data
}
export const fetchOrder = async (userId) => {
    const { data } = await $host.get('api/order/' + userId)
    return data
}

export const fetchByStatusOrder = async (status) => {
    const { data } = await $host.get('api/order/1/' + status)
    return data
}
export const updateOneOrder = async (id, status) => {
    const { data } = await $host.post('api/order/' + id + '/' + status)
    return data
}