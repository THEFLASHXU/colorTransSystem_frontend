import axios from 'axios';
//导入request.js请求工具
// import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/images/'; // 后端API的基础URL
import request from '../utils/request.js'
class RefImgService {
    getRandomImages() {
        
        return request.get(`${API_URL}showRefImgByRandom`);
    }
}
export default new RefImgService();


// export const getUserNameByIdService = ()=>{
//     // return request.get(`${API_URL}getUserNameById/${userId}`)
//     return axios.get(`${API_URL}getUserNameById/${userId}`)
// }


