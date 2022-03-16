import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "./routes";
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
    routes,
    //滚动行为
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0，代表的滚动条在最上方
    return { y: 0 };
  },
})
export default router