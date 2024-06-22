import type { RouteRecordRaw } from 'vue-router';
import { t } from '@/hooks/useI18n';

const moduleName = 'nft';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/nft',
    redirect: '/nft/list',
    meta: {
      title: 'NFT',
      // hideInMenu: true,
    },
    children: [
      {
        path: 'list',
        name: `${moduleName}-list`,
        component: () => import('@/views/nft/list.vue'),
        meta: { title: t('routes.nft.list') },
      },
      {
        path: 'detail/:id',
        name: `${moduleName}-detail`,
        component: () => import('@/views/nft/detail.vue'),
        meta: { title: t('routes.nft.detail'), hideInMenu: true },
      },
    ],
  },
];

export default routes;
