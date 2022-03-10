/*
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-07 21:43:31
 * @LastEditors: JA
 */
import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"
import '@/mock/mockServe'//引入mockServe 使其执行一次
import 'swiper/css/swiper.css'


Vue.config.productionTip = false


//将三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carsousel'
//参数一：全局组件的名字 参数二：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)




new Vue({
  render: h => h(App),
  router,
  //注册仓库：组件实例的身上会多一个$store的属性
  store,
}).$mount('#app')
