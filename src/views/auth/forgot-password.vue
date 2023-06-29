<template>
  <a-form-model
    :model="form"
    :rules="formForgotPasswordRules"
    ref="formForgotPassword"
  >
    <a-row class="w-full">
      <a-col :span="8" :offset="8">
        <div class="h-screen flex justify-center flex-col">
          <span class="text-2xl font-semibold">Lupa Password</span>
          <span class="text-sm mt-2"
            >Jangan Khawatir. Mohon masukan email yang terhubung dengan akun
            anda.
          </span>
          <a-row class="mt-[3vh]">
            <a-col :span="24">
              <a-form-model-item prop="email">
                <a-input
                  placeholder="Masukan Email Terdaftar"
                  class="w-full"
                  v-model="form.email"
                  size="large"
                >
                </a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
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
            class="mt-[3vh]"
            size="large"
            type="primary"
            :loading="isLoading"
            block
            @click="onSubmit"
          >
            Submit
          </a-button>
          <a-button
            class="mt-4"
            type="link"
            block
            @click="$router.push('/auth/login')"
          >
            <i class="ri-arrow-left-line mr-2"></i>
            Kembali ke login
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AuthApi } from "@/api/auth.api";
import { ProfileApi } from "@/api/profile.api";

@Component
export default class AuthLogin extends Vue {
  $helpers: any;
  isLoading = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    email: "",
  };

  formForgotPasswordRules = {
    email: [
      {
        required: true,
        message: "Wajib di isi.",
        trigger: "change",
      },
    ],
  };

  authApi = new AuthApi();
  profileApi = new ProfileApi();
  async onSubmit() {
    const formRef: any = this.$refs.formForgotPassword;
    let isValid = false;
    formRef.validate((valid: boolean) => {
      isValid = valid;
    });
    if (!isValid) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.resetPasswordRequest(this.form.email);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$message.success(
        "Kami Telah Mengirim Tautan Untuk Mereset Password, Silahkan Cek Email Kamu!"
      );
      await this.$helpers.shortSetTimeOut(1000);
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
