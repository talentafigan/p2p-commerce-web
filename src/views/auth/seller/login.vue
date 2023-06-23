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
        <a-input placeholder="Username"> </a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input type="password" placeholder="Password"> </a-input>
      </div>
      <div class="flex justify-end items-center mb-5">
        <span
          style="color: rgb(0, 136, 255)"
          class="cursor-pointer"
          @click="routeToPageForgotPassword"
          >Lupa Sandi ?</span
        >
      </div>
      <div class="flex justify-center items-center w-full mt-5">
        <a-button type="primary" html-type="submit" block> Masuk </a-button>
      </div>
    </div>
  </page-auth-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class authSellerLogin extends Vue {
  routeToPageForgotPassword() {
    this.$router.push("/auth/seller/forgot-password");
  }
  routeToPageRegister() {
    this.$router.push("/auth/seller/register");
  }
}
</script>
