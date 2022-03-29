import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'Index' },
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/count',
        name: 'Count',
        component: () => import('@/views/count/Count.vue'),
        meta: { title: '统计' }
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/setting/Setting.vue'),
        meta: { title: '设置' }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/About.vue'),
        meta: { title: '设置' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition
  }
})

// router.beforeEach((to, from) => {
//   addNode(to.name)
// })

export default router
