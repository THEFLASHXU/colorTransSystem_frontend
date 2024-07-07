// import axios from 'axios';
import axios from "../config/axios-config";
//导入request.js请求工具
import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/user/'; // 后端API的基础URL

class UserService {
    //功能：
    getKaptcha(){
        return request.get(`${API_URL}kaptcha/`, { responseType: 'blob' });   
    }
    getUserNameById(userId) {

        return request.get(`/user/getUserNameById/${userId}`);
        // return axios.get(`${API_URL}getUserNameById/${userId}`);
    }
    //方法：调用后端用户登录接口
    userLogin(userName, passWord, code, rememberMe) {
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('password', passWord);
        formData.append('code', code);
        formData.append('rememberme', rememberMe);
        return request.post(`${API_URL}login/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    }
    //功能：调用后端接口完成注册
    userRegist(userName, passWord,code){
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('password', passWord);
        formData.append('code', code);
        // formData.append('rememberme', rememberMe);
        return request.post(`${API_URL}register/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
export default new UserService();

//提供调用登录接口的函数
// export const userLoginService = (loginData) => {
//     const params = new URLSearchParams();
//     for (let key in loginData) {
//         params.append(key, loginData[key])
//     }
//     return request.post('/user/login', params)
// }



// export const getUserNameByIdService = ()=>{
//     // return request.get(`${API_URL}getUserNameById/${userId}`)
//     return axios.get(`${API_URL}getUserNameById/${userId}`)
// }


