/*
 * @Author: JA
 * @Date: 2022-03-07 21:34:38
 * @LastEditTime: 2022-03-07 22:35:25
 * @LastEditors: JA
 */

//引入mockjs模块
import Mock from 'mockjs'
//把json格式数据引入
import banner from './banner'
import floor from './floor'

//mock数据:第一个参数请求地址  第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
