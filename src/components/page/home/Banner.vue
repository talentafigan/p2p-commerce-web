<template>
  <vueper-slides
    class="no-shadow z-[0]"
    :visible-slides="1"
    :bullets="false"
    :gap="1"
    :arrows-outside="false"
    :slide-ratio="1 / 4"
  >
    <vueper-slide v-for="i in 9" :key="i">
      <template #content>
        <div class="rounded-lg bg-primary h-full"></div>
      </template>
    </vueper-slide>
    <template #arrow-left>
      <a-button size="large" shape="circle">
        <i class="ri-arrow-left-s-line"></i>
      </a-button>
    </template>
    <template #arrow-right>
      <a-button size="large" shape="circle">
        <i class="ri-arrow-right-s-line"></i>
      </a-button>
    </template>
  </vueper-slides>
</template>

<script lang="ts">
import { Button } from "ant-design-vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class PageHomeBanner extends Vue {}
</script>
