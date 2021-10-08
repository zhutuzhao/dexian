import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// 引入echarts
import echarts from "echarts";

import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css"; //导入css基本模板

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
