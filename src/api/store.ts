// Lab2新增
// 开发时请解除3-4行的注释
 import {axios} from '../utils/request'
 import {STORE_MODULE} from './_prefix'

type StoreInfo =  {
    logoLink: string,
    name: string
}

export interface StoreDetails {
    storeId: number,
    name: string,
    logoLink: string
}
//创建商店
export const createStore = (storeInfo: StoreInfo) => {
    return axios.post(`${STORE_MODULE}/create`, storeInfo,
        {headers: {'Content-Type': 'application/json'}}
    ).then(res=> {
        return res;
    })
}
//获取所有商店
export const getAllStores = () => {
    return axios.get(`${STORE_MODULE}/getAllStores`)
        .then(res => {
            return res;
        })
}


