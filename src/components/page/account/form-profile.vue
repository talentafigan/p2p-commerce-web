<template>
  <a-form-model :model="form" :rules="fomrProfileRules" ref="formProfile">
    <div class="flex px-5 w-full items-start flex-col">
      <span class="font-semibold text-base">Bio data</span>
      <div class="grid grid-cols-3 w-full items-center mt-5">
        <span class="col-span-1 text-base">Nama Lengkap</span>
        <a-form-model-item class="col-span-2" prop="fullname">
          <a-input class="w-full" v-model="form.fullname" size="large">
          </a-input>
        </a-form-model-item>
      </div>
      <div class="grid grid-cols-3 w-full items-center mt-3">
        <span class="col-span-1 text-base">Username</span>
        <a-form-model-item class="col-span-2" prop="username">
          <a-input class="w-full" v-model="form.username" size="large">
          </a-input>
        </a-form-model-item>
      </div>
      <div class="grid grid-cols-3 w-full items-center mt-3">
        <span class="col-span-1 text-base">Email</span>
        <a-form-model-item class="col-span-2" prop="email">
          <a-input class="w-full" v-model="form.email" size="large"> </a-input>
        </a-form-model-item>
      </div>
      <div class="grid grid-cols-3 w-full items-center mt-3">
        <span class="col-span-1 text-base">Nomor Telepon</span>
        <a-form-model-item class="col-span-2" prop="phone">
          <a-input class="w-full" v-model="form.phone" size="large">
            <template #addonBefore>
              <span>+62</span>
            </template>
          </a-input>
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
import { ProfileApi } from "@/api/profile.api";

@Component
export default class PageAccountFormProfile extends Vue {
  profileApi = new ProfileApi();

  $refs: any;

  isLoading = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    fullname: "",
    username: "",
    email: "",
    phone: "",
  };

  fomrProfileRules = {
    fullname: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
    ],
    username: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (
            /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value) === false
          ) {
            callback();
          }
          callback("Username hanya boleh berupa huruf dan nomor.");
        },
        trigger: "change",
      },
    ],
    email: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value
            )
          ) {
            callback();
          }
          callback("Format email salah.");
        },
        trigger: "change",
      },
    ],
    phone: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value && /\d+/.test(value)) {
            callback();
          }
          callback("Nomor telepon harus berupa angka.");
        },
        trigger: "change",
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value && value.length <= 13) {
            callback();
          }
          callback("No. Telepon Maximal 15 digit.");
        },
        trigger: "change",
      },
    ],
  };

  async onSave() {
    const formRef: any = this.$refs.formProfile;
    let isValid = false;
    formRef.validate((valid: boolean) => {
      isValid = valid;
    });
    if (!isValid) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.profileApi.update({
        ...this.form,
        phone: "62" + this.form.phone,
      });
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$message.success("Berhasil Update Profile!");
    } catch (error: any) {
      this.showErrorMessage = true;
      this.errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
    } finally {
      this.isLoading = false;
    }
  }

  mounted() {
    this.fetchProfile();
  }

  async fetchProfile() {
    try {
      const resp = await this.profileApi.me();
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.form = resp.data.data.user;
      this.form.phone = this.form.phone
        ? this.form.phone.slice(2, this.form.phone.length - 2)
        : "";
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    }
  }
}
</script>
