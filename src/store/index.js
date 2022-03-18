import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入组件仓库
import home from './home'
import search from './search'
import detail from "./Detail";
import shopcart from "./shopcart";
import user from './user'
export default new Vuex.Store({
   //实现Vuex仓库模块式开发存储数据
   modules:{
       home,
       search,
       detail,
       shopcart,
       user
   }
})