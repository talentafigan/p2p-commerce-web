import store from "@/store";
const IStore = store as any;

const authRequiredRouter = ["portal"];
const authLoggedBanned = ["auth"];

export const authMiddleware = (ctx: any) => {
  const isAuthRequiredRouter = (val: string) => {
    const find = authRequiredRouter.find((v) => val.indexOf(v) > -1);
    if (find) return true;
    return false;
  };
  const isAuthLoggedBanned = (val: string) => {
    const find = authLoggedBanned.find((v) => val.indexOf(v) > -1);
    if (find) return true;
    return false;
  };
  if (!IStore.state.auth.token && isAuthRequiredRouter(ctx.to.path)) {
    return ctx.next(`/auth/login`);
  }
  if (IStore.state.auth.token && isAuthLoggedBanned(ctx.to.path)) {
    return ctx.next("/");
  }
  return ctx.next();
};

