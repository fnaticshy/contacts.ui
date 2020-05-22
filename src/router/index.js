// libs
import Vue from 'vue';
import VueRouter from 'vue-router';
// pages
import Login from '@/components/Auth/Login.vue';
import Registration from '@/components/Auth/Registration.vue';
import Contacts from '@/components/Contacts/Contacts.vue';
// helpers
import AuthGuard from './auth-guard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    beforeEnter: AuthGuard,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'reg',
    component: Registration,
  },
  {
    path: '*',
    name: 'Contacts',
    component: Contacts,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { selector: to.hash };
    return {
      x: 0,
      y: 0,
    };
  },
  routes,
});

export default router;
