import Axios from "axios";

export class AuthApi {
  logout() {
    return Axios.delete("/auth/logout");
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
    username: string;
  }) {
    return Axios.post("/api/register", {
      ...data,
      userTypeId: "3",
    });
  }
  resetPasswordRequest(email: string) {
    return Axios.post("/api/reset-password/request", {
      email,
      userTypeId: "3",
    });
  }
  resetPasswordCheckCode(code: string) {
    return Axios.post("/api/reset-password/check-code-active", {
      code,
    });
  }
  resetPasswordNewPassword(data: { newPassword: string; code: string }) {
    return Axios.post("/api/reset-password/check-code-active", data);
  }
}
