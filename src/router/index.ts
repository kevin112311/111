import { createRouter, createWebHistory } from 'vue-router'
import Maintablol from '.././views/lol/Maintablol.vue'
import Maintabcs2 from '@/views/cs2/Maintabcs2.vue'
import Maintabdota2 from '@/views/dota2/Maintabdota2.vue'
import Maintabvalorant from '@/views/valorant/Maintabvalorant.vue'
import Maintabtft from '@/views/tft/Maintabtft.vue'
import LoLrusultview from '@/views/lol/LoLrusultview.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import Tftrusultview from '@/views/tft/tftrusultview.vue'
import BlogPostEditor from '@/views/other/BlogPostEditor.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tft/phb',
      name: 'tft-phb',
      component: () => import('../views/tft/other/tftphb.vue')
    },
    {
      path: '/lol/yxdq',
      name: 'lol-yxdq',
      component: () => import('../views/lol/other/yxdq.vue')
    },
    {
      path: '/lol/phb',
      name: 'lol-phb',
      component: () => import('../views/lol/other/phb.vue')
    },
    {
      path: '/',
      name: '',
      component: Maintablol
    },

    {
      path: '/lol',
      name: 'lol',
      component: Maintablol
    },
    {
      path: '/cs2',
      name: 'cs2',
      component: Maintabcs2

    },
    {
      path: '/dota2',
      name: 'dota2',
      component: Maintabdota2
    },
    {
      path: '/valorant',
      name: 'valorant',
      component: Maintabvalorant
    },
    {
      path: '/tft',
      name: 'tft',
      component: Maintabtft
    },
    {
      path: '/lol/s/:pathMatch(.*)',  // 捕获 /lol/s 后的所有路径
      name: 'lol-s-all',
      component: LoLrusultview,
      props: true
    },
    {
      path: '/tft/s/:pathMatch(.*)',  // 捕获 /lol/s 后的所有路径
      name: 'tft-s-all',
      component: Tftrusultview,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/other/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/other/Register.vue')
    },
    {
      path: '/content/:id',
      name: 'BlogContent',
      component: () => import('../views/other/content.vue'),
      props: true
    },
    {
      path: '/mycontent',
      name: 'mycontent',
      component: () => import('../views/other/mycontent.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/other/setting.vue')
    },
    {
      path: '/blogedit',
      name: 'blogedit',
      component: BlogPostEditor
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: ErrorPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/api/')) {
    // 如果路径以 /api/ 开头，直接放行，不进行路由跳转
    next(false); // 阻止路由跳转
    return;
  }
  next(); // 其他路由正常处理
});

export default router
