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
    name: "authLogin",
    component: Module.authLogin,
  },
  {
    path: "/auth/register",
    name: "authRegister",
    component: Module.authRegister,
  },
  {
    path: "/auth/forgot-password",
    name: "authForgotPassword",
    component: Module.authForgotPassword,
  },
  {
    path: "/auth/reset-password",
    name: "authResetPassword",
    component: Module.authResetPassword,
  },
  {
    path: "/account/profile",
    name: "accountProfile",
    component: Module.accountProfile,
  },
  {
    path: "/account/wallet",
    name: "accountWallet",
    component: Module.accountWallet,
  },
  {
    path: "/consultation",
    name: "consultation",
    component: Module.consultation,
  },
  {
    path: "/product/search",
    name: "productSearch",
    component: Module.productSearch,
  },
  {
    path: "/product/:id",
    name: "productDetail",
    component: Module.productDetail,
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
