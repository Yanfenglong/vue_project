import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './plugins/element.js'
import ZkTable from 'vue-table-with-tree-grid'
//添加富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//import software
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
axios.interceptors.request.use(config =>{
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
})
Vue.config.productionTip = false
Vue.component('tree-table', ZkTable)
Vue.use(VueQuillEditor, /* { default global options } */)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
