import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"
Vue.config.productionTip = false


//将三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
//参数一：全局组件的名字 参数二：哪一个组件
Vue.component(TypeNav.name,TypeNav)



new Vue({
  render: h => h(App),
  router,
  //注册仓库：组件实例的身上会多一个$store的属性
  store,
}).$mount('#app')
