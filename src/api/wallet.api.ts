import Axios from "axios";

export class WalletApi {
  getBalance() {
    return Axios.get("/api/wallet/balance");
  }
  getHistory(date: string) {
    return Axios.get("/api/wallet/history", {
      params: {
        date: date,
      },
    });
  }
  topUp(data: { amount: number }) {
    return Axios.post("/api/wallet/top-up", data);
  }
}
