import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import Welcome from '@/views/welcome'
import articles from '@/views/articles'
import NotFound from '@/views/404'
import store from '@/store'
import setting from '@/views/setting'
import publish from '@/views/publish'
import assets from '@/views/assets'
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
        },
        {
          path: '/articles',
          component: articles
        },
        {
          path: '/setting',
          name: 'setting',
          component: setting
        },
        {
          path: '/publish',
          name: 'publish',
          component: publish
        },
        {
          path: '/assets',
          name: 'assets',
          component: assets
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
