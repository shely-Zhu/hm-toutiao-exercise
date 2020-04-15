import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import Welcome from '@/views/welcome'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '',
          component: Welcome
        }
      ]
    }
  ]
})

export default router
