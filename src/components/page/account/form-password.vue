<template>
  <a-form-model :model="form" :rules="formPasswordRules" ref="formProfile">
    <div class="flex px-5 w-full items-start flex-col">
      <span class="font-semibold text-base">Ubah Password</span>
      <div class="grid grid-cols-3 w-full items-center mt-3">
        <span class="col-span-1 text-base">Password Lama</span>
        <a-form-model-item class="col-span-2" prop="oldPassword">
          <a-input-password
            type="password"
            class="w-full"
            v-model="form.oldPassword"
            size="large"
          >
          </a-input-password>
        </a-form-model-item>
      </div>
      <div class="grid grid-cols-3 w-full items-center mt-3">
        <span class="col-span-1 text-base">Password Baru</span>
        <a-form-model-item class="col-span-2" prop="newPassword">
          <a-input-password
            type="password"
            class="w-full"
            v-model="form.newPassword"
            size="large"
          >
          </a-input-password>
        </a-form-model-item>
      </div>
      <div class="grid grid-cols-3 w-full items-center mt-3">
        <span class="col-span-1 text-base">Konfirmasi Password</span>
        <a-form-model-item class="col-span-2" prop="confirmPassword">
          <a-input-password
            type="password"
            class="w-full"
            v-model="form.confirmPassword"
            size="large"
          >
          </a-input-password>
        </a-form-model-item>
      </div>
      <a-alert
        class="mt-4"
        message="Error"
        v-if="showErrorMessage"
        :description="errorMessage"
        type="error"
        show-icon
      />
      <a-button
        :loading="isLoading"
        :disabled="isLoading"
        @click="onSave"
        block
        size="large"
        class="mt-5"
        type="primary"
      >
        Simpan
      </a-button>
    </div>
  </a-form-model>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class PageAccountFormPassword extends Vue {
  isLoading = false;

  form = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  showErrorMessage = false;
  errorMessage = "";

  formPasswordRules = {
    oldPassword: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
    ],
    newPassword: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value === this.form.newPassword) {
            callback();
          }
          callback("Password Tidak Sama.");
        },
        trigger: "change",
      },
    ],
  };

  async onSave() {
    try {
    } catch (error) {}
  }
}
</script>
