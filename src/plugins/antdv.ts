import Vue from "vue";
import {
  Input,
  Button,
  Dropdown,
  Menu,
  Alert,
  Col,
  Row,
  Form,
  FormModel,
} from "ant-design-vue";

export default function setup() {
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Dropdown);
  Vue.use(Menu);
  Vue.use(Alert);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Form);
  Vue.use(FormModel);
}
