import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import RecordsList from "@/components/RecordsList";
import GoodsList from "@/components/GoodsList";
import User from "@/components/User";
import AddGoods from "@/components/AddGoods";

Vue.use(Router)


const routes = [{
    path: '/login',
    name: 'login',
    component: Login,
},{
    path: '/',
    name:'home',
    component: Home,
    children:[{
        path: '/records',
        name: 'record',
        component: RecordsList,
    },{
        path: '/goods',
        name: 'goods',
        component: GoodsList,
    },{
        path: '/goods/addGoods',
        name: 'addGoods',
        component: AddGoods,
    },{
        path: '/user',
        name: 'user',
        component: User,
    }

    ]
}
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router