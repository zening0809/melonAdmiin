import type {RouteRecordRaw} from 'vue-router';
import {t} from '@/hooks/useI18n';

const moduleName = 'topic';
const routes: Array<RouteRecordRaw> = [


    {
        path: '/topic',
        redirect: '/topic/list',
        meta: {
            title: 'topic',
            // hideInMenu: true,
        },
        children: [
            {
                path: 'list',
                name: `${moduleName}-list`,
                component: () => import('@/views/topic/list.vue'),
                meta: {title: t('routes.topic.list')},
            },
        ],
    },
]

export default routes;
