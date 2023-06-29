import { UserDto } from "@/types/interface";

const Auth = {
  namespaced: true,
  state: () => ({
    token: null,
    user: null,
  }),
  mutations: {
    setAuth(
      state: any,
      payload: { token: string; user: UserDto; }
    ) {
      state.token = payload.token;
      state.user = payload.user;
    },
    resetAuth(state: any) {
      state.token = null;
      state.user = null;
    },
  },
};

export default Auth;