// axios封装处理
import axios from 'axios';
import { getToken, removeToken } from './token';
import router from '@/router';
// 根域名配置
// 超时时间
// 请求/响应拦截器

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 10000,
});

// 请求拦截器，在请求发送前插入一些自定义配置
request.interceptors.request.use(
  // 处理请求头,注入token，发送给后端校验是否具有相关权限
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2开头的响应会触发该函数
    return response.data;
  },
  (error) => {
    // 非2开头的会触发这个函数
    // 401 说明token失效，前端需要清除用户信息并跳转到登录页
    if (error.response.status === 401) {
      removeToken();
      router.navigate('/login');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };
