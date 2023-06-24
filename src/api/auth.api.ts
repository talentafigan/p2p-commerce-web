import Axios from "axios";

export class AuthApi {
  logout() {
    return Axios.post("/auth/logout");
  }
  login(data: { key: string; password: string }) {
    return Axios.post("/api/login", {
      ...data,
      userTypeId: "3",
    });
  }
  register(data: { 
  email: string;
  fullname: string;
  password: string;
  phone: string;
  username: string }) {
    return Axios.post("/api/register", {
      ...data,
      userTypeId: "3",
    });
  }
}