/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login"
import Home from "../components/Home"
import Welcome from "../components/Welcome"
import Users from "../components/user/Users"
Vue.use(VueRouter)

const routes = [
  {path: '/',redirect: '/login'},
  {path: '/login',component: Login},
  {path: '/home',component: Home,redirect:'/welcome',
    children:[
      {path: '/welcome',component: Welcome},
      {path: '/users',component: Users},
    ]},

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const index = new VueRouter({
  routes
})
//挂载导航守卫
index.beforeEach((to , from , next) => {
  if (to.path === '/login'){
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr){
    return next('/login')
  }
  next()
})
export default index
