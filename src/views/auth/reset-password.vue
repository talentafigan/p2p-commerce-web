<template>
  <a-form-model
    :model="form"
    :rules="formResetPasswordRules"
    ref="formResetPassword"
  >
    <a-row class="w-full">
      <a-col :span="8" :offset="8">
        <div class="h-screen flex justify-center flex-col">
          <span class="text-2xl font-semibold">Buat Password Baru</span>
          <span class="text-sm mt-2"
            >Password baru anda harus berbeda dengan password sebelumnya yang
            anda gunakan
          </span>
          <a-row class="mt-[3vh]">
            <a-col class="mt-3" :span="24">
              <a-form-model-item prop="password">
                <a-input-password
                  class="w-full"
                  type="password"
                  placeholder="Masukan Password Baru"
                  v-model="form.password"
                  size="large"
                >
                </a-input-password>
              </a-form-model-item>
            </a-col>
            <a-col class="mt-3" :span="24">
              <a-form-model-item prop="confirmPassword">
                <a-input-password
                  class="w-full"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  v-model="form.confirmPassword"
                  size="large"
                >
                </a-input-password>
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
            class="mt-[5vh]"
            size="large"
            type="primary"
            :loading="isLoading"
            block
            @click="onSubmit"
          >
            Konfirmasi
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
    password: "",
    confirmPassword: "",
  };
  token = this.$route.query.token as string;
  authApi = new AuthApi();
  profileApi = new ProfileApi();

  formResetPasswordRules = {
    password: [
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
          if (value === this.form.password) {
            callback();
          }
          callback("Password Tidak Sama");
        },
        trigger: "change",
      },
    ],
  };

  async onSubmit() {
    const formRef: any = this.$refs.formResetPassword;
    const isValid = await formRef.validate((valid: boolean) => {
      return valid;
    });
    if (!isValid) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.resetPasswordNewPassword({
        code: this.token,
        newPassword: this.form.password,
      });
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$message.success(
        "Password berhasil diubah, silahkan login kembali!"
      );
      await this.$helpers.shortSetTimeOut(1000);
      this.$nextTick(() => {
        this.$router.push("/auth/login");
      });
    } catch (error: any) {
      this.showErrorMessage = true;
      this.errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
    } finally {
      this.isLoading = false;
    }
  }

  showInvalidURLDialog() {
    this.$error({
      title: "URL tidak valid",
      content: "Silahkan lakukan permintaan perubahan password lagi.",
      onOk: () => {
        this.$router.push("/auth/forgot-password");
      },
    });
    return;
  }

  async validateToken() {
    if (!this.token) {
      this.showInvalidURLDialog();
      return;
    }
    try {
      const response = await this.authApi.resetPasswordCheckCode(this.token);
      if (response.data.code !== "SUCCESS") {
        this.showInvalidURLDialog();
      }
    } catch (error) {
      this.showInvalidURLDialog();
    }
  }

  mounted() {
    this.validateToken();
  }
}
</script>
