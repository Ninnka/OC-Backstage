// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 定义全局方法
Vue.mixin({
  methods: {
    // 返回数组单个数组元素去重后的数组
    getSuperiorList (list, key) {
      return [...new Set(list.map((item) => {
        return item[key];
      }))];
    }
  }
});
// 引入配置数据
import DeployApi from '@assets/js/deploy.js';
Vue.prototype.DeployApi = DeployApi;
import CommonApi from '@assets/js/common.js';
Vue.prototype.CommonApi = CommonApi;
// 引进公共样式
import '@assets/css/common.less';
import '@assets/css/tab-chunk.less';

// 引进字体
import '@assets/iconfont/iconfont.css';
import '@assets/iconfont/iconfont.js';

// 引进element
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-default/index.css';

// 引入vue-clipboards
import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);

Vue.config.productionTip = false;

// 引入自定义的http模块
import { axiosInstance } from '@http/config';
Vue.prototype.$axios = axiosInstance;

// NOTE: prod环境下可以删除
if (process.env.NODE_ENV !== 'production') {
  console.log('%c已添加上传图片的组件，使用方法的可以看demo，也可以直接看组件，支持选择过滤的图片类型以及是否自动上传（自动上传功能完善中），默认显示预览，绘制图片暂时是100%填充，如果有其他需求可以提issue', 'background: #30333c; color: #ffffff');
}

/* eslint-disable no-new */
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
