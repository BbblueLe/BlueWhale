// Lab2新增
// 开发时请解除3-4行的注释
 import {axios} from '../utils/request'
 import {PRODUCT_MODULE} from './_prefix'


type ProductInfo = {
  name: string,
  price: number,
  type: string,
  productImages: string[],
  inventory?: number,
  store: {storeId: number, name: string, logoLink: string}
}

//创建商品
export const createProduct = (productInfo: ProductInfo) => {
  return axios.post(`${PRODUCT_MODULE}/create`, productInfo,
      {headers: {'Content-Type': 'application/json'}}
  ).then(res => {
     return res;
  })
}

