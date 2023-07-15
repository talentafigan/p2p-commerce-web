import Axios from "axios";

export class ProductApi {
  getRecomendation() {
    return Axios.get("/api/product/recommendation");
  }
  get(params?: any) {
    return Axios.get("/api/product", {
      params,
    });
  }
  getDetail(id?: any) {
    return Axios.get("/api/product/" + id);
  }
}
