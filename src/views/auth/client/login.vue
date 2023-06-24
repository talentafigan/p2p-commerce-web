<template>
  <page-auth-container id="container-login">
    <div class="w-full px-6">
      <div class="flex justify-start items-center mb-3">
        <span class="text-lg font-semibold">Masuk</span>
      </div>
      <div class="flex justify-start items-center mb-5">
        <span class="text-sm"
          >Belum ada akun?
          <span
            style="color: rgb(0, 136, 255)"
            class="cursor-pointer"
            @click="routeToPageRegister"
            >Daftar</span
          ></span
        >
      </div>

      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input placeholder="Username" v-model="form.key" size="large">
        </a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input-password
          type="password"
          placeholder="Password"
          v-model="form.password"
          size="large"
        >
        </a-input-password>
      </div>
      <div class="flex justify-end items-center mb-5">
        <span
          style="color: rgb(0, 136, 255)"
          class="cursor-pointer"
          @click="routeToPageForgotPassword"
          >Lupa Sandi ?</span
        >
      </div>
      <a-alert
        message="Error"
        v-if="showErrorMessage"
        :description="errorMessage"
        type="error"
        show-icon
      />
      <div class="flex justify-center items-center w-full mt-5">
        <a-button
          type="primary"
          html-type="submit"
          :loading="isLoading"
          block
          @click="onClickLogin"
        >
          Masuk
        </a-button>
      </div>
    </div>
  </page-auth-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AuthApi } from "@/api/auth.api";

@Component
export default class AuthLogin extends Vue {
  $helpers: any;
  isLoading = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    key: "",
    password: "",
  };

  authApi = new AuthApi();

  routeToPageForgotPassword() {
    this.$router.push("/auth/forgot-password");
  }
  routeToPageRegister() {
    this.$router.push("/auth/register");
  }
  async onClickLogin() {
    if (!this.form.key || !this.form.password) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.login(this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      console.log(response);

      this.$store.commit("auth/setAuth", {
        token: response.data.data.accessToken,
        user: response.data.data.user,
        login_date: new Date().toISOString(),
      });
      this.$nextTick(() => {
        window.location.reload();
      });
    } catch (error: any) {
      this.showErrorMessage = true;
      this.errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
