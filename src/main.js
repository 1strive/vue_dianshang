/*
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-13 15:26:06
 * @LastEditors: JA
 */
import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"
import '@/mock/mockServe'//引入mockServe 使其执行一次
import 'swiper/css/swiper.css'
//统一引入
import * as API from '@/api';

Vue.config.productionTip = false


//将三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination'
//参数一：全局组件的名字 参数二：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)



new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API;
  },
  router,
  //注册仓库：组件实例的身上会多一个$store的属性
  store,
}).$mount('#app')
