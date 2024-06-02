// /api/melonStake/getStakeList
// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 创建标签 POST /api/MelonPostTag/createTag*/
export async function getPointsListService(body: { userName: string; pageSize: number;page: number }, options?: RequestOptions) {
    return request<any>('/api/MelonUser/getPointsList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

