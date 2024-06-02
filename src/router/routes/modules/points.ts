import type {RouteRecordRaw} from 'vue-router';
import {t} from '@/hooks/useI18n';

const moduleName = 'points';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/points',
        redirect: '/points/list',
        meta: {
            title: '积分明细',
            // hideInMenu: true,
        },
        children: [
            {
                path: 'list',
                name: `${moduleName}-list`,
                component: () => import('@/views/points/list.vue'),
                meta: {title: t('routes.points.list')},
            },
        ],
    },
]

export default routes;
