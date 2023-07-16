<template>
  <layout-main>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <div
          v-if="!isLoading && products.length === 0"
          class="w-full mt-3 flex justify-center items-center"
        >
          <a-empty />
        </div>
        <div v-if="isLoading" class="w-full grid grid-cols-5 mt-3 gap-4">
          <a-skeleton active v-for="item in 5" :key="item" />
        </div>
        <div v-if="!isLoading" class="w-full grid grid-cols-5 mt-3 gap-4">
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
export default class ProductSearch extends Vue {
  productApi = new ProductApi();
  products = [] as any[];
  $helpers: any;
  isLoading = false;

  query = {
    page: 0,
    size: 10,
  };

  async fetchProduct() {
    this.isLoading = true;
    try {
      const params = {
        ...this.query,
        searchKey: this.$route.query.key,
        productCategoryId: this.$route.query.category
      };
      const resp = await this.productApi.get(params);
      if (resp.data.status !== "SUCCESS") {
        return;
      }
      this.products = resp.data.data.content;
    } catch (error: any) {
    } finally {
      this.isLoading = false;
    }
  }

  mounted() {
    this.fetchProduct();
  }
}
</script>
