import axios from 'axios';

//导入request.js请求工具
import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/colortrans/'; // 后端API的基础URL

class SrcImgService {
  //方法：调用后端接口上传图片，将图片保存到本地
  uploadImage(photo) {
    const formData = new FormData();
    formData.append('photo', photo); // 添加用户ID到表单数据
    return request.post(`${API_URL}uploadimg/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  //方法：调用后端接口，同时上传源图片和参考图片。
  uploadSrcAndRefImage(srcImg, refImg,timeStamp) {
    const formData = new FormData();
    formData.append('srcImg', srcImg);
    formData.append('refImg', refImg);
    formData.append('timeStamp', timeStamp); 
    return request.post(`${API_URL}uploadSrcandRefImg/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}
export default new SrcImgService();


// export const getUserNameByIdService = ()=>{
//     // return request.get(`${API_URL}getUserNameById/${userId}`)
//     return axios.get(`${API_URL}getUserNameById/${userId}`)
// }


