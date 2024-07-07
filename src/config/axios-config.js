// src/axios-config.js
import axios from 'axios';
import router from '../router'; // 确保这里正确地导入了你的路由实例

// 设置 Axios 的基本配置
// axios.defaults.baseURL = 'http://localhost:8080/colorTrans/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // 如果后端返回未授权访问，则重定向到登录页面
      alert("请您先登录~");
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axios;
