import Axios from "axios";

export class ConsultationApi {
  getConsultationActive() {
    return Axios.get("/api/consultation/active");
  }
  create() {
    return Axios.post("/api/consultation");
  }
}
