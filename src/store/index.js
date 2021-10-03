import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存token
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
    // 存role
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
  },
  mutations,
  actions,
  getters,
  modules: {},
});
