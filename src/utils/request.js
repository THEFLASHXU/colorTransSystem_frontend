//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
// 导入 Element Plus 的消息组件，用于显示提示消息
import { ElMessage, ElMessageBox } from 'element-plus'
//定义一个变量,记录公共的前缀  ,  baseURL
//const baseURL = 'http://localhost:8080';
// const baseURL = '/api';
const instance = axios.create({
    baseURL: '/api',
    withCredentials: true
});
// 导入定义的 token 存储
import { useTokenStore } from '../stores/token.js'
//添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 请求发送前的操作       
        // 使用 Pinia 的 token 存储
        const tokenStore = useTokenStore();
        console.log(tokenStore.token);
        // 如果存在 token，则添加到请求头中
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config;
    },
    (err) => {
        //请求错误的回调
        Promise.reject(err)
    }
)

/* import {useRouter} from 'vue-router'
const router = useRouter(); */

import router from '../router'
//添加响应拦截器
instance.interceptors.response.use(
    result => {
        console.log(result.data);
        //判断业务状态码
        // if (result.data.code === 0) {
        return result.data;
        // }

        //操作失败
        //alert(result.data.msg?result.data.msg:'服务异常')
        ElMessage.error(result.data.msg ? result.data.msg : '服务异常')
        //异步操作的状态转换为失败
        // return Promise.reject(result.data)

    },
    err => {
        //判断响应状态码,如果为401,则证明未登录,提示请登录,并跳转到登录页面
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            // ElMessage.error('请先登录')
            ElMessageBox.alert('请先登录', '提示', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: '确认',
                callback: (action) => {

                    router.push('/login')
                },
            })
            // router.push('/login')
        } else {
            ElMessage.error('服务异常')
        }

        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;