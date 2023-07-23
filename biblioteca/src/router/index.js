import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/autor",
    name: "autor",
    component: () => import("../views/AutorView.vue"),
  },
  {
    path: "/libro",
    name: "libro",
    component: () => import("../views/LibroView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
