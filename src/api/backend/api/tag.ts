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

export async function createTopicService(body: { content: string;  }, options?: RequestOptions) {
  return request<API.LoginToken>('/api/mill/addTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建标签 POST /api/MelonPostTag/createTag*/
export async function getTagsService(body: { name?: string; status?: number; page?: number; pageSize?: number }, options?: RequestOptions) {
  return request<API.LoginToken>('/api/melonTag/getTagList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getTopicsService(body: { page?: number; pageSize?: number }, options?: RequestOptions) {
  return request<API.LoginToken>('/api/mill/getTopics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
// /api/mill/getTopics
