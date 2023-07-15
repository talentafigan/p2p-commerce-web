<template>
  <div>
    <span>detail</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ProductTransactionApi } from "@/api/product-transaction";

@Component
export default class ProductTransactionDetail extends Vue {}
</script>
