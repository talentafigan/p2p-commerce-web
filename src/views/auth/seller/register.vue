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
        <a-input placeholder="Nama Lengkap"></a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input placeholder="Username"></a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input type="password" placeholder="Password"></a-input>
      </div>
      <div class="w-full flex justify-between mb-3 items-start flex-col">
        <a-input type="email" placeholder="Email"></a-input>
      </div>

      <a-input style="width: 100%" placeholder="No Telepon">
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '62' }]"
          style="width: 70px"
        >
          <a-select-option value="62"> +62 </a-select-option>
        </a-select>
      </a-input>
      <div class="flex justify-center items-center w-full mt-5">
        <a-button type="primary" html-type="submit" block> Daftar </a-button>
      </div>
    </div>
  </page-auth-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class authSellerRegister extends Vue {
  routeToPageLogin() {
    this.$router.push("/auth/seller/login");
  }
}
</script>
