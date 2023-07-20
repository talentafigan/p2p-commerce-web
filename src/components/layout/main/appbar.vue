<template>
  <div
    class="w-full z-[1] fixed bg-white border-b flex justify-center items-center flex-col"
  >
    <div
      class="w-full px-8 bg-[#f0f3f7] flex justify-end items-center flex-row w-full h-[33px]"
    >
      <span class="text-sm text-[#141414] cursor-pointer">Pusat Bantuan</span>
      <span
        class="text-sm text-[#141414] ml-4 cursor-pointer"
        @click="routeTopageLoginSeller"
        >Mulai Berjualan</span
      >
    </div>
    <div class="grid w-full px-8 grid-cols-3 w-full h-[72px]">
      <div class="grid grid-cols-8 col-span-2">
        <div class="col-span-2 flex justify-center items-center">
          <span
            @click="$router.push('/')"
            class="cursor-pointer font-semibold text-[18px] text-[#141414]"
            >Peluang</span
          >
        </div>
        <div class="col-span-5 flex justify-center items-center">
          <a-input-search @change.capture="onSearch" placeholder="Cari kelas" />
        </div>
        <div class="col-span-1 flex justify-center items-center">
          <a-dropdown :trigger="['click']">
            <i class="cursor-pointer text-xl ri-apps-2-line"></i>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <span>Kategori 1</span>
              </a-menu-item>
              <a-menu-item key="1">
                <span>Kategori 2</span>
              </a-menu-item>
              <a-menu-item key="3"> <span>Kategori 2</span> </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div
        v-if="authState.token === null"
        class="flex justify-end items-center flex-row"
      >
        <a-button type="primary" @click="$router.push('/auth/login')" ghost>
          Masuk
        </a-button>
        <a-button
          class="ml-2"
          @click="$router.push('/auth/register')"
          type="primary"
        >
          Daftar
        </a-button>
      </div>
      <div
        v-if="authState.token !== null"
        class="flex justify-end items-center flex-row"
      >
        <span class="font-semibold text-base mr-2">{{
          authState.user.fullname
        }}</span>
        <a-dropdown :trigger="['click']">
          <a-avatar
            class="cursor-pointer"
            size="large"
            style="background-color: #e31e52"
          >
            <span class="text-base font-semibold">{{
              $helpers.intialString(authState.user.fullname)
            }}</span>
          </a-avatar>
          <a-menu class="w-[150px]" slot="overlay">
            <a-menu-item @click="$router.push('/account/profile')" key="0">
              <div class="w-full flex flex-row justify-between items-center">
                <span>Profile</span>
                <li class="text-base ri-user-line"></li>
              </div>
            </a-menu-item>
            <a-menu-item @click="$router.push('/account/wallet')" key="1">
              <div class="w-full flex flex-row justify-between items-center">
                <span>Dompet</span>
                <li class="text-base ri-wallet-3-line"></li>
              </div>
            </a-menu-item>
            <a-menu-item @click="$router.push('/consultation')" key="1">
              <div class="w-full flex flex-row justify-between items-center">
                <span>Konsultasi</span>
                <li class="text-base ri-customer-service-2-line"></li>
              </div>
            </a-menu-item>
            <a-menu-item @click="$router.push('/transaction')" key="2">
              <div class="w-full flex flex-row justify-between items-center">
                <span>Daftar transaksi</span>
                <li class="text-base ri-file-list-line"></li>
              </div>
            </a-menu-item>
            <a-menu-item @click="onClickLogout" key="2">
              <div class="w-full flex flex-row justify-between items-center">
                <span>Keluar</span>
                <li class="text-base ri-logout-circle-r-line"></li>
              </div>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { AuthApi } from "@/api/auth.api";
import { ProductApi } from "@/api/product.api";

@Component
export default class LayoutMainAppbar extends Vue {
  authApi = new AuthApi();
  productApi = new ProductApi();
  searchKey = "";
  routeTopageLoginSeller() {
    window.open(process.env.VUE_APP_WEB_SELLER_URL);
  }

  async onClickLogout() {
    try {
      await this.authApi.logout();
    } catch (error) {
    } finally {
      this.$store.commit("auth/resetAuth");
      window.location.reload();
    }
  }

  authState = this.$store.state.auth;

  onSearch(event: any) {
    if (event.type !== "change") return;
    window.location.href =
      "/product/search?key=" +
      event.target.value +
      `${
        this.$route.query.category
          ? "&category=" + this.$route.query.category
          : ""
      }`;
  }

  $helpers: any;
}
</script>
