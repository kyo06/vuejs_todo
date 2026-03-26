import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddTodoView from '@/views/AddTodoView.vue'
import HeaderView from '@/views/HeaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, // Routerview -> default
      /* 
      components: {
        default: HomeView
      }
      */
    },
    {
      path: '/testheader',
      name: 'testheader',
      components: {
        default: HomeView, // Routerview -> default
        header: HeaderView // Routerview -> header
      }
    },
    {
      path: '/add',
      name: 'add',
      component: AddTodoView, // Routerview -> default
    },    
    {
      path: '/about',
      name: 'about', 
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'), // Routerview -> default
    },
  ],
})

export default router
