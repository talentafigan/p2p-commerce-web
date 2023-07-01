<template>
  <layout-main>
    <div class="w-full grid grid-cols-11 items-center">
      <div class="col-start-4 col-span-5">
        <a-tabs class="w-full" default-active-key="1">
          <a-tab-pane key="1" class="px-2" tab="Data Diri">
            <page-account-form-profile />
          </a-tab-pane>
          <a-tab-pane key="2" class="px-2" tab="Kata Sandi">
            <page-account-form-password />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class AccountProfile extends Vue {}
</script>
