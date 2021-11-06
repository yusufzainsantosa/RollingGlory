import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/layouts/main/Main.vue'),
    children: [
      {
        path: '/',
        name: 'product-list',
        component: () => import('@/views/ProductList.vue'),
        meta: {
          pageTitle: 'Product List'
        }
      },
      {
        path: '/product-detail/:productId',
        alias: '/productdetail/:productId',
        name: 'product-detail',
        component: () => import('@/views/ProductDetail.vue'),
        meta: {
          pageTitle: 'Product Detail'
        }
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
