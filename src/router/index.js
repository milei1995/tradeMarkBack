import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue'
import Login from '../views/login/login.vue'
import ApplyList from '../views/applyList/ApplyList.vue'
import OrderList from '../views/orderList/OrderList.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/applyList'
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [    
            {
                path: '/applyList',
                component: ApplyList,
                name: 'applyList'
            },
            {
                path:'/orderList',
                component:OrderList,
                name:'orderList'
            }
        ]
        }, {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})