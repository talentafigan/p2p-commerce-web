import Vue from "vue";
import { Input, Button, Dropdown, Menu } from "ant-design-vue";

export default function setup() {
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Dropdown);
  Vue.use(Menu);
}
