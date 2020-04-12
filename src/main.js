import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav/index.vue'
import Carousel from './components/Carousel/index.vue'
import Pagination from './components/Pagination/index.vue'
import './mock/mokeServer.js'
import "swiper/css/swiper.min.css";


Vue.config.productionTip = false
Vue.component('TypeNav' , TypeNav)
Vue.component('Carousel' , Carousel)
Vue.component('Pagination' , Pagination)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
