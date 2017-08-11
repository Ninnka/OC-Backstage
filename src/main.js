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
    },
    // 分页函数
    handleSizeChangeData (page, size, List) {
      if (List.length > size) {
        return List.filter((item, index) => {
          if (index < size * page && index >= size * (page - 1)) {
            return item;
          }
        });
      } else {
        return List;
      }
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

/* eslint-disable no-new */
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
