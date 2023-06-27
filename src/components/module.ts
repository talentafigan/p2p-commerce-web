import vue from "vue";

export default function setup() {
  vue.component("layout-main", require("@/components/layout/main/index.vue").default);
  vue.component("layout-main-appbar", require("@/components/layout/main/appbar.vue").default);
  vue.component("common-basic-loader", require("@/components/common/BasicLoader.vue").default);
  vue.component("page-home-banner", require("@/components/page/home/Banner.vue").default);
}