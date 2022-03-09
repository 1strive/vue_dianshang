犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解
KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写

$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta

1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,

因为push会返回一个Promise，但是Promise需要传入成功和失败的回调

第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

 this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()*=>*{},()*=>*{})

此种写法指标不治本，将来在别的组件中还是会有类似错误，所以需要重写方法

//

this：当前组件实例（search)

this.$routers属性是Vuetouter类的一个实例

push是Vuerouter原型对象上的方法





2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源








3)axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的

3.1为什么要二次封装axios？
请求拦截器：可以在发请求之前处理一些业务

响应拦截器；可以在服务器数据返回后处理一些任务

4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex基本使用:

​     









听课笔记：

 //call , apply

  //相同点:都可以调用函数一次，都可以改变函数的上下文

  //不同点：call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。



一共要拆分为七个组件

三级联动 || 轮播图 || 今日推荐 || 热卖排行 || 猜你喜欢 || 家用电器&&手机通信 ||底部品牌logo

3.由于三级联动在Home,Search,Detail均有出现，把三级联动注册为全局组件

好处:只需要注册一次就可以在项目任何地方使用

4.完成其余组件拆分

5.postman测试接口能否使用

若服务器返回数据code字段200，代表服务器返回数据成功

整个项目，接口前缀都有/api字样



7.接口统一管理



项目很小：完全可以在组件的生命周期函数中发请求

项目大：接口统一管理（接口改动时便于修改）

7.1跨域问题

跨域：协议、域名、端口号不同请求，称之为跨域

本地： http://192.168.0.104:8081/#/home

后台服务器：http://39.98.123.211

解决方法：1.JSONP 2.CROS 3.代理服务器

代理服务器：由代理服务器向服务器请求数据 同源策略是浏览器的



8.nprogress进度条的使用

API:start:进度条开始

done:进度条结束

进度条颜色可在样式处修改

