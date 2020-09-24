// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入清除默认样式css
import '@/assets/css/reset.css'

Vue.config.productionTip = false

//UI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//服务器地址前缀
Vue.prototype.$server = 'http://localhost:3030'

//注册过滤器
import filterObj from './filters'
for(let k in filterObj){
  Vue.filter(k,filterObj[k])
}


//引入vuex仓库
import store from '@/store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
