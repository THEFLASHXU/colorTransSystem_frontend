<template>
  <div class="page">
    <!-- <div class="header">
      <div class="left">ColorTrans</div>
      <div class="right">
        <div>首页</div>
        <div>创作中心</div>
        <div>历史记录</div>
        <div>个人中心</div>
      </div>
    </div> -->
    <Header></Header>
    <div class="content" v-loading="loading">
      <div class="flex">
        <div class="imgBox">
          <input
            class="input"
            type="file"
            ref="srcImgInput"
            @change="handleSrcFileUpload"
          />
          <div class="btn" @click="uploadSrcImg" v-if="!isShow">选择具有自然色彩的源图片</div>
          <img :src="srcImg" alt="" />
        </div>
        <div class="imgBox">
          <input
            class="input"
            type="file"
            ref="refImgInput"
            @change="handleRefFileUpload"
          />
          <div class="btn" @click="uploadRefImg" v-if="!isShow">选择风格化色彩参考图片</div>
          <img :src="refImg" alt="" />
        </div>
      </div>
      <!-- <div class="startBtn" @click="startColorTrans">开始仿色</div> -->
      <el-button type="primary" class="startBtn" @click="startColorTrans"
        >开始仿色</el-button
      >

      <div class="result" v-if="isShow">
        <img class="img" :src="resFile" alt="" />
        <div class="btnList">
          <div class="btn" @click="genPreset">解析参数</div>
          <div class="btn" @click="downloadImage(resFile)">保存图片</div>
          <div class="exportLrBtn">导出至Lightroom</div>
        </div>

        <div class="sliders" v-if="isShow_slider">
          <div class="slider" v-for="item in ParamList" :key="item.paramName">
            <span class="label">{{ item.paramName }}</span>
            <el-slider
              :min="-100"
              :max="100"
              v-model="item.value"
              class="custom-slider"
              :show-tooltip="false"
              disabled
            />
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>
      <!-- <el-dialog
        v-model="centerDialogVisible"
        title="tip"
        width="500"
        align-center
      >
        <div>请上传源图片和参考图片</div>
      </el-dialog> -->
      <el-dialog
        v-model="centerDialogVisible"
        title="提示"
        width="500"
        :before-close="handleClose"
        class="dialog"
      >
        <span class="tipText">请上传源图片和参考图片</span>
        <template #footer>
          <div class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">qux</el-button> -->
            <el-button
              class="comfirm"
              type="primary"
              @click="centerDialogVisible = false"
            >
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup >
import Header from "./header.vue";
import { ref, computed } from "vue";
import SrcImgService from "../api/srcImg.js";
import PresetService from "../api/preset.js";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const value1 = ref(50);
const value1computed = computed(() => value1.value - 50);
const ParamList = ref([]);

const isShow = ref(false);
const loading = ref(false);
const isShow_slider =ref(false);

// 控制弹窗开启或关闭
const centerDialogVisible = ref(false);
const router = useRouter();

// 接受一个 prop（比如 initialSrcImg）
const props = defineProps({
  initialRefImg: {
    type: String,
    default: "", // 设置默认值，以防未提供参数
  },
  initialSrcImg: {
    type: String,
    default: "", // 设置默认值，以防未提供参数
  },
});

onMounted(async () => {
  //ElMessage.success("onMounted被调用");
  timestamp = Date.now(); // 获取当前时间戳
  console.log("Generated timestamp:", timestamp);
  const receivedRefImgUrl = decodeURIComponent(props.initialRefImg); //解码传递过来的url参数
  const receivedSrcImgUrl = decodeURIComponent(props.initialSrcImg); //解码传递过来的url参数

  //赋值参考图片
  if (receivedRefImgUrl) {
    // 检查receivedSrcImgUrl 是否存在
    console.log("传过来的参数：", receivedRefImgUrl);
    refImg.value = receivedRefImgUrl;
    if (refImg.value) {
      // 再次确认 srcImg.value 是否被成功赋值
      console.log("refImg.value：", refImg.value);
      autoUploadRefFile(refImg.value);
    }
  }

  //赋值源图片
  if (receivedSrcImgUrl) {
    // 检查receivedSrcImgUrl 是否存在
    console.log("传过来的参数：", receivedSrcImgUrl);
    srcImg.value = receivedSrcImgUrl;
    if (srcImg.value) {
      // 再次确认 srcImg.value 是否被成功赋值
      console.log("srcImg.value：", srcImg.value);
      autoUploadSrcFile(srcImg.value);
    }
  }
});

const startColorTrans = () => {
  if (!srcImg.value || !refImg.value) {//判断源图片和参考图片是否全部上传
    centerDialogVisible.value = true;
  } else {
    loading.value = true;
    setTimeout(() => {
      isShow.value = true;
      loading.value = false;
    }, 1000 * 8);
    uploadSrcAndRefImg();
  }
};
const srcImg = ref("");
const refImg = ref("");
const userId = ref("1001"); // 用户ID
const srcImgInput = ref(null);
const refImgInput = ref(null);
const srcFile = ref("");
const refFile = ref("");
const resFile = ref("");
let timestamp = "";
// 方法：点击按钮，触发上传源图片方法
const uploadSrcImg = async () => {
  // try {
  //ElMessage.success("uploadSrcImg方法发起请求");

  srcImgInput.value.click(); // 触发文件选择
};

// 方法：点击按钮，触发上传参考图片方法
const uploadRefImg = async () => {
  // try {
  //ElMessage.success("uploadRefImg方法发起请求");
  refImgInput.value.click(); // 触发文件选择
};

//方法：调用input组件上传源图片
const handleSrcFileUpload = async (event) => {
  // ElMessage.success("handleSrcFileUpload方法发起请求");
  // const file = event.target.files[0]; // 获取选择的文件
  srcFile.value = event.target.files[0]; // 获取选择的文件
  // ElMessage.success("srcFile:" + srcFile.value);
  console.log("srcFile:" + srcFile.value);
  if (!srcFile.value) {
    return;
  }
  // const response = await SrcImgService.uploadSrcImage(userId.value, file);
  const response = await SrcImgService.uploadImage(srcFile.value);
  // srcImg.value = response.data;
  srcImg.value = response;
};
// 方法：调用input组件上传参考图片
const handleRefFileUpload = async (event) => {
  // ElMessage.success("handleRefFileUpload方法发起请求");
  refFile.value = event.target.files[0]; // 获取选择的文件
  if (!refFile.value) {
    return;
  }
  const response = await SrcImgService.uploadImage(refFile.value);
  refImg.value = response;
};
// 方法：传递源图片file和参考图片的file到后端，后端保存到指定的目录下，
const uploadSrcAndRefImg = async () => {
  // ElMessage.success("uploadSrcAndRefImg方法发起请求");
  const response = await SrcImgService.uploadSrcAndRefImage(
    srcFile.value,
    refFile.value,
    timestamp
  );

  // alert(response.data);
  console.log(response);
  resFile.value = response.data;
};

// 方法：生成颜色编辑文件，
const genPreset = async () => {
  loading.value = true;
    setTimeout(() => {
      isShow_slider.value=true;
      loading.value = false;
    }, 1000 * 10);
  
  //ElMessage.success("genPreset方法发起请求");
  console.log("genPreset方法发送的时间戳：", timestamp);
  const response = await PresetService.genPreset(timestamp);
  console.log("genPreset的response.data", response.data);
  ParamList.value = response.data;

  // resFile.value = response.data;
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

// 功能：通过其他页面跳转的方式，上传参考图片
const autoUploadRefFile = async (imageUrl) => {
  // alert(imageUrl);
  // 提取 imageName
  //ElMessage.success("autoUploadRefFile方法被调用");
  const imageName = imageUrl.split("/").pop();
  //ElMessage.success(imageName);
  const imageBlob = await downloadImageAsBlob(imageUrl);
  if (!imageBlob) {
    return;
  }

  const imageFile = await blobToFile(imageBlob, imageName);
  console.log("imageFile", imageFile);
  refFile.value = imageFile; // 你现在拥有一个 File 对象，可以用于上传

  const response = await SrcImgService.uploadImage(refFile.value);
  //ElMessage.success(response.message);
  // refImg.value = response;
};

// 功能：通过其他页面跳转的方式，上源图片
const autoUploadSrcFile = async (imageUrl) => {
  // alert(imageUrl);
  // 提取 imageName
  //ElMessage.success("autoUploadSrcFile方法被调用");
  const imageName = imageUrl.split("/").pop();
  //ElMessage.success(imageName);
  const imageBlob = await downloadImageAsBlob(imageUrl);
  if (!imageBlob) {
    return;
  }

  const imageFile = await blobToFile(imageBlob, imageName);
  console.log("imageFile", imageFile);
  srcFile.value = imageFile; // 你现在拥有一个 File 对象，可以用于上传

  const response = await SrcImgService.uploadImage(srcFile.value);
  //ElMessage.success(response.message);
};

//功能：保存图片到本地
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
</script>

<style scoped>
.dialog .tipText {
  font-family: Lora-regular;
  font-size: 16px;
}
.dialog .comfirm {
  font-family: Lora-regular;
  font-size: 16px;
}
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
  width: 550px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  align-items: center; /* 居中显示 */
}
.custom-slider {
  flex: 1;
  margin: 0 13px;
}
.slider {
  /* border: 1px solid rgb(10, 202, 205); */

  display: flex;
  align-items: center;
  /* width: 100%; */
}
.slider span.label {
  /* border: 1px solid rgb(111, 205, 10); */
  display: inline-block;
  width: 110px;
  text-align: right;
  font-family: Lora-regular;
  font-size: 15px;
}
.slider .value {
  /* border: 1px solid rgb(221, 68, 73); */
  width: 35px;
  display: inline-block;
  text-align: right;
  font-family: Lora-regular;
  font-size: 15px;
}

.btnList {
  /* border: 1px solid #23db2f; */
  display: flex;
  justify-content: space-around;
  margin: 42px 0;
  width: 100%;
}
.btnList .btn {
  width: 130px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: rgba(24, 137, 213, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: Lora-regular;
  text-align: center;
  cursor: pointer;
}
.btnList .exportLrBtn {
  width: 140px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: rgba(24, 137, 213, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: Lora-regular;
  text-align: center;
  cursor: pointer;
}
.result {
  /* border: 1px solid #7a0e0e; */
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保结果区域内容居中 */
}
.result .img {
  width: 1200px;
  height: 680px;
  /* border: 1px solid #123; */
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  /* border-radius: 10px; */
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
}
.startBtn {
  background-color: rgba(24, 137, 213, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  text-align: justify;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 40px;
  line-height: 40px;
  margin: 40px 0;
  border-radius: 10px;
  cursor: pointer;
}
.imgBox {
  width: 550px;
  height: 327px;
  position: relative;
}
.flex {
  display: flex;
  justify-content: space-between;
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
  font-family: Lora-regular;

  cursor: pointer;
}

.imgBox img {
  width: 100%;
  height: 100%;
  /* border: none; 移除任何边框 */
  /* box-shadow: none; 移除任何阴影 */
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
}
.imgBox .input {
  width: 2px;
  height: 2px;
  display: none;
  border: none; /* 移除任何边框 */
  box-shadow: none; /* 移除任何阴影 */
  /* border: 1px solid #ac2ea8; */
}
.content {
  padding: 80px 122px;
  align-items: center;
}

.page {
  width: 100%;
  height: 100%;
}
</style>
