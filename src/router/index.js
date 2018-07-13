import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/views/login')), 'login')
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    //   // 懒加载
    //   // component: resolve => require(['./HelloWorld.vue'], resolve)
    // }
    {
      path: '/',
      component: login
      // 懒加载
      // component: resolve => require(['./HelloWorld.vue'], resolve)
    }
  ]
})
