// 专门管理用户相关的所有请求
import { request } from '@/utils';
export function loginAPI(formData) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData,
  });
}

export function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET',
  });
}
