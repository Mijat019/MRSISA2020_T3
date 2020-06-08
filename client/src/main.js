import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

Vue.use(Datetime);
Vue.config.productionTip = false;
Vue.$axios = Axios;
Vue.$axios.defaults.headers["Authorization"] = localStorage.getItem("token");

export const bus = new Vue();

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
