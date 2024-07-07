// 引入 Pinia 的 defineStore 方法，用于定义一个存储
import { defineStore } from 'pinia'
import { ref } from 'vue'
/* 
    第一个参数:名字,唯一性
    第二个参数:函数,函数的内部可以定义状态的所有内容

    返回值: 函数
*/

// 定义一个 Pinia 存储，用于管理 token
export const useTokenStore = defineStore('ticket', () => {
    // 存储的名称为 'ticket'，具有唯一性
    //定义状态的内容

    //1.响应式变量
    const token = ref('')

    //2.定义一个函数,修改token的值
    const setToken = (newToken) => {
        token.value = newToken
    }

    //3.函数,移除token的值
    const removeToken = () => {
        token.value = ''
    }
    // 返回存储中的状态和方法
    return {
        token, setToken, removeToken
    }
}, {
    persist: true// 启用持久化存储，Pinia 插件会将这个存储的状态持久化到本地存储
});