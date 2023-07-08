import Axios from "axios";

export class ChatApi {
  getByConversationId(conversationId: string) {
    return Axios.get("/api/chat-message/" + conversationId);
  }
  send(data: any) {
    return Axios.post("/api/chat-message/", data);
  }
}
