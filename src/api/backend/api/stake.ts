// /api/melonStake/getStakeList
// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 创建标签 POST /api/MelonPostTag/createTag*/
export async function createTagService(body: { name: string; status: number }, options?: RequestOptions) {
    return request<API.LoginToken>('/api/melonTag/createTag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 创建标签 POST /api/MelonPostTag/createTag*/
export async function getStakeService(body: { postName?: string; postId?: string; page?: number; pageSize?: number }, options?: RequestOptions) {
    return request<API.LoginToken>('/api/melonStake/getStakeList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

export async function changeStakeService(body: { stakeId: number; status: number }, options?: RequestOptions) {
    return request<API.Response>('/api/melonStake/changeStake', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}
// /api/melonStake/changeStake
