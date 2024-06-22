// /api/melonStake/getStakeList
// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';
/** 创建标签 POST /api/MelonPostTag/createTag*/
export async function getNftActivityListService(
  body: { page?: number; pageSize?: number },
  options?: RequestOptions,
) {
  return request<API.LoginToken>('/api/nft/getNftActivityList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function getNftActivityUsersService(body: { id?: number }, options?: RequestOptions) {
  return request<API.LoginToken>('/api/nft/getActivityUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
