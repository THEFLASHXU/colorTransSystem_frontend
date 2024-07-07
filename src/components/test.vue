<script setup>
import { ref, onMounted, computed } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
// import { ref } from 'vue'
import { ElMessage } from "element-plus";
import UserService from "../api/user.js";
import RecommendService from "../api/recommend.js";
import axios from "../config/axios-config";
import SrcImgService from "../api/srcImg.js";
import TestService from "../api/test.js";
//导入request.js请求工具
import request from "../utils/request.js";

const value1 = ref(50);
const value1computed = computed(() => value1.value - 50);
const user = ref(null);
const srcFile = ref("");
const srcImg = ref("");
const srcImgInput = ref(null);
const ParamList = ref([
  { paramName: "高光", value: 30 },
  { paramName: "阴影", value: 20 },
  { paramName: "红色色调", value: 12 },
  { paramName: "绿原色饱和度", value: -100 },
]);
let timestamp = "";
// 接受一个 prop（比如 initialSrcImg）
const props = defineProps({
  initialSrcImg: String,
});
onMounted(async () => {
  // srcImg.value = props.initialSrcImg;
  // autoUploadSrcFile(srcImg.value);
  timestamp = Date.now(); // 获取当前时间戳
  console.log("Generated timestamp:", timestamp);
  ElMessage.success("onMounted被调用");
  const receivedSrcImgUrl = decodeURIComponent(props.initialSrcImg); //解码传递过来的url参数
  // console.log("传过来的参数：", receivedSrcImgUrl);
  if (receivedSrcImgUrl) {
    // 检查receivedSrcImgUrl 是否存在
    console.log("传过来的参数：", receivedSrcImgUrl);
    srcImg.value = receivedSrcImgUrl;
    console.log("循环外srcImg.value：", srcImg.value);
    if (srcImg.value) {
      // 再次确认 srcImg.value 是否被成功赋值
      console.log("srcImg.value：", srcImg.value);
      autoUploadSrcFile(srcImg.value);
    }
  }
});
const fetchUser = async () => {
  try {
    const response = await UserService.getUserNameById(111);
    console.log("response.data", response.data);
    // console.log("response",response);
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const loadSimilarImg = async () => {
  ElMessage.success("loadSimilarImg方法被调用");
  const response = await RecommendService.loadSimilarImg();
  console.log("response.data", response.data);
};

// 方法：点击按钮，触发上传源图片方法
const uploadSrcImg = async () => {
  // try {
  ElMessage.success("uploadSrcImg方法发起请求");

  srcImgInput.value.click(); // 触发文件选择
};

//方法：调用input组件上传源图片
const handleSrcFileUpload = async (event) => {
  // ElMessage.success("handleSrcFileUpload方法发起请求");
  // const file = event.target.files[0]; // 获取选择的文件
  srcFile.value = event.target.files[0]; // 获取选择的文件
  // ElMessage.success("srcFile:" + srcFile.value);
  if (!srcFile.value) {
    return;
  }
  // const response = await SrcImgService.uploadSrcImage(userId.value, file);
  const response = await SrcImgService.uploadImage(srcFile.value);
  // srcImg.value = response.data;
  srcImg.value = response;
};
// 下载图片并转换为 Blob
const downloadImageAsBlob = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");
    const imageBlob = await response.blob(); // 将图片内容转换为 Blob
    return imageBlob;
  } catch (error) {
    console.error("Download image error:", error);
  }
};

// 将 Blob 转换为 File 对象
const blobToFile = async (blob, filename) => {
  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now(),
  });
};

// // 使用这个 File 对象
// const handleSrcFileUploadFromURL = async (imageUrl) => {
//   const imageBlob = await downloadImageAsBlob(imageUrl);
//   if (!imageBlob) {
//     return;
//   }

//   const imageFile = blobToFile(imageBlob, "downloadedImage.jpg");
//   srcFile.value = imageFile; // 你现在拥有一个 File 对象，可以用于上传

//   const response = await SrcImgService.uploadImage(srcFile.value);
//   ElMessage.success(response);
//   srcImg.value = response;
// };

const autoUploadSrcFile = async (imageUrl) => {
  // alert(imageUrl);
  // 提取 imageName
  ElMessage.success("autoUploadSrcFile方法被调用");
  const imageName = imageUrl.split("/").pop();
  ElMessage.success(imageName);
  const imageBlob = await downloadImageAsBlob(imageUrl);
  if (!imageBlob) {
    return;
  }

  const imageFile = await blobToFile(imageBlob, imageName);
  console.log("imageFile", imageFile);
  srcFile.value = imageFile; // 你现在拥有一个 File 对象，可以用于上传

  const response = await SrcImgService.uploadImage(srcFile.value);
  ElMessage.success(response);
  srcImg.value = response;
};

const sendTimestamp = async () => {
  ElMessage.success(timestamp);
  ElMessage.success("sendTimestamp方法被调用");
  const response = await TestService.sendTimeStamp(timestamp);
};

const downloadImage = async (imageUrl) => {
  console.log("下载的图片的路径：", imageUrl);

  try {
    // 使用 fetch 获取图片
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // 将响应转换为 Blob 对象

    // 创建一个隐藏的 <a> 元素
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); // 创建一个对象 URL

    // 指定下载的文件名
    link.download = "downloaded_image.jpg";

    // 模拟点击下载
    document.body.appendChild(link);
    link.click();

    // 完成下载后移除 <a> 元素
    document.body.removeChild(link);

    // 释放对象 URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("下载图片出错:", error);
  }
};

// const computeBackgroundStyle = (value) => {
//   const offset = ((value + 100) / 200) * 100;
//   return {
//     background: `linear-gradient(to right, gray 0%, blue ${offset}%, gray ${offset}%, gray 100%)`,
//     position: 'absolute',
//     top: '50%',
//     left: 0,
//     width: '100%',
//     height: '6px',
//     transform: 'translateY(-50%)',
//     zIndex: -1
//   };
// };

// const API_URL = 'http://localhost:8080/colorTrans/colortrans/';
// const fetchData = async () => {
//   try {
//     const response = await axios.get(`${API_URL}getUserNameById/${userId}`);
//     console.log(response.data);
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//   }
// }

// onMounted(() => {
//   fetchUser();
// });
</script>

<template>
  <div>
    <h1>User Information</h1>
    <p>{{ user ? `Name: ${user}` : "Loading..." }}</p>
    <!-- 注册按钮 -->
    <el-form-item>
      <el-button
        class="button"
        type="primary"
        auto-insert-space
        @click="fetchUser"
      >
        获取用户的昵称
      </el-button>
      <el-button
        class="button"
        type="primary"
        auto-insert-space
        @click="loadSimilarImg"
      >
        触发loadSimilarImg
      </el-button>
      <div class="imgBox">
        <input
          type="file"
          ref="srcImgInput"
          @change="handleSrcFileUpload"
          style="display: none"
        />
        <div class="btn" @click="uploadSrcImg">选择具有自然色彩的原始图片</div>
        <img :src="srcImg" alt="" />
      </div>
      <el-button
        class="button"
        type="primary"
        auto-insert-space
        @click="autoUploadSrcFile(srcImg)"
      >
        触发autoUploadSrcFile
      </el-button>

      <el-button
        class="button"
        type="primary"
        auto-insert-space
        @click="sendTimestamp"
      >
        发送时间戳
      </el-button>

      <el-button
        class="button"
        type="primary"
        auto-insert-space
        round
        @click="downloadImage(srcImg)"
        >下载图片</el-button
      >
    </el-form-item>

    <div class="sliders">
      <div class="slider" v-for="item in ParamList" :key="item.paramName">
        <span class="label">{{ item.paramName }}</span>

        <el-slider
          :min="-100"
          :max="100"
          v-model="item.value"
          class="custom-slider"
          :show-tooltip="false"
        />
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<style  scoped>
/* 样式 */
/* .sliders >>> .el-slider__bar {
  background-color: transparent;
}
.sliders >>> .el-slider__button {
  border-color: #3996fb;
  background-color: #e1ecff;
}
.sliders >>> .el-slider__runway {
  background-color: #e8e8e8;
} */
.sliders >>> .el-slider__bar {
  background-color: transparent;
}
.sliders >>> .el-slider__button {
  width: 5px;
  height: 16px;
  border-radius: 0; /* Remove the border-radius to make it square */
  /* border-color: #3997fb7c; */
  border: 1px solid #4da3ffc9;
  background-color: #bcd5ff;
}
.sliders >>> .el-slider__runway {
  background-color: #e8e8e8;
}
.sliders {
  width: 500px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.custom-slider {
  flex: 1;
  margin: 0 13px;
}
.slider {
  display: flex;
  align-items: center;
}

.slider .label {
  border: 1px solid rgb(111, 205, 10);
  display: inline-block;
  width: 100px;
  text-align: right;
  /* font-family:'Noto Sans SC', sans-serif; */
  font-family: Lora-regular;
  font-size: 14px;
  /* font-family: "Arial","宋体","Microsoft YaHei","黑体",sans-serif; */
  /* font-family: 'Hanyi Senty Crayon', serif; */
  /* font-family: "NSimSun"; */
  /* font-family: "Tahoma"; */
  /* font-family: "Microsoft JhengHei"; */
  /* font-family: "Microsoft YaHei"; */
}
.slider .value {
  border: 1px solid rgb(221, 68, 73);
  width: 50px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
}

.imgBox .btn {
  width: 200px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #a4adb3;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.imgBox img {
  width: 100%;
  height: 100%;
}
.imgBox {
  width: 550px;
  height: 327px;
  position: relative;
}
</style>