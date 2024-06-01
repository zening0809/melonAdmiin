import type {RouteRecordRaw} from 'vue-router';
import {t} from '@/hooks/useI18n';

const moduleName = 'stake';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/stake',
        redirect: '/stake/list',
        meta: {
            title: '投票对赌',
            // hideInMenu: true,
        },
        children: [
            {
                path: 'list',
                name: `${moduleName}-list`,
                component: () => import('@/views/stake/list.vue'),
                meta: {title: t('routes.stake.list')},
            },
        ],
    },
]

export default routes;
