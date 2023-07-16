export default {
  index: require("@/views/index.vue").default,
  authLogin: require("@/views/auth/login.vue").default,
  authRegister: require("@/views/auth/register.vue").default,
  authForgotPassword: require("@/views/auth/forgot-password.vue").default,
  authResetPassword: require("@/views/auth/reset-password.vue").default,
  accountProfile: require("@/views/account/profile.vue").default,
  accountWallet: require("@/views/account/wallet/index.vue").default,
  consultation: require("@/views/consultation/index.vue").default,
  productSearch: require("@/views/product/search.vue").default,
  productDetail: require("@/views/product/_id.vue").default,
  transaction: require("@/views/transaction/index.vue").default,
  transactionDetail: require("@/views/transaction/_id.vue").default,
};
