import Axios from "axios";

export class ProfileApi {
    profileMe(accessToken? : any) {
        return Axios.get("/api/profile/me", {
            headers:{
                "x-Token-id":accessToken
            }
        });
      }
    
}
