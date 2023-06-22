<template>
  <div class="w-full flex flex-col">
    <layout-main-appbar />
    <div class="w-full mt-[110px]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class LayoutMain extends Vue {}
</script>
