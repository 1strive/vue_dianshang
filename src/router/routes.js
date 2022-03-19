import Home from '../pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
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
]