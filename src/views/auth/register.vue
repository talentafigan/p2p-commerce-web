<template>
  <a-form-model :model="form" :rules="fomrRegisterRules" ref="formRegister">
    <a-row class="w-full">
      <a-col :span="8" :offset="8">
        <div class="h-screen flex justify-center flex-col">
          <span class="text-2xl font-semibold">Daftar</span>
          <span class="text-sm mt-2"
            >Sudah ada akun?
            <span
              class="cursor-pointer text-primary"
              @click="$router.push('/auth/login')"
              >Masuk</span
            ></span
          >
          <a-row class="mt-[4vh]">
            <a-col :span="24">
              <a-form-model-item prop="fullname">
                <a-input
                  placeholder="Nama lengkap"
                  class="w-full"
                  v-model="form.fullname"
                  size="large"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col class="mt-3" :span="24">
              <a-form-model-item prop="username">
                <a-input
                  placeholder="Username"
                  class="w-full"
                  v-model="form.username"
                  size="large"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col class="mt-3" :span="24">
              <a-form-model-item prop="email">
                <a-input
                  placeholder="Email"
                  class="w-full"
                  v-model="form.email"
                  size="large"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col class="mt-3" :span="24">
              <a-form-model-item prop="phone">
                <a-input
                  placeholder="Nomor telepon"
                  class="w-full"
                  v-model="form.phone"
                  size="large"
                >
                  <template #addonBefore>
                    <span>+62</span>
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col class="mt-3" :span="24">
              <a-form-model-item prop="password">
                <a-input-password
                  class="w-full"
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                  size="large"
                >
                </a-input-password>
              </a-form-model-item>
            </a-col>
          </a-row>
          <span class="mt-[4vh]"
            >Dengan mendaftar anda menyetujui
            <span class="text-primary">Syarat & Ketentuan</span></span
          >
          <a-alert
            class="mt-4"
            message="Error"
            v-if="showErrorMessage"
            :description="errorMessage"
            type="error"
            show-icon
          />
          <a-button
            :disabled="isLoading"
            class="mt-4"
            size="large"
            type="primary"
            :loading="isLoading"
            block
            @click="onClickRegister"
          >
            Daftar
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { AuthApi } from "@/api/auth.api";

@Component
export default class authRegister extends Vue {
  $helpers: any;
  isLoading = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    email: "",
    fullname: "",
    password: "",
    phone: "",
    username: "",
  };

  authApi = new AuthApi();
  routeToPageLogin() {
    this.$router.push("/auth/login");
  }

  fomrRegisterRules = {
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
    password: [
      {
        required: true,
        message: "Wajib di isi",
        trigger: "blur",
      },
    ],
  };

  async onClickRegister() {
    const formRef: any = this.$refs.formRegister;
    const isValid = await formRef.validate((valid: boolean) => {
      return valid;
    });
    if (!isValid) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.register({
        ...this.form,
        phone: "62" + this.form.phone,
      });
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$message.success("Berhasil Daftar !");
      await this.$helpers.shortSetTimeOut(1000);
      this.$store.commit("auth/setAuth", {
        token: response.data.data.accessToken,
        user: response.data.data.user,
      });
      this.$router.push("/auth/login");
    } catch (error: any) {
      this.showErrorMessage = true;
      this.errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
