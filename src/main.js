import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 导入插件 toast
import toast from 'components/common/toast';

Vue.config.productionTip = false
// 创建事件总线 $bus
Vue.prototype.$bus =  new Vue()   
// 安装 toast 插件
Vue.use(toast)

// 解决 300ms延迟
FastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/images/common/placeholder.png')  //默认图片
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
