import Axios from "axios";

export class ProductTransactionStatusApi {
  get() {
    return Axios.get("/api/product-transaction-status");
  }
}
