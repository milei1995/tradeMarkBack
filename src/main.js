import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'

import router from './router';
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(Antd)
Vue.use(axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
