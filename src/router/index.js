/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from "../components/Login"
// import Home from "../components/Home"
// import Welcome from "../components/Welcome"
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')
// import Users from "../components/user/Users"
// import Rights from  "../components/power/Rights"
// import Roles from  "../components/power/Roles"
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Roles.vue')
//import Cate from  "../components/goods/Cate"
const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Cate.vue')
// import List from "../components/goods/List"
//import Add from  "../components/goods/Add"
const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/Add.vue')
const List = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/List.vue')
//import Report from  "../components/report/Report"  //GRAY
const Report = () => import(/* webpackChunkName: "Order_Report" */ '../components/report/Report.vue')
Vue.use(VueRouter)

const routes = [
  {path: '/',redirect: '/login'},
  {path: '/login',component: Login},
  {path: '/home',component: Home,redirect:'/welcome',
    children:[
      {path: '/welcome',component: Welcome},
      {path: '/users',component: Users},
      {path: '/rights',component: Rights},
      {path: '/roles',component: Roles},
      {path: '/categories',component: Cate},
      {path: '/goods',component: List},
      {path: '/goods/add',component: Add},
      {path:'/reports',component:Report}
    ]},
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
