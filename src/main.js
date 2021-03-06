import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

Vue.config.productionTip = false;
// 开启后可观察组件性能
Vue.config.performance = false;

Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
