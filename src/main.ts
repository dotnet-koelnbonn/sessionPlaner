import Vue from 'vue'
import App from './app/App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'

import Spinner from './components/Spinner.vue';

Vue.component('spinner', Spinner);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
