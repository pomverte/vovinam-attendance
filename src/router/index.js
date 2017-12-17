import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserList from '@/components/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user-list',
      component: UserList
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
