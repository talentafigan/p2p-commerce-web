const authRouter = [
  "authLogin",
  "authRegister",
  "authForgotPassword",
  "authResetPassword",
];

const publicRouter = ["home"];

export const authMiddleware = (ctx: any) => {
  const vuex = localStorage.getItem("vuex");
  if (!vuex) {
    if (
      authRouter.includes(ctx.to.name) ||
      publicRouter.includes(ctx.to.name)
    ) {
      return ctx.next();
    }
    return ctx.next("/auth/login");
  }
  const auth = JSON.parse(vuex);
  if (auth.auth.token === null) {
    if (
      authRouter.includes(ctx.to.name) ||
      publicRouter.includes(ctx.to.name)
    ) {
      return ctx.next();
    }
    return ctx.next("/auth/login");
  }
  if (authRouter.includes(ctx.to.name)) return ctx.next("/");
  return ctx.next();
};
