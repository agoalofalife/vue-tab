
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

Vue.component('Tables', require('./components/Tables.vue'));
import store from './store'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// const Tables = { template: '<Tables/>'  };
// const router = new VueRouter({
//     routes: [
//         // dynamic segments start with a colon
//         { path: '/', component: Tables }
//     ]
// });
//document.location.pathname
const app = new Vue({
    store,
    template : '<Tables/>',
    el: '#app',
});
