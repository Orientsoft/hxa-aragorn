const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: '计数',
    path: '/count',
    show: true,
    icon: 'chart-bar',

  },
  {
    name: '分析',
    path: '/analysis',
    show: true,
    icon: 'form',
  },
  {
    name: '汇总统计',
    path: '/total',
    show: true,
    icon: 'detail',
  },
  {
    name: '用户',
    path: '/admin',
    show: false,
    icon: 'account',
  },
  {
    name: '分组',
    path: '/group',
    show: false,
    icon: 'list',
  },
];
export { headerMenuConfig, asideMenuConfig };
