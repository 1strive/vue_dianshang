/*
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-11 22:28:23
 * @LastEditors: JA
 */
//当前模块对API接口进行统一管理
import requests from "./request.js"
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList get 无参数

//发请求(baseurl已设置所以此处可省略/api)
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取banner(home首页轮播数据)
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块的数据 地址：/api/list 请求方式post 需要带参
//此处给服务器传参至少携带一个空对象
export const reqGetSearchInfo = (params) => requests({url: '/list', method: 'post',data:params})
