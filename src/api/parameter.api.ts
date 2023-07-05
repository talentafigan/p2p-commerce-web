import Axios from "axios";

export class ParameterApi {
  getAdminFees() {
    return Axios.get("/api/admin/fees");
  }
  getCoinPrice() {
    return Axios.get("/api/coin/price");
  }
}
