// Lab2新增
// 开发时请解除3-4行的注释
 import {axios} from '../utils/request'
 import {PRODUCT_MODULE} from './_prefix'

type ProductImages = {
    imageUrl: string
}
export type ProductsImages = {
    productImagesId: number,
    imageUrl: string
}


type ProductInfo = {
  name: string,
  price: number,
  type: string,
  productImages: ProductImages[],
  description: string
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

export const getProductInfo = (productId : number) => {
    return axios.get(`${PRODUCT_MODULE}/getInfo/${productId}`)
        .then(res => {
            return res;
        })
}

