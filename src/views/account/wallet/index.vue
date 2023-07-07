<template>
  <layout-main>
    <div class="bg-primary h-[30vh]"></div>
    <div class="w-full absolute top-[38vh] grid grid-cols-12 gap-5 items-start">
      <div
        class="md:col-start-3 bg-white border p-4 rounded flex flex-col md:col-span-3 col-span-12"
      >
        <span class="text-lg font-semibold">Dompet Saya</span>
        <div class="w-full flex justify-between mt items-center flex-row">
          <div class="flex justify-center items-end flex-row">
            <span class="font-bold text-3xl">{{
              $helpers.currencyFormat(walletBalance)
            }}</span
            ><span class="text-base ml-1">Koin</span>
          </div>
          <a-button @click="showModalTopUp = true" type="primary"
            >Top-up</a-button
          >
        </div>
      </div>
      <div class="flex flex-col md:col-span-5 col-span-12">
        <a-modal maskClosable v-model="showModalTopUp" title="Top-up">
          <div class="w-full flex justify-center items-start flex-col">
            <span class="text-black text-base">Masukan Jumlah Koin</span>
            <a-input-number
              :placeholder="`Harga 1 Koin = Rp.${$helpers.currencyFormat(
                parameter.coinPrice
              )}`"
              size="large"
              v-model="formTopUp.amount"
              class="w-full mt-[.6rem]"
            ></a-input-number>
          </div>
          <div class="flex justify-between mt-4">
            <span class="font-medium">Harga</span>
            <span class="text-black font-semibold"
              >({{ $helpers.currencyFormat(formTopUp.amount) }} Koin) Rp.{{
                $helpers.currencyFormat(formTopUp.amount * parameter.coinPrice)
              }}</span
            >
          </div>
          <div class="flex justify-between mt-2">
            <span class="font-medium">Biaya Admin</span>
            <span class="text-black font-semibold"
              >Rp.{{ $helpers.currencyFormat(parameter.adminFees) }}</span
            >
          </div>
          <div class="flex justify-between mt-2">
            <span class="font-medium text-black">Sub Total</span>
            <span class="text-primary font-semibold"
              >Rp.{{
                $helpers.currencyFormat(
                  formTopUp.amount * parameter.coinPrice + parameter.adminFees
                )
              }}</span
            >
          </div>
          <template #footer>
            <a-button
              @click="onSubmitTop"
              :disabled="isLoadingTopUp"
              :loading="isLoadingTopUp"
              type="primary"
              block
              >Konfirmasi</a-button
            >
          </template>
        </a-modal>
        <div class="w-full bg-white flex flex-col border rounded py-4 px-4">
          <span class="text-lg font-bold">Transaksi</span>
          <a-date-picker
            v-model="historyDate"
            format="YYYY-MM-DD"
            locale="id"
            @change="fetchHistoryWallet"
            class="mt-[0.8rem] mb-[0.8rem]"
            placeholder="Pilih Tanggal"
          ></a-date-picker>
          <div v-if="walletHistory.length === 0">
            <div
              v-if="isLoadingFetchHistory"
              class="w-full flex justify-center items-center flex-col p-5"
            >
              <span>Loading...</span>
            </div>
            <a-empty v-if="!isLoadingFetchHistory" />
          </div>
          <div
            v-if="walletHistory.length > 0"
            class="overflow-y-auto max-h-[35vh] simple-scroller px-3"
          >
            <common-card-wallet-history
              v-for="(item, index) in walletHistory"
              :key="index"
              :type="item.type"
              :amount="item.amount"
              :date="item.createDate"
              :fee="item.fee"
              :transactionId="item.transactionId"
              :transactionType="item.transactionType?.transactionTypeId"
              :transactionTypeTitle="item.transactionType?.name"
              :status="item.status?.statusId"
              :totalPayment="item.totalPayment"
              :invoiceUrl="item.invoice ? item.invoice.invoiceUrl : null"
            />
          </div>
        </div>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { WalletApi } from "@/api/wallet.api";
import { ParameterApi } from "@/api/parameter.api";

@Component
export default class AccountWallet extends Vue {
  walletApi = new WalletApi();
  parameterApi = new ParameterApi();
  walletBalance = 0;
  walletHistory = [] as any[];
  historyDate = null as any;

  parameter = {
    adminFees: 0,
    coinPrice: 0,
  };

  formTopUp = {
    amount: 0,
  };

  $helpers: any;

  isLoadingTopUp = false;
  isLoadingFetchHistory = false;

  showModalTopUp = false;
  async fetchBalance() {
    try {
      const resp = await this.walletApi.getBalance();
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.walletBalance = resp.data.data.balance;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    }
  }

  async fetchHistoryWallet(value: any, dateString: any) {
    this.isLoadingFetchHistory = true;
    try {
      const resp = await this.walletApi.getHistory(
        dateString
          ? dateString
          : this.$helpers.dateShortFormat(new Date().toISOString())
      );
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.walletHistory = resp.data.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingFetchHistory = false;
    }
  }

  async fetchCoinPrice() {
    try {
      const resp = await this.parameterApi.getCoinPrice();
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.parameter.coinPrice = resp.data.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    }
  }

  async fetchAdminFees() {
    try {
      const resp = await this.parameterApi.getAdminFees();
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.parameter.adminFees = resp.data.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    }
  }

  mounted() {
    this.fetchHistoryWallet(null, null);
    this.fetchBalance();
    this.fetchCoinPrice();
    this.fetchAdminFees();
  }
  async onSubmitTop() {
    if (!this.formTopUp.amount) {
      return;
    }
    this.isLoadingTopUp = true;
    try {
      const resp = await this.walletApi.topUp(this.formTopUp);
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.$message.success("Berhasil. Silahkan lakukan pembayaran!");
      await this.$helpers.shortSetTimeOut(1000);
      window.open(resp.data.data.invoice?.invoiceUrl, "_blank");
      this.showModalTopUp = false;
      this.formTopUp.amount = 0;
      this.historyDate = null;
      this.fetchHistoryWallet(null, null);
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingTopUp = false;
    }
  }
}
</script>
