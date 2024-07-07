import axios from 'axios';

//导入request.js请求工具
import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/test/'; // 后端API的基础URL

class TestService {
  //方法：调用后端接口,发送时间戳
  sendTimeStamp(timestamp) {
    const formData = new FormData();
    formData.append('timestamp', timestamp); // 添加用户ID到表单数据
    return request.post(`${API_URL}timestamp/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

}
export default new TestService();


// export const getUserNameByIdService = ()=>{
//     // return request.get(`${API_URL}getUserNameById/${userId}`)
//     return axios.get(`${API_URL}getUserNameById/${userId}`)
// }


