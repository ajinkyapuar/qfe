import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import uploadForm from '../uploadForm/uploadForm';
import logout from '../logOut/logOut';
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [

    { path: '/', component: uploadForm },
    { path: '/login', component: LoginPage },
    { path: '/logout',component:logout},
    { path: '/register', component: RegisterPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  const backPages=['/login','/register'] 
  if(loggedIn && backPages.includes(to.path)){
    return next('/')
  }
  next();
})