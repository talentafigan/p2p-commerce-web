import Helpers from "./helpers";

const publicRouter = [
  "authLogin",
  "authRegister",
  "authForgotPassword",
  "authResetPassword",
  "home",
];

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
  if (!publicRouter.includes(ctx.to.name)) return ctx.next("/");
  return ctx.next();
};
