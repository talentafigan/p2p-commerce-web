<template>
  <layout-main>
    <div class="grid grid-cols-12 w-full">
      <div
        class="col-span-6 flex flex-col items-center border-x col-start-4 h-[83vh]"
      >
        <div
          v-if="isLoading"
          class="w-full bg-white flex justify-center h-[83vh] items-center"
        >
          <span class="text-base">Mohon tunggu...</span>
        </div>
        <div
          v-if="consultation === null && !isLoading"
          class="w-[50%] bg-white text-center h-[83vh] flex justify-center items-center flex-col"
        >
          <span class="text-lg text-black font-semibold"
            >Konsultasikan kebutuhan kamu untuk mendapatkan rekomendasi
            terbaik</span
          >
          <a-button
            :loading="isLoadingCreate"
            :disabled="isLoadingCreate"
            @click="createConsultation"
            type="primary"
            class="mt-6"
            >Konsultasi sekarang</a-button
          >
        </div>
        <div
          v-if="consultation !== null && !isLoading"
          class="w-full text-center h-[83vh] flex justify-start items-center flex-col"
        >
          <div
            class="w-full sticky top-0 h-[60px] flex justify-start px-5 border bg-white"
          >
            <div class="flex justify-center items-center">
              <span class="font-medium text-black text-base">{{
                consultation.admin.fullname
              }}</span>
              <i
                class="ri-checkbox-circle-fill ml-1 text-green-500 text-base"
              ></i>
            </div>
          </div>
          <div
            id="container-chat"
            class="flex w-full overflow-y-auto px-2 py-2 h-[61vh] flex-col"
          >
            <div
              v-for="item in chats"
              :class="[
                'flex items-center flex-row my-1',
                item.creators?.userId === $store.state.auth.user.userId
                  ? 'justify-end'
                  : 'justify-start',
              ]"
            >
              <div
                :class="[
                  'p-3 flex flex-col rounded max-w-[50%] flex w-max',
                  item.creators?.userId === $store.state.auth.user.userId
                    ? 'bg-primary items-end text-end'
                    : 'bg-white border items-start text-start',
                ]"
              >
                <span
                  :class="[
                    'text-base',
                    item.creators?.userId === $store.state.auth.user.userId
                      ? 'text-white'
                      : 'text-black',
                  ]"
                  >{{ item.content }}</span
                >
                <span
                  :class="[
                    'text-xs mt-1',
                    item.creators?.userId === $store.state.auth.user.userId
                      ? 'text-white'
                      : 'text-black',
                  ]"
                  >{{ $helpers.fullDate(item.createDate) }}</span
                >
              </div>
            </div>
          </div>
          <div class="grid grid-cols-12 w-full w-full fixed bottom-0">
            <div
              class="col-span-6 border flex flex-row items-center justify-center py-3 col-start-4 px-4 bg-white"
            >
              <a-textarea
                v-model="formChat.content"
                placeholder="Masukan pesan..."
                :rows="2"
              ></a-textarea>
              <a-button
                @click="onSendMessage"
                type="primary"
                shape="circle"
                class="ml-2"
              >
                <i class="ri-send-plane-line"></i>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { ConsultationApi } from "@/api/consultation.api";
import { ChatApi } from "@/api/chat.api";

@Component
export default class Consultation extends Vue {
  timerRefecthChat = 0;

  $helpers: any;

  @Watch("timerRefecthChat", {
    immediate: true,
  })
  async refetchChat(val: any) {
    if (val > 0) {
      setTimeout(() => {
        this.timerRefecthChat--;
      }, 1000);
    } else {
      if (this.consultation === null) {
        this.timerRefecthChat = 5;
        return;
      }
      await this.fetchChatMessage();
      this.timerRefecthChat = 5;
    }
  }

  isLoading = false;
  isLoadingCreate = false;
  isLoadingLoadChat = false;

  consultationApi = new ConsultationApi();
  chatApi = new ChatApi();

  consultation = null as any;
  chats = null as any;

  formChat = {
    content: null,
    attachment: null,
  };

  async fetchActiveConsultation() {
    this.isLoading = true;
    try {
      const resp = await this.consultationApi.getConsultationActive();
      if (resp.data.status !== "SUCCESS") {
        this.consultation = null;
        return;
      }
      if (resp.data.data.length === 0) {
        this.consultation = null;
        return;
      }
      this.consultation = resp.data.data[resp.data.data.length - 1];
      this.fetchChatMessage();
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }
  fetchChatMessage() {
    return new Promise(async (resolve, reject) => {
      this.isLoadingLoadChat = true;
      try {
        const resp = await this.chatApi.getByConversationId(
          this.consultation.conversationId
        );
        if (resp.data.status !== "SUCCESS") {
          this.$message.error(resp.data.message);
          return;
        }
        this.chats = resp.data.data;
        this.$nextTick(() => {
          document.getElementById("container-chat")?.scrollTo({
            behavior: "smooth",
            top: document.getElementById("container-chat")?.scrollHeight,
          });
        });
      } catch (error: any) {
        const errorMessage = error.response
          ? error.response.message
          : "System Error, please contact our team";
        this.$message.error(errorMessage);
      } finally {
        this.isLoadingLoadChat = false;
        resolve(true);
      }
    });
  }
  async createConsultation() {
    this.isLoadingCreate = true;
    try {
      const resp = await this.consultationApi.create();
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.fetchActiveConsultation();
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingCreate = false;
    }
  }
  async onSendMessage() {
    try {
      const resp = await this.chatApi.send({
        ...this.formChat,
        conversationId: this.consultation.conversationId,
      });
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.formChat = {
        content: null,
        attachment: null,
      };
      this.fetchChatMessage();
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    }
  }
  mounted() {
    this.fetchActiveConsultation();
  }
}
</script>
