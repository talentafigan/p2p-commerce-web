import Vue from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default function setup() {
  Vue.component("vueper-slides", VueperSlides);
  Vue.component("vueper-slide", VueperSlide);
}
