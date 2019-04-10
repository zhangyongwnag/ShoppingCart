import Vue from 'vue'
import Router from 'vue-router'
import ShoppingCart from '@/pages/ShoppingCart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name:'ShoppingCart'
      }
    },
    {
      path:'/ShoppingCart',
      name:'ShoppingCart',
      component:ShoppingCart,
      meta:{

      }
    }
  ]
})
