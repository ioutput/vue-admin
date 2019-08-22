import Vue from 'vue'
import Router from 'vue-router'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import store from './store'
import App from './App'
import  {http}  from './api';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.use(Router);
/*****防止刷新页面store数据丢失****/
let userinfo = localStorage.getItem('user_info')
if(userinfo && store.getters.token ==undefined){
	let user_arr = JSON.parse(userinfo)
  store.dispatch('SetUserInfo',user_arr)
}
Vue.config.productionTip = false
Vue.prototype.http = http;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
