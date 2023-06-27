import store from "@/store";
import Axios from "axios";
const IStore = store as any;

const register = () => {
  setDefaultBaseUrl();
};

const setDefaultBaseUrl = () => {
  Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
};

export const setToken = (token: string = IStore.state.auth.token) => {
  Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export default register;