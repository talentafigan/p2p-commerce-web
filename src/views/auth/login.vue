<template>
  <a-row class="w-full">
    <a-col :span="8" :offset="8">
      <div class="h-screen flex justify-center flex-col">
        <span class="text-2xl font-semibold">Masuk</span>
        <span class="text-sm mt-2"
          >Belum ada akun?
          <span
            class="cursor-pointer text-primary"
            @click="$router.push('/auth/register')"
            >Daftar</span
          ></span
        >
        <a-row class="mt-[5vh]">
          <a-col :span="24">
            <a-input
              placeholder="Username"
              class="w-full"
              v-model="form.key"
              size="large"
            >
            </a-input>
          </a-col>
          <a-col class="mt-3" :span="24">
            <a-input-password
              class="w-full"
              type="password"
              placeholder="Password"
              v-model="form.password"
              size="large"
            >
            </a-input-password>
          </a-col>
        </a-row>
        <div class="flex mt-3 w-full justify-end items-center">
          <span
            class="cursor-pointer text-primary"
            @click="$router.push('/auth/forgot-password')"
            >Lupa Sandi ?</span
          >
        </div>
        <a-alert
          class="mt-4"
          message="Error"
          v-if="showErrorMessage"
          :description="errorMessage"
          type="error"
          show-icon
        />
        <a-button
          :disabled="isLoading"
          class="mt-4"
          size="large"
          type="primary"
          :loading="isLoading"
          block
          @click="onClickLogin"
        >
          Masuk
        </a-button>
        <a-button
          class="mt-4"
          type="link"
          block
          @click="$router.push('/')"
        >
          <i class="ri-arrow-left-line mr-2"></i>
          Kembali ke beranda
        </a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AuthApi } from "@/api/auth.api";
import { ProfileApi } from "@/api/profile.api";

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
  profileApi = new ProfileApi();
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
      const userProfile = await this.profileApi.me(
        response.data.data.accessToken
      );
      if (userProfile.data.status !== "SUCCESS") return;
      this.$store.commit("auth/setAuth", {
        token: response.data.data.accessToken,
        user: userProfile.data.data.user,
      });
      this.$router.push("/");
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
