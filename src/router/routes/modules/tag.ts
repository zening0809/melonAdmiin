import type { RouteRecordRaw } from 'vue-router';
import { t } from '@/hooks/useI18n';

const moduleName = 'tag';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/tag',
    redirect: '/tag/list',
    meta: {
      title: '标签管理',
      // hideInMenu: true,
    },
    children: [
      {
        path: 'list',
        name: `${moduleName}-list`,
        component: () => import('@/views/tag/list.vue'),
        meta: { title: t('routes.tag.list') },
      },
    ],
  },
];

export default routes;
