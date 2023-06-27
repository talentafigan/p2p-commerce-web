import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/main.css";
import "@/assets/styles/main.scss";
import "@/assets/styles/main.less";
import Antdv from "./plugins/antdv";
import VuepperSlide from "@/plugins/vupper-slide.js";
import 'remixicon/fonts/remixicon.css'
import PluginAxios from "@/plugins/axios"
import Antd from 'ant-design-vue';



import ComponentModule from "@/components/module";
import Helpers from "@/plugins/helpers";
Vue.config.productionTip = false;
Vue.prototype.$helpers = new Helpers();

Vue.use(Antd)
ComponentModule();
PluginAxios();
Antdv();
VuepperSlide();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
