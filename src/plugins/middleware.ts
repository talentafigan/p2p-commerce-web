import store from "@/store";
const IStore = store as any;

const authRequiredRouter = ["portal"];
const authLoggedBanned = ["auth"];

export const authMiddleware = (ctx: any) => {
  return ctx.next();
};
