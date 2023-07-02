<template>
  <vueper-slides
    class="no-shadow z-[0]"
    :visible-slides="1"
    :bullets="false"
    :gap="1"
    fixed-height="35vh"
    :touchable="false"
    :arrows-outside="false"
  >
    <vueper-slide v-for="(item, index) in banners" :key="index">
      <template #content>
        <img class="rounded-lg" :src="item.image" style="width: 100%; height: 35vh; object-fit: cover" alt="" />
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
export default class PageHomeBanner extends Vue {
  banners = [
    {
      image:
        "https://digitumo.com/wp-content/uploads/2022/08/Konsep-Digital-Marketing.jpg",
    },
    {
      image:
        "https://digitumo.com/wp-content/uploads/2022/08/Apa-Itu-Content-Marketing.jpg",
    },
  ];
}
</script>
