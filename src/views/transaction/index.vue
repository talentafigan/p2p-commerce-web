<template>
  <layout-main>
    <div class="grid grid-cols-12 mt-4 w-full">
      <div class="col-span-8 col-start-3">
        <div class="w-full flex flex-col">
          <div class="w-full gap-4 grid grid-cols-12">
            <a-input
              @change.capture="onChangeProductName"
              class="col-span-5"
              v-model="query.productName"
              placeholder="Cari nama kelas"
            >
              <template #prefix>
                <i class="ri-search-line"></i>
              </template>
            </a-input>
            <a-date-picker
              format="YYYY-MM-DD"
              locale="id"
              class="col-span-3"
              @change="onChangeDate"
              placeholder="Pilih tanggal transaksi"
            >
            </a-date-picker>
            <a-select
              v-model="query.productTransactionStatusId"
              placeholder="Pilih status"
              @change="fetchProductTransaction"
              class="w-full col-span-4"
            >
              <a-select-option :key="'all'" :value="''">
                Semua status
              </a-select-option>
              <a-select-option
                v-for="item in productTransactionStatusList"
                :key="item.productTransactionStatusId"
                :value="item.productTransactionStatusId"
              >
                {{ item.productTransactionStatusName }}
              </a-select-option>
            </a-select>
          </div>
          <div class="w-full flex justify-center items-center pt-10 flex-col">
            <a-empty
              v-if="
                !isLoadingProductTransaction &&
                productTransactionList.length === 0
              "
            ></a-empty>
            <a-skeleton v-if="isLoadingProductTransaction"></a-skeleton>
            <common-card-product-transaction
              class="mb-3"
              v-for="item in productTransactionList"
              :key="item.productTransactionId"
              :productName="item.product.productName"
              :productPrice="item.product.productPrice"
              :sellerName="item.product.seller.fullname"
              :createDate="item.createDate"
              :productTransactionStatusId="
                item.productTransactionStatus.productTransactionStatusId
              "
              :productTransactionStatusName="
                item.productTransactionStatus.productTransactionStatusName
              "
              :productTransactionId="item.productTransactionId"
              :productImage="item.product.image"
              :amount="item.amount"
            ></common-card-product-transaction>
          </div>
        </div>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ProductTransactionApi } from "@/api/product-transaction.api";
import { ProductTransactionStatusApi } from "@/api/product-transaction-status.api";
import { ProductTransactionStatusMapper } from "@/types/mapper";
import ProductTransactionData from "@/utils/data/product-transaction.json"

@Component
export default class ProductTransaction extends Vue {
  productTransactionStatusApi = new ProductTransactionStatusApi();
  productTransactionApi = new ProductTransactionApi();

  productTransactionStatusList = [] as any[];

  productTransactionList = ProductTransactionData as any[];

  isLoadingProductTransaction = false;

  query = {
    productTransactionStatusId: "",
    productName: "",
    create_date: "",
  };

  productTransactionStatusMapper = ProductTransactionStatusMapper;

  $helpers: any;

  async fetchProductTransactionStatus() {
    try {
      const resp = await this.productTransactionStatusApi.get();
      if (resp.data.status !== "SUCCESS") {
        return;
      }
      this.productTransactionStatusList = resp.data.data;
    } catch (error) {}
  }

  onChangeProductName(event: any) {
    if (event.type !== "change") return;
    this.fetchProductTransaction();
  }

  onChangeDate(event: any, dateString: any) {
    this.query.create_date = dateString;
    this.fetchProductTransaction();
  }

  async fetchProductTransaction() {
    this.isLoadingProductTransaction = true;
    try {
      const resp = await this.productTransactionApi.get(this.query);
      if (resp.data.status !== "SUCCESS") {
        return;
      }
      this.productTransactionList = resp.data.data;
    } catch (error) {
    } finally {
      this.isLoadingProductTransaction = false;
    }
  }

  mounted() {
    this.fetchProductTransactionStatus();
    this.fetchProductTransaction();
  }
}
</script>
