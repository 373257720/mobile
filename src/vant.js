import Vue from 'vue'
// 在这里引入你所需的组件
import {
  Button,
  Skeleton,
  Search,
  Icon,
  DropdownMenu, DropdownItem,
  PullRefresh,
  List,
  // Dialog,
  Tabbar,
  // Toast,
  TreeSelect,
  Field,
  // Locale,
  Cell, CellGroup,
 TabbarItem,
  Form,
  RadioGroup, Radio,
   Collapse, CollapseItem,
   Checkbox, CheckboxGroup,
 Divider
} from 'vant'
// 按需引入UI组件
Vue.use(Cell);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Button)
Vue.use(TreeSelect);
Vue.use(Skeleton)
Vue.use(Search)
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(Divider);
Vue.use(DropdownMenu);
Vue.use(PullRefresh);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(List);
Vue.use(DropdownItem);
