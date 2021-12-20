import Vue from 'vue'
import App from './App.vue'
import router from './router'
import svg4everybody from 'svg4everybody'
import { unity } from '../public/js/vue-unity-1.6.0.js'
import vuenity from './vuenity'

Vue.config.productionTip = false
svg4everybody()

// Using Vuenity globally
Vue.use(vuenity, {})

new Vue({
  router,
  render: h => h(App),
  mounted () {
    // Running unity when the app is mounted ensures the DOM is ready for all the JS handlers
    unity()
  }
}).$mount('#app')
