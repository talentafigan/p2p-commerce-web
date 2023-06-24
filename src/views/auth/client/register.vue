<template>
  <page-auth-container id="container-login">
    <div class="w-full px-6">
      <div class="flex justify-start items-center mb-3">
        <span class="text-lg font-semibold">Buat akunmu</span>
      </div>
      <div class="flex justify-start items-center mb-5">
        <span class="text-sm"
          >Sudah ada akun?
          <span
            style="color: rgb(0, 136, 255)"
            class="cursor-pointer"
            @click="routeToPageLogin"
            >Masuk</span
          ></span
        >
      </div>

      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input
          placeholder="Nama Lengkap"
          v-model="form.fullname"
          size="large"
        ></a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input
          placeholder="Username"
          v-model="form.username"
          size="large"
        ></a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input-password
          type="password"
          placeholder="Password"
          v-model="form.password"
          size="large"
        ></a-input-password>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input
          type="email"
          placeholder="Email"
          v-model="form.email"
          size="large"
        ></a-input>
      </div>

      <a-input
        style="width: 100%"
        placeholder="No Telepon"
        v-model="form.phone"
        size="large"
      >
      </a-input>
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
          block
          :loading="isLoading"
          @click="onClickRegister"
        >
          Daftar
        </a-button>
      </div>
    </div>
  </page-auth-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { AuthApi } from "@/api/auth.api";

@Component
export default class authClientRegister extends Vue {
  $helpers: any;
  isLoading = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    email: "",
    fullname: "",
    password: "",
    phone: "",
    username: "",
  };

  authApi = new AuthApi();
  routeToPageLogin() {
    this.$router.push("/auth/login");
  }
  async onClickRegister() {
    if (
      !this.form.email ||
      !this.form.password ||
      !this.form.fullname ||
      !this.form.phone ||
      !this.form.username
    )
      return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.register(this.form);
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
