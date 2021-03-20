import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VModal from 'vue-js-modal';
import Vuetify from 'vuetify';
import VueLazyload from 'vue-lazyload'
import VueFlashMessage from 'vue-flash-message';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

window.mapboxgl = require('mapbox-gl');

Vue.use(VModal)
Vue.use(VeeValidate);
Vue.use(VueLazyload)
Vue.use(Vuetify)
Vue.use(VueAwesomeSwiper)
Vue.use(VueFlashMessage, {
    messageOptions: {
      timeout: 3000    }
  });


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});