import Axios from "axios";

export class ProductTransactionApi {
  get(params?: any) {
    return Axios.get("/api/product-transaction", {
      params,
    });
  }
  create(data?: any) {
    return Axios.post("/api/product-transaction/", data);
  }
}
