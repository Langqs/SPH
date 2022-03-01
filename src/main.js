import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router';

//引入三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//引入轮播图--全局组件
import Swiper from '@/components/Swiper';
//引入 分页器--全局组件
import Pagination from '@/components/Pagination';

//引入仓库
import store from './store';
//统一引入 接口api文件夹的全部请求函数
import * as API from '@/api'
//引入mockServe.js------mock数据
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"

//引入表单验证插件
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)

//引入懒加载插件
import VueLazyLoad from 'vue-lazyload';
import loading from './assets/loading.gif';
//注册组件
Vue.use(VueLazyLoad,{
  //懒加载默认图片
  loading:loading
})

//element-ui
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

//注册全局组件，第一个参数：全局组件的名字 第二个组件：哪一个组件
Vue.component('TypeNav',TypeNav);
Vue.component('Swiper',Swiper);
Vue.component('Pagination',Pagination)
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  //注册仓库：组件实例的身上会多一个属性$store
  store
}).$mount('#app')
