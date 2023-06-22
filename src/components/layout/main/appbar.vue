<template>
  <div
    class="w-full z-[1] fixed bg-white border-b flex justify-center items-center flex-col"
  >
    <div class="w-full px-8 bg-[#f0f3f7] flex justify-end items-center flex-row w-full h-[33px]">
      <span class="text-sm text-[#141414] cursor-pointer">Pusar Bantuan</span>
      <span class="text-sm text-[#141414] ml-4 cursor-pointer">Mulai Berjualan</span>
    </div>
    <div class="grid w-full px-8 grid-cols-3 w-full h-[72px]">
      <div class="grid grid-cols-8 col-span-2">
        <div class="col-span-2 flex justify-center items-center">
          <span class="font-semibold text-[18px] text-[#141414]"
            >P2P Commerce</span
          >
        </div>
        <div class="col-span-5 flex justify-center items-center">
          <a-input-search placeholder="Cari kelas" />
        </div>
        <div class="col-span-1 flex justify-center items-center">
          <a-dropdown :trigger="['click']">
            <span
              class="text-[#141414] font-medium cursor-pointer hover:bg-gray-100 px-3 py-2 rounded"
              >Kategori</span
            >
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
      <div class="flex justify-end items-center flex-row">
        <a-button type="primary" ghost> Masuk </a-button>
        <a-button class="ml-2" type="primary"> Daftar </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class LayoutMainAppbar extends Vue {}
</script>
