<template>
  <div @click="$emit('click')" class="flex cursor-pointer flex-col rounded bg-white border">
    <div class="flex flex-col w-full p-2">
      <img
        v-if="image !== null"
        style="width: 100%; height: 120px; object-fit: cover"
        :src="image"
        alt=""
      />
      <div v-if="image === null" class="w-full flex justify-center items-center">
        <i class="ri-image-fill text-[80px] text-gray-300"></i>
      </div>
      <span class="text-sm mt-4 text-black font-semibold">{{
        productName
      }}</span>
      <span class="text-sm mt-1"
        >Rp.{{ $helpers.currencyFormat(productPrice) }}</span
      >
      <a-rate class="text-sm mt-1" disabled :value="rating" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class CommonCardProduct extends Vue {
  @Prop()
  productName!: string;

  @Prop()
  productPrice!: number;

  @Prop()
  image!: string;

  @Prop()
  rating!: any;

  $helpers: any;
}
</script>
