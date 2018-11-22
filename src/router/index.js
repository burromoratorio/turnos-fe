import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Profesionales = () => import('@/views/profesionales/profesionales')

const Login = () => import('@/views/pages/Login')

const Principal = () => import('@/views/publico/principal')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/pages/principal',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Profesionales
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/login',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
       
        {
          path: 'principal',
          name: 'Principal',
          component: Principal
        },       
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
      ]
    }
  ]
})
