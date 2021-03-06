import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from 'axios'


Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  // next()

  //必须登录才能访问其他界面
  // if (to.path === '/login' || to.path === '/register') return next();
  // const login = sessionStorage.getItem("userid");
  // if (!login) return next('/login');
  next();
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});