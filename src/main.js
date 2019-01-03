import Vue from 'vue'
import App from './App'
import './css/app.scss'
import store from './store';
import '../static/weui/weui.css';
import '../static/weui/app.css';
import plugins from './extend/plugin';
import $http from '@/utils/http';

Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
for (let i = 0; i < plugins.length; i++) {
  let plugin = plugins[ i ]
  Vue.use(plugin);
}
Vue.prototype.$http = $http;

const app = new Vue(App)
app.$mount()

