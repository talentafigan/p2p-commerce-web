<template>
  <page-auth-container id="container-login">
    <div class="w-full px-6">
      <div class="flex justify-start items-center mb-6">
        <span class="text-lg font-semibold">Masukan akun Anda</span>
      </div>

      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input placeholder="Email"> </a-input>
      </div>
      <div class="flex justify-between flex-row items-center w-full mt-6">
        <a-button type="primary" html-type="submit" @click="routeToPageLogin">
          Kembali
        </a-button>
        <a-button type="primary" html-type="submit"> Cari </a-button>
      </div>
    </div>
  </page-auth-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class authClientForgotPasword extends Vue {
  routeToPageLogin() {
    this.$router.push("/auth/client/login");
  }
}
</script>
