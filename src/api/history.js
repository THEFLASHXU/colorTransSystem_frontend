// import axios from 'axios';
import axios from "../config/axios-config";
//导入request.js请求工具
import request from '../utils/request.js'
const API_URL = 'http://localhost:8080/colorTrans/history/'; // 后端API的基础URL

class HistoryService {
    
    //方法：调用后端加载历史记录接口
    loadHistory(currentPage, pageSize,offset) {
        const formData = new FormData();
        formData.append('page', currentPage);
        formData.append('size', pageSize);
        formData.append('offset', offset);
        return request.post(`${API_URL}getHistory/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    removeHistory(id){
        const formData = new FormData();
        formData.append('id', id);
        return request.post(`${API_URL}removeHistory/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
}
export default new HistoryService();
