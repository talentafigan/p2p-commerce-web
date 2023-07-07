<template>
  <div
    @click="showModalDetail = true"
    class="cursor-pointer py-4 flex flex-col w-full grid grid-cols-10 gap-1 items-start"
  >
    <i class="text-2xl ri-coins-fill col-span-1"></i>
    <div class="flex col-span-6 items-start flex-col">
      <div class="flex flex-row items-center">
        <span class="text-base font-semibold">{{ transactionTypeTitle }}</span>
        <div
          class="bg-yellow-400 px-2 rounded py-[5px] flex justify-center items-center ml-1"
          v-if="status === 2"
        >
          <span class="text-white text-sm leading-none">pending</span>
        </div>
      </div>
      <span class="text-md mt-1">{{ $helpers.fullDate(date) }}</span>
    </div>
    <div class="flex col-span-3 items-end flex-col">
      <span :class="['text-base font-semibold', typeColor]"
        >{{ typeSymbol }}{{ amount }} Koin</span
      >
    </div>
    <a-modal maskClosable v-model="showModalDetail" title="Detail Transaksi">
      <div class="flex w-full flex-col">
        <div class="flex w-full justify-center items-start flex-col">
          <span :class="['text-xl font-semibold', typeColor]"
            >{{ typeSymbol }}{{ amount }} Koin</span
          >
          <span class="text-base font-medium text-black mt-1">{{
            transactionTypeTitle
          }}</span>
          <span class="mt-2">{{ $helpers.fullDate(date) }}</span>
        </div>
        <hr class="mt-4" />
        <span class="mt-2 text-base text-black font-semibold"
          >Rincian Transaksi</span
        >
        <div class="flex flex-col w-full" v-if="transactionType === 1">
          <div class="flex justify-between items-center mt-2 text-base">
            <span>ID Transaksi</span>
            <span class="text-black">{{ transactionId }}</span>
          </div>
          <div class="flex justify-between items-center mt-2 text-base">
            <span>Jumlah Top-up</span>
            <span class="text-black">{{ amount }} Koin</span>
          </div>
          <div class="flex justify-between items-center mt-2 text-base">
            <span>Total Pembayaran</span>
            <span class="text-black"
              >Rp.{{ $helpers.currencyFormat(totalPayment) }}</span
            >
          </div>
          <div class="flex justify-between items-center mt-2 text-base">
            <span>Status</span>
            <div
              :class="[
                'flex px-2 rounded-full justify-center items-center',
                chipStatus.get(status)?.bg,
              ]"
            >
              <span :class="['font-semibold', chipStatus.get(status)?.color]">{{
                chipStatus.get(status)?.title
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <a-button
          v-if="status === 2 && transactionType === 1"
          block
          @click="onClickPay"
          type="primary"
          >Bayar</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class CommonCardWalletHistory extends Vue {
  @Prop()
  transactionType!: number;

  @Prop()
  transactionId!: string;

  @Prop()
  transactionTypeTitle!: string;

  @Prop()
  date!: string;

  @Prop()
  type!: string;

  @Prop()
  amount!: string | number;

  @Prop()
  status!: number;

  @Prop()
  fee!: any;

  @Prop()
  totalPayment!: any;

  @Prop()
  invoiceUrl!: any;

  showModalDetail = false;

  $helpers: any;

  get typeColor() {
    if (this.status === 2) return "text-grey-300";
    if (this.type === "d") return "text-[red]";
    return "text-[green]";
  }

  chipStatus = new Map([
    [
      1,
      {
        color: "text-green-600",
        bg: "bg-green-200",
        title: "Berhasil",
      },
    ],
    [
      2,
      {
        color: "text-yellow-600",
        bg: "bg-yellow-200",
        title: "Pending",
      },
    ],
    [
      3,
      {
        color: "text-red-600",
        bg: "bg-red-200",
        title: "Batal",
      },
    ],
  ]);

  get typeSymbol() {
    if (this.status === 2) return "";
    if (this.type === "d") return "-";
    return "+";
  }

  onClickPay() {
    window.open(this.invoiceUrl, "_blank");
  }
}
</script>
