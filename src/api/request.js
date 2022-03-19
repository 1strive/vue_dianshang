/*
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-07 22:13:07
 * @LastEditors: JA
 */
//对于axios进行二次封装
import axios from "axios"
import nprogress from 'nprogress';

import store from "@/store";

//引入进度条样式
import "nprogress/nprogress.css";//有问题

//1:利用axios对象的方法create，创建一个axios实例
//此处requests就是axios，只不过配置一下
const requests = axios.create({
    //基础路径
    baseURL: "/api",//有问题 失效
    //请求不能超过5S
    timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出
//之前完成一些业务

requests.interceptors.request.use((config) => {
    //config：配置对象，对象中含有header请求头属性
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段(userTempId):和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token
    }

    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调，服务器相应数据返回后，响应拦截器可以检测到
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})

export default requests







