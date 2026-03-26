import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeaderView from '@/views/HeaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView, // Routerview -> default
      /* 
      components: {
        default: HomeView
      }
      */
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/testheader',
      name: 'testheader',
      //CustomGuard fon only this route
      beforeEnter: (to, from, next) => {
        const isLogged = localStorage.getItem('isLogged');

        if(!isLogged) {
          next("/login"); //redirection
        } else {
          next(); //autorisé
        }

      },
      components: {
        default: HomeView, // Routerview -> default
        header: HeaderView // Routerview -> header
      }
    },
    {
      path: '/add',
      name: 'add',
      // component: AddTodoView, // Routerview -> default // Eager
      component: () => import('../views/AddTodoView.vue'), // Routerview -> default // Lazy
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/AddTodoView.vue'), // Routerview -> default // Lazy
      beforeEnter: (to, from, next) => {
        const id = Number(to.params.id);

        if(isNaN(id)) {
          console.log('redirection car id invalide')
          next("/"); //redirection car id invalide
        } else {
          next(); //autorisé
        }

      },
    },
    {
      path: "/dashboard",
      name: 'dashboard',
      component: () => import('../views/DashboardLayout.vue'),
      children: [
        {
          path: "",
          name: 'dashboard-home',
          component: () => import('../views/DashboardHomeView.vue'),
        },
        {
          path: "create", // /dashboard/create
          name: 'dashboard-create',
          component: () => import('../views/DashboardCreateView.vue'),
        },
      ]
        
    },
    {
      path: '/about',
      name: 'about', 
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'), // Routerview -> default
    },
    {
      // TOUJOURS LE METTRE A LA FIN CAR AUTRE ROUTE EVALUEE EN DERNIER
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    }
  ],
})


//Guard Global
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('isLogged');

  if(!isLogged) {
    next("/login"); //redirection
  } else {
    next(); //autorisé
  }
});



export default router
