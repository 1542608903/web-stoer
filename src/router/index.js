import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import UserList from '@/components/UserList.vue'
import GoodsList from '@/components/GoodsList.vue'
import UpdateUser from '@/views/UpdateUser.vue'
import ImageUpload from '@/views/ImageUpload.vue'
import UserPower from '@/components/UserPower.vue'
import Classify from '@/components/Classify.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: Home,
      children: [ //children声明子路由
        {
          path: '/userlist',
          name: 'UserList',
          component: UserList,
        },
        {
          path: '/userpower',
          name: 'UserPower',
          component: UserPower,
        },
        {
          path: '/goodslist',
          name: 'GoodsList',
          component: GoodsList,
        },
        {
          path: '/updateuser',
          name: 'UpdateUser',
          component: UpdateUser,
        },
        {
          path: '/imageupload',
          name: 'ImageUpload',
          component: ImageUpload,
        },
        {
          path: '/classify',
          name: 'Classify',
          component: Classify,
        },
      ],
      redirect: '/userlist',//默认子路由
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token || to.path === '/login') {
    // 需要登录才能访问的页面，且未登录时跳转到登录页
    next();
  } else {
    next('/login');
  }

});

export default router
