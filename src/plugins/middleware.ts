import store from "@/store";
import Helpers from "./helpers";

const publicRouter = ["authLogin", "authRegister", "authForgotPasword","home"];

const helpers = new Helpers();

export const authMiddleware = (ctx: any) => {
  const vuex = sessionStorage.getItem("vuex");
  if (!vuex) {
    if (publicRouter.includes(ctx.to.name)) return ctx.next();
    return ctx.next("/auth/login");
  }
  const auth = JSON.parse(vuex);
  if (auth.auth.token === null) {
    if (publicRouter.includes(ctx.to.name)) return ctx.next();
    return ctx.next("/auth/login");
  }
  if (helpers.datePassed(auth.auth.loginDate, 24, "hour")) {
    return ctx.next("/auth/login");
  }
  if (!publicRouter.includes(ctx.to.name)) return ctx.next("/");
  return ctx.next();
};