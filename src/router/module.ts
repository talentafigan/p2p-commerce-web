export default {
  index: require("@/views/index.vue").default,
  authLogin: require("@/views/auth/login.vue").default,
  authRegister: require("@/views/auth/register.vue").default,
  authForgotPassword: require("@/views/auth/forgot-password.vue").default,
  authResetPassword: require("@/views/auth/reset-password.vue").default,
  accountProfile: require("@/views/account/profile.vue").default,
  accountWallet: require("@/views/account/wallet/index.vue").default,
  consultation: require("@/views/consultation/index.vue").default,
};
