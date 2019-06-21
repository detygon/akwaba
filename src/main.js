import Vue from 'vue'
import App from './app.vue'
import router from './router/'

import './registerServiceWorker'
import './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
