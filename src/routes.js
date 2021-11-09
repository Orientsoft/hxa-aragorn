import BasicLayout from '@/layouts/BasicLayout';
import Count from '@/pages/Count';
import Analysis from '@/pages/Analysis';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import Total from '@/pages/Total';
import Group from '@/pages/Group';

const routerConfig = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/count',
        component: Count,
      },
      {
        path: '/analysis',
        component: Analysis,
      },
      {
        path: '/total',
        component: Total,
      },
      {
        path: '/admin',
        component: Admin,
      },
      {
        path: '/group',
        component: Group,
      },
    ],
  },
];
export default routerConfig;
