<template>
  <layout-main>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div
        v-if="isLoading"
        class="col-span-10 col-start-2 mt-3 grid grid-cols-12 gap-3 w-full"
      >
        <a-skeleton class="col-span-7"></a-skeleton>
        <a-skeleton class="col-span-4"></a-skeleton>
      </div>
      <div
        v-if="!isLoading"
        class="col-span-10 col-start-2 mt-3 grid grid-cols-12 gap-3 w-full"
      >
        <div class="flex flex-col col-span-7">
          <span class="text-3xl font-bold text-[#404145]">{{
            product.productName
          }}</span>
          <div class="flex items-center mt-4 flex-row">
            <a-avatar class="cursor-pointer" style="background-color: #e31e52">
              <span class="text-base font-semibold">{{
                $helpers.intialString(product.seller.fullname)
              }}</span>
            </a-avatar>
            <span class="ml-3 font-semibold text-base text-black">{{
              product.seller.fullname
            }}</span>
            <span class="ml-2 text-base font-semibold"
              >@{{ product.seller.username }}</span
            >
          </div>
          <a-divider class="mt-4 mb-0"></a-divider>
          <img
            :src="product.image"
            class="w-full h-[30vh] object-cover"
            alt="Image Product"
            v-if="product.image !== null"
          />
          <div
            v-if="product.image === null"
            class="flex border rounded-lg mt-4 justify-center items-center"
          >
            <i class="ri-image-fill text-[30vh] text-gray-300"></i>
          </div>
          <div class="flex justify-start flex-col mt-4 w-full items-start">
            <span class="text-black text-base font-semibold">Deskripsi</span>
            <div class="mt-2" v-html="product.productDescription"></div>
          </div>
        </div>
        <div class="col-span-5 flex justify-center items-start">
          <div
            class="border rounded p-5 w-[80%] flex justify-center items-center flex-col"
          >
            <div class="w-full flex justify-between items-center flex-row">
              <span class="font-medium text-base">Harga kelas</span>
              <span class="font-bold text-black text-base"
                >Rp.{{ $helpers.currencyFormat(product.productPrice) }}</span
              >
            </div>
            <a-button
              :loading="isLoadingOrder"
              :disabled="isLoadingOrder"
              @click="onClickOrder"
              class="mt-4"
              block
              type="primary"
              >Pesan Kelas</a-button
            >
            <a-button @click="onClickWishlist" block class="mt-4" type="link"
              >Tambahkan ke wishlist</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </layout-main>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ProductApi } from "@/api/product.api";
import { ProductTransactionApi } from "@/api/product-transaction.api";
import { WishlistApi } from "@/api/wishlist.api";

@Component
export default class ProductDetail extends Vue {
  productApi = new ProductApi();
  wishlistApi = new WishlistApi();
  productTransactionApi = new ProductTransactionApi();
  product = null as any;
  $helpers: any;
  isLoading = false;
  isLoadingOrder = false;
  isLoadingWishlist = false;

  async fetchProduct() {
    this.isLoading = true;
    try {
      const id = this.$route.params.id;
      const resp = await this.productApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        return;
      }
      this.product = resp.data.data;
    } catch (error: any) {
    } finally {
      this.isLoading = false;
    }
  }

  async onClickOrder() {
    this.isLoadingOrder = true;
    try {
      const resp = await this.productTransactionApi.create({
        productId: this.product.productId,
      });
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.$message.success("Berhasil memesan.");
      await this.$helpers.shortSetTimeOut(1000);
      this.$router.push("/transaction/");
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingOrder = false;
    }
  }

  async onClickWishlist() {
    this.isLoadingWishlist = true;
    try {
      const resp = await this.wishlistApi.create({
        productId: this.product.productId,
      });
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.$message.success("Berhasil ditambahkan.");
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingWishlist = false;
    }
  }

  mounted() {
    this.fetchProduct();
  }
}
</script>
