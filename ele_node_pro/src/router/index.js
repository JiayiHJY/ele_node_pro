import Vue from 'vue'
import VueRouter from 'vue-router'
import listArticle from '../views/listArticle'
import configArticle from '../views/configArticle'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/articles/index'
  },
  {
    path: '/articles/index',
    name: 'listArticle',
    component: listArticle
  },
  {
    path: '/articles/config',
    name: 'configArticle',
    component: configArticle
  },
  {
    path: '/articles/config/:id',
    name: 'configArticle',
    component: configArticle,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
