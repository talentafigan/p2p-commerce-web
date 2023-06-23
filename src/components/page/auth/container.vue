<template>
    <div
      class="flex py-5 min-h-screen justify-start md:justify-center items-center flex-col w-full"
      id="container"
    >
      <div
        class="g-recaptcha"
        data-sitekey="6LdKhT0iAAAAAMB-Fs8DWFXG4uWUKayP1hrsyRtl"
        data-callback="onSubmit"
        data-size="invisible"
      ></div>
      <div class="w-full grid-cols-1 grid sm:grid-cols-12">
        <div
          class="bg-red flex justify-center items-center flex-col xl:col-start-5 xl:col-span-4 lg:col-start-5 lg:col-span-4 md:col-start-4 md:col-span-6 sm:col-start-3 sm:col-span-8"
        >
          <div class="w-full flex md:border rounded-lg md:py-8 py-0 flex-col">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  import Vue from "vue";
  export default class PageAuthContainer extends Vue {}
  </script>
  