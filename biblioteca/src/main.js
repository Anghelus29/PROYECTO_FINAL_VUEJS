import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import M from "materialize-css";

createApp(App).use(store).use(router).mount("#app");
