import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Module from "@/router/module";
import { authMiddleware } from "@/plugins/middleware";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: "home",
    path: "/",
    component: Module.index,
  },
  {
    path: "/auth/client/login",
    name: "/authClientLogin",
    component: Module.authClientLogin,

  },
  {
    path: "/auth/client/register",
    name: "/authClientRegister",
    component: Module.authClientRegister,

  },
  {
    path: "/auth/client/forgot-password",
    name: "/authClientForgotPasword",
    component: Module.authClientForgotPasword,

  },
  {
    path: "/auth/seller/login",
    name: "/authSellerLogin",
    component: Module.authSellerLogin,

  },
  {
    path: "/auth/seller/register",
    name: "/authSellerRegister",
    component: Module.authSellerRegister,

  },
  {
    path: "/auth/seller/forgot-password",
    name: "/authSellerForgotPasword",
    component: Module.authSellerForgotPasword,

  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  authMiddleware({ to, from, next });
});

export default router;
