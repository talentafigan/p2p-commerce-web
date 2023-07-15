import Axios from "axios";

export class WishlistApi {
  create(data?: any) {
    return Axios.post("/api/wishlist", data);
  }
  get() {
    return Axios.get("/api/wishlist");
  }
}
