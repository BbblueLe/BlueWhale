/**
 * @description 扩展Vue-Router-Meta的类型，防止Typescript报错
 */

declare module 'vue-router' {
    interface RouteMeta {
        storeId?: number
        permission?: Array<string>
        title?: string
    }
}

export {}