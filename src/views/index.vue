<template>
  <layout-main>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <page-home-banner />
      </div>
    </div>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <div @click="$router.push('/consultation')" class="cursor-pointer bg-blue-500 p-3 w-full flex justify-between px-4 rounded-lg">
          <span class="text-lg text-white font-medium">Konsultasi untuk tentukan pilihan kamu.</span>
          <i class="ri-arrow-right-line text-xl text-white font-bold"></i>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <span class="text-lg font-semibold text-black">Rekomendasi</span>
        <div class="w-full grid grid-cols-4 mt-3 gap-4">
          <div v-for="i in 9" class="flex flex-col rounded bg-white border">
            <div class="flex flex-col w-full p-2">
              <img
                style="width: 100%; height: 120px; object-fit: cover"
                src="https://static.vecteezy.com/system/resources/thumbnails/004/579/363/small_2x/digital-marketing-and-seo-optimization-strategy-free-vector.jpg"
                alt=""
              />
              <span class="text-sm mt-4 text-black font-semibold"
                >Digital Marketing</span
              >
              <span class="text-sm mt-1">Rp.58.000</span>
              <a-rate class="text-sm mt-1" disabled :value="4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Index extends Vue {}
</script>
