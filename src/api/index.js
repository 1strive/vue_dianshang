//当前模块对API接口进行统一管理
import requests from "./request"

//三级联动接口
///api/product/getBaseCategoryList get 无参数

//发请求(baseurl已设置所以此处可省略/api)
export const reqCategoryList = () => requests({ url: '/api/product/getBaseCategoryList', method: 'get' })
