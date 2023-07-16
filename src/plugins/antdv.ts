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
  Tabs,
  DatePicker,
  Rate,
  Upload
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
  Vue.use(Tabs);
  Vue.use(DatePicker);
  Vue.use(Rate)
  Vue.use(Upload)
}
