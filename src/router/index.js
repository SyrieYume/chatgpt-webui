import { createRouter, createWebHashHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'

const routes = [
  {
    path: '/',
    name: 'ChatView',
    component: ChatView,
    meta:{
      keepAlive:true //需要被缓存的组件
    },
  },
  {
    path: '/settings',
    name: 'SettingsView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SettingsView.vue'),
    meta:{
      keepAlive:true //需要被缓存的组件
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
