/*
 * @Author: JA
 * @Date: 2022-03-20 15:31:43
 * @LastEditTime: 2022-03-20 16:50:25
 * @LastEditors: JA
 */

//存储token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

//获取token
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}

//清除本地存储的token
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}