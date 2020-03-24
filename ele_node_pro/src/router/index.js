import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main'
import Login from '../views/login'
import stuList from '../views/stuManage/stuList'
import stuConfig from '../views/stuManage/stuConfig'
import classConfig from '../views/classManage/classConfig'
import classInfo from '../views/classManage/classInfo'
import leaveApproval from '../views/classManage/leaveApproval'
import orderManage from '../views/orderManage/orderManage'
import orderHandle from '../views/orderManage/orderHandle'
import usersList from '../views/adminUsers/usersList'
import usersConfig from '../views/adminUsers/usersConfig'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/students/index',
    children: [
      { path: '/students/index', name: 'stuList', component: stuList },
      { path: '/students/config', name: 'stuConfig', component: stuConfig },
      { path: '/students/config/:id', name: 'stuConfig', component: stuConfig, props: true },
      { path: '/class/index', name: 'classInfo', component: classInfo },
      { path: '/class/config', name: 'classConfig', component: classConfig },
      { path: '/class/leave', name: 'leaveApproval', component: leaveApproval },
      { path: '/order/index', name: 'orderManage', component: orderManage },
      { path: '/order/config', name: 'orderHandle', component: orderHandle },
      { path: '/users/index', name: 'usersList', component: usersList },
      { path: '/users/config', name: 'usersConfig', component: usersConfig },
      { path: '/users/config/:id', name: 'usersConfig', component: usersConfig, props: true }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
