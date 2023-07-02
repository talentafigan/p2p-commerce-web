<template>
  <layout-main>
    <div class="bg-primary h-[30vh]"></div>
    <div class="w-full absolute top-[38vh] grid grid-cols-12 gap-5 items-start">
      <div class="md:col-start-3 bg-white border p-3 rounded flex flex-col md:col-span-3 col-span-12">
        <span class="text-lg font-semibold">Dompet Saya</span>
        <div class="w-full flex justify-between items-center flex-row">
          <div class="flex justify-center items-end flex-row">
            <span class="font-bold text-3xl">4</span
            ><span class="text-base ml-1">Koin</span>
          </div>
          <a-button
            @click="showModalTopUp = true"
            type="primary"
            >Top-up</a-button
          >
        </div>
      </div>
      <div class="flex flex-col col-span-5">
        <a-modal
          maskClosable
          :closable="false"
          cancelText="Batal"
          okText="Konfirmasi"
          v-model="showModalTopUp"
          title="Top-up"
          @ok="onSubmitTop"
        >
          <div class="w-full flex justify-center items-start flex-col">
            <span class="text-black text-base">Masukan Jumlah Koin</span>
            <a-input-number
              size="large"
              class="w-full mt-[.6rem]"
            ></a-input-number>
          </div>
          <div class="flex justify-between mt-4">
            <span class="font-medium">Harga</span>
            <span class="text-black font-semibold">(8 Koin) Rp.80.000</span>
          </div>
          <div class="flex justify-between mt-2">
            <span class="font-medium">Biaya Admin</span>
            <span class="text-black font-semibold">Rp.2.500</span>
          </div>
          <div class="flex justify-between mt-2">
            <span class="font-medium text-black">Sub Total</span>
            <span class="text-primary font-semibold">Rp.82.500</span>
          </div>
        </a-modal>
        <div class="w-full bg-white flex flex-col border rounded py-4 px-4">
          <span class="text-lg font-bold">Transaksi</span>
          <a-date-picker
            class="mt-[0.8rem] mb-[0.8rem]"
            placeholder="Pilih Tanggal"
          ></a-date-picker>
          <div class="overflow-y-auto max-h-[35vh] simple-scroller px-3">
            <common-card-wallet-history
              v-for="(item, index) in walletHistory"
              :key="index"
              :type="item.type"
              :amount="item.amount"
              :cashPosition="item.cashPosition"
              :date="item.date"
              :status="item.status"
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

@Component
export default class AccountWallet extends Vue {
  walletHistory = [
    {
      type: "1",
      amount: 2,
      cashPosition: "d",
      date: "Jumat, 30 Jun 2023 16:01",
      status: "1",
    },
    {
      type: "2",
      amount: 2,
      cashPosition: "c",
      date: "Jumat, 30 Jun 2023 16:01",
      status: "2",
    },
    {
      type: "2",
      amount: 2,
      cashPosition: "c",
      date: "Jumat, 30 Jun 2023 16:01",
      status: "1",
    },
  ];

  showModalTopUp = false;

  onSubmitTop() {
    this.showModalTopUp = false;
  }
}
</script>
