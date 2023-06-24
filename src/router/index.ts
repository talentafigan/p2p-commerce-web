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
    path: "/auth/login",
    name: "/authLogin",
    component: Module.authLogin,

  },
  {
    path: "/auth/register",
    name: "/authRegister",
    component: Module.authRegister,

  },
  {
    path: "/auth/forgot-password",
    name: "/authForgotPasword",
    component: Module.authForgotPasword,

  },
  // {
  //   path: "/auth/portal-seller",
  //   name: "/portalSeller",
  //   component: Module.portalSeller,

  // },
  // {
  //   path: "/auth/seller/login",
  //   name: "/authSellerLogin",
  //   component: Module.authSellerLogin,

  // },
  // {
  //   path: "/auth/seller/register",
  //   name: "/authSellerRegister",
  //   component: Module.authSellerRegister,

  // },
  // {
  //   path: "/auth/seller/forgot-password",
  //   name: "/authSellerForgotPasword",
  //   component: Module.authSellerForgotPasword,

  // },
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
