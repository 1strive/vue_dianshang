import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import routes from "./routes";
Vue.use(VueRouter)


//先把VueRouter原型对象的push方法备份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push|replace
//参数一：跳转目标  参数二三：成功失败的回调参数
VueRouter.prototype.push = function (location, resolve, reject) {
    //若传入了resolve及reject
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)//相当于this.originPush
    } else {
        originPush.call(this, location, () => { }, () => { })
    }

}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
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

//全局守卫，前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to 可以获取到跳转到哪个路由
    //from 获取从哪个路由来
    //next 放行函数 next()放行 next(path)放行到指定路由 next(false)放行失败时回到from路由
    //通过判断token是否存在判断登录状态
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //用户登录
    if (token) {
        //已经登录的状态下，不可以再去登录页面
        if (to.path == '/login' || to.path == '/register') {
            next(from.path)
        } else {
            //登录且拥有用户信息 放行
            if (name) {
                next()
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效重新登陆
                    await store.dispatch('userLogout')
                    next('login')
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
})
//代码中出现不存在的路由，会因一直寻找找个路由而造成栈溢出
export default router