import Vue from 'vue'
import VueRouter from 'vue-router'
import stuList from '../views/stuManage/stuList'
import stuConfig from '../views/stuManage/stuConfig'
import classConfig from '../views/classManage/classConfig'
import classInfo from '../views/classManage/classInfo'
import leaveApproval from '../views/classManage/leaveApproval'
import orderManage from '../views/orderManage/orderManage'
import orderHandle from '../views/orderManage/orderHandle'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', redirect: '/students/index' },
  { path: '/students/index', name: 'stuList', component: stuList },
  { path: '/students/config', name: 'stuConfig', component: stuConfig },
  { path: '/students/config/:id', name: 'stuConfig', component: stuConfig, props: true },
  { path: '/class/index', name: 'classInfo', component: classInfo },
  { path: '/class/config', name: 'classConfig', component: classConfig },
  { path: '/class/leave', name: 'leaveApproval', component: leaveApproval },
  { path: '/order/index', name: 'orderManage', component: orderManage },
  { path: '/order/config', name: 'orderHandle', component: orderHandle }
]

const router = new VueRouter({
  routes
})

export default router
