import Axios from "axios";

export class ProfileApi {
  me(accessToken?: string) {
    return Axios.get("/api/profile/me", {
      headers: accessToken
        ? {
            "x-token-id": accessToken,
          }
        : {},
    });
  }
  update(data: any) {
    return Axios.put("/api/profile", data);
  }
  changePassword(data: any) {
    return Axios.put("/api/profile/new-password", data);
  }
}
