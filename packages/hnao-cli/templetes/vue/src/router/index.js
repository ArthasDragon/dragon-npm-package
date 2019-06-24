import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
