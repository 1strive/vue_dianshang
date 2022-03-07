import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'


Vue.use(VueRouter)


//先把VueRouter原型对象的push方法备份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push|replace
//参数一：跳转目标  参数二三：成功失败的回调参数
VueRouter.prototype.push = function(location,resolve,reject){
    //若传入了resolve及reject
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)//相当于this.originPush
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }

}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}


const router = new VueRouter({
    routes: [
        {
            name: "home",
            path: '/home',
            component: Home,
            meta: { show: true },
        },
        {
            name: "login",
            path: '/login',
            component: Login,
            meta: { show: true },
        },
        {
            name: "search",
            path: '/search/:keyword?',//params参数需要占位
            component: Search,
            meta: { show: false },
            props($route) {
                return {
                  keyword:$route.params.keyword,
                  k:$route.query.k
                }
            }
        },
        {
            name: "register",
            path: '/register',
            component: Register,
            meta: { show: false },
        },
    ]
})
export default router