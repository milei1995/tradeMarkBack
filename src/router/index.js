import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue'
import Login from '../views/login/login.vue'
import ApplyList from '../views/applyList/ApplyList.vue'
import OrderList from '../views/orderList/OrderList.vue'
import UserList from '../views/userList/UserList.vue'
import UploadList from '../views/uploadList/UploadList.vue'

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
            },
             {
                 path: '/userList',
                 component: UserList,
                 name: 'userList'
             },
             {
                 path:'/uploadList',
                 component:UploadList,
                 name:'uploadList'
             }
        ]
        }, {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})