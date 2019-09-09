import Vue from 'vue'
import App from './App.vue'
// 引入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入路由
import router from '@/router.js' 
import '@/styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI);

// 添加导航守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('token')
  if (token || to.path=='/login') {
    next();
  } else if (!token || to.path !=='/login') {
    next({name:'login'})
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
