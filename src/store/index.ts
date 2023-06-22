import Vue from "vue";
import Vuex from "vuex";
import VuexPersistPlugin from "@/plugins/vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  plugins: [VuexPersistPlugin],
});
