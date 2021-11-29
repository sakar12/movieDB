import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment' 
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false;

Vue.use(VueAxios, axios)


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('Do MMMM YYYY')
  }
});


new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  render: (h) => h(App)
}).$mount('#app');
