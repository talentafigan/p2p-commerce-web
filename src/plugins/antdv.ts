import Vue from "vue";
import { Input, Button, Dropdown, Menu, Alert } from "ant-design-vue";

export default function setup() {
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Dropdown);
  Vue.use(Menu);
  Vue.use(Alert);

}
