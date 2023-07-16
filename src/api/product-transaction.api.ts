import Axios from "axios";

export class ProductTransactionApi {
  get(params?: any) {
    return Axios.get("/api/product-transaction", {
      params,
    });
  }
  getDetail(id: any) {
    return Axios.get("/api/product-transaction/" + id);
  }
  create(data?: any) {
    return Axios.post("/api/product-transaction/", data);
  }
  delete(id: any) {
    return Axios.delete("/api/product-transaction/" + id);
  }
  updateProof(id: any, data?: any) {
    return Axios.put("/api/product-transaction/proof/" + id, data);
  }
  updateRating(id: any, data?: any) {
    return Axios.put("/api/product-transaction/rating/" + id, data);
  }
}
