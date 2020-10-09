import Barchart from '../pages/chart/barchart'
import Linechart from '../pages/chart/linechart'
import Tableview from '../pages/chart/tableview';
import TableView from '../pages/chart/tableview'

interface MenuComponent {
  [index: string]: any
}

export const siderMenu = [
  {
    text: '表格',
    icon: 'table',
    key: 'tableview',
    path: 'tableview',
    component: Tableview,
    },{
    text: '柱状图',
    icon: 'bar-chart',
    key: 'barchart',
    path: 'barchart',
    component: Barchart,
  }, {
    text: '折线图',
    icon: 'line-chart',
    key: 'linechart',
    path: 'linechart',
    component: Linechart,
  },
];

export const menuComponent:MenuComponent = {};

// 以menu的key作为对象的key，对应的组件作为值生成一个对象，用于匹配不同menu下的页面
(function createMenuComponent(menuList: Array<any>) {
  for(const item of menuList) {
    if (Array.isArray(item.children)) {
      createMenuComponent(item.children);
    } else {
      menuComponent[item.key] = item.component;
    }
  }
})(siderMenu);
