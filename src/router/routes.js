import Home from '../pages/Home'
import Login from '@/pages/Login'
// import Search from '@/pages/Search'
const Search = () => import('@/pages/Search')
//路由懒加载
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupBuy from '@/pages/Center/groupOrder'
export default [
    {
        name: "detail",
        path: "/detail/:skuId",//params参数占位
        component: Detail,
        meta: { show: true },
    },
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
                keyword: $route.params.keyword,
                k: $route.query.k
            }
        }
    },
    {
        name: "register",
        path: '/register',
        component: Register,
        meta: { show: false },
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
    },
    {
        path: '/trade',
        component: Trade,
        /* 只能从购物车界面, 才能跳转到交易界面 */
        beroreEnter(to, from, next) {
            if (from.path == '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
           // 将query参数映射成props传递给路由组件
    props: route => ({orderId: route.query.orderId}),

    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter (to, from, next) {
      if (from.path==='/trade') {
        next()
      } else {
        next('/trade')
      }
    }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter (to, from, next) {
            if (from.path==='/pay') {
              next()
            } else {
              next('/pay')
            }
          }
    },
    {
        path: '/center',
        component: Center,
        children: [
            {
              // path: '/center/myorder',
              path: 'myorder',
              component: MyOrder,
            },
            {
              path: 'groupbuy',
              component: GroupBuy,
            },
      
            {
              path: '',
              redirect: 'myorder'
            }
          ]
    },
    
]