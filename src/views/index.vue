<template>
  <layout-main>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <page-home-banner />
      </div>
    </div>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <div
          @click="$router.push('/consultation')"
          class="cursor-pointer bg-blue-500 p-3 w-full flex justify-between px-4 rounded-lg"
        >
          <span class="text-lg text-white font-medium"
            >Konsultasi untuk tentukan pilihan kamu.</span
          >
          <i class="ri-arrow-right-line text-xl text-white font-bold"></i>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 mb-[100px] mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <span class="text-lg font-semibold text-black">Rekomendasi</span>
        <div
          v-if="!loadingFetchRecomendation && products.length === 0"
          class="w-full flex justify-center items-center"
        >
          <a-empty />
        </div>
        <div
          v-if="loadingFetchRecomendation"
          class="w-full grid grid-cols-5 mt-3 gap-4"
        >
          <a-skeleton active v-for="item in 5" />
        </div>
        <div
          v-if="!loadingFetchRecomendation"
          class="w-full grid grid-cols-5 mt-3 gap-4"
        >
          <common-card-product
            v-for="(item, index) in products"
            :key="index"
            @click="$router.push('/product/' + item.productId)"
            :productName="item.productName"
            :productPrice="item.productPrice"
            :rating="item.rating"
            :image="item.image"
          />
        </div>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ProductApi } from "@/api/product.api";

@Component
export default class Index extends Vue {
  productApi = new ProductApi();
  products = [] as any[];
  $helpers: any;
  loadingFetchRecomendation = false;

  async fetchProduct() {
    this.loadingFetchRecomendation = true;
    try {
      const resp = await this.productApi.getRecomendation();
      if (resp.data.status !== "SUCCESS") {
        return;
      }
      this.products = resp.data.data;
    } catch (error: any) {
    } finally {
      this.loadingFetchRecomendation = false;
    }
  }

  mounted() {
    this.fetchProduct();
  }
}
</script>
