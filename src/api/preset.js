import axios from 'axios';

//导入request.js请求工具
import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/colortrans/'; // 后端API的基础URL

class PresetService {
  //方法：调用后端生成预设接口
  genPreset(timeStamp) {
    const formData = new FormData();
    formData.append('timeStamp', timeStamp); 
    return request.post(`${API_URL}genPresetFile/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
   
}
}
export default new PresetService();


// export const getUserNameByIdService = ()=>{
//     // return request.get(`${API_URL}getUserNameById/${userId}`)
//     return axios.get(`${API_URL}getUserNameById/${userId}`)
// }


