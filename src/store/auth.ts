import { UserDto } from "@/types/interface";

const Auth = {
  namespaced: true,
  state: () => ({
    token: null,
    user: null,
    loginDate: null,
  }),
  mutations: {
    setAuth(
      state: any,
      payload: { token: string; user: UserDto; loginDate: string }
    ) {
      state.token = payload.token;
      state.user = payload.user;
      state.loginDate = payload.loginDate;
    },
    resetAuth(state: any) {
      state.token = null;
      state.user = null;
      state.loginDate = null;
    },
  },
};

export default Auth;