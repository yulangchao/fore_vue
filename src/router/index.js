import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Setting from '@/components/Setting'
import UserSetting from '@/components/UserSetting'
import ServiceForm from '@/components/ServiceForm'
import Cleaner from '@/components/Cleaner'
import SelectCleaner from '@/components/SelectCleaner'
import OrderDetail from '@/components/OrderDetail'
import Payment from '@/components/Payment'
import Finish from '@/components/Finish'
import Book from '@/components/Book'
import InService from '@/components/InService'
import Order from '@/components/Order'
import Service from '@/components/Service'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Review from '@/components/Review'
import Private from '@/components/Private'
import CleanerReview from '@/components/CleanerReview'
import MyReview from '@/components/MyReview'
import SavedCleaner from '@/components/SavedCleaner'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/private',
      name: 'Private',
      component: Private
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service',
      name: 'Service',
      component: Service,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order/inservice',
      name: 'InService',
      component: InService,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order/book',
      name: 'Book',
      component: Book,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order/finish',
      name: 'Finish',
      component: Finish,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service/serviceform',
      name: 'ServiceForm',
      component: ServiceForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cleaner',
      name: 'Cleaner',
      component: Cleaner,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/service/selectcleaner',
      name: 'SelectCleaner',
      component: SelectCleaner,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order/review',
      name: 'Review',
      component: Review,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cleaner/review',
      name: 'CleanerReview',
      component: CleanerReview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setting/review',
      name: 'MyReview',
      component: MyReview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setting/usersetting',
      name: 'UserSetting',
      component: UserSetting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setting/savedCleaner',
      name: 'SavedCleaner',
      component: SavedCleaner,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let access_token = localStorage.getItem('access_token');
  let currentUser = (firebase.auth().currentUser && access_token);
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser && access_token!=null) next('service')
  else next()
})

export default router
