// import axios from 'axios';
import axios from "../config/axios-config";
//导入request.js请求工具
import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/recommend/'; // 后端API的基础URL

class RecommendService {
    
    //方法：调用后端构图匹配接口
    findSimilarImgByScene(photo) {
        const formData = new FormData();
        formData.append('photo', photo);
        return request.post(`${API_URL}getSimilarScene/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    //方法：调用后端颜色匹配接口
    findSimilarImgByColor(photo) {
        const formData = new FormData();
        formData.append('photo', photo);
        return request.post(`${API_URL}getSimilarColor/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    //方法：调用后端颜色匹配接口
    loadSimilarImg() {
        return request.get(`${API_URL}loadSimilarImage/`);
    }
    
}
export default new RecommendService();
