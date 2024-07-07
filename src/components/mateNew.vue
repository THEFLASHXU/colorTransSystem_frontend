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
    </div>
    <el-radio-group v-model="tabPosition" @tab-click="tabChange" class="tabs">
      <el-radio-button label="xg">偏好推荐</el-radio-button>
      <el-radio-button label="sj">随机探索</el-radio-button>
      <el-radio-button label="pp">构图匹配</el-radio-button>
    </el-radio-group> -->

    <div class="content">
      <div class="left">
        <input
          type="file"
          ref="imgInput"
          @change="handleImageUpload"
          style="display: none"
        />
        <el-skeleton style="width: 450px" :loading="loading">
          <template #template>
            <el-skeleton-item
              class="skeletonImg"
              variant="image"
              style="width: 450px; height: 300px"
            />
            <!-- <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 50%" />
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-items: space-between;
                "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div> -->
          </template>
        </el-skeleton>
        <img v-if="!loading" :src="srcImg" alt="" />
        <el-button
          type="info"
          style="width: 230px; margin: 37px 0 23px 0"
          @click="uploadImg"
          >上传图片</el-button
        ><el-button
          type="info"
          style="width: 230px; margin-left: 0"
          @click="findSimilarImage"
          >构图匹配</el-button
        >
      </div>
      <div class="right">

        <el-skeleton style="width: 900px" :loading="rightLoading" animated>
          <!-- <template #template>
            <el-skeleton-item
              class="skeletonImg"
              variant="image"
              style="width: 400px; height: 280px"
            />
          </template> -->
          <template #template>
            <div class="skeleton-grid">
              <el-skeleton-item
                class="skeletonImg"
                variant="image"
                v-for="index in 4"
                :key="index"
                style="width: 400px; height: 280px"
              />
            </div>
          </template>
        </el-skeleton>
        <div v-if="rightTips" class="placeholder">
          请上传源图片后点击构图匹配按钮
        </div>
        <img
          v-if="rightImg"
          @click="sendRefImgToCreate(item)"
          :src="item"
          v-for="item in arr"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import one from "../assets/5.png";
// import one1 from "../assets/6.png";
// import one2 from "../assets/7.png";
// import one3 from "../assets/8.png";
import type { TabsPaneContex } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const tabPosition = ref("pp");
const tabChange = (tab: TabsPaneContext, e: Event) => {
  console.log(tab, e);
};
const arr = ref([""]);
const loading = ref(true);
const rightLoading = ref(false);
const rightImg=ref(false);
const rightTips=ref(true);
// let arr = [one, one1, one2, one3];
import RecommendService from "../api/recommend.js";
import SrcImgService from "../api/srcImg.js";

const imgInput = ref(null);
const imgFile = ref("");
const srcImg = ref("../assets/1.png");

// 功能：跳转到指定的界面并且传递参考图片
const sendRefImgToCreate = async (item) => {
  //ElMessage.success("sendRefImgToCreate方法被调用");
  // router.push({ name: "Test", params: { initialSrcImg:  encodeURIComponent(item) } });
  router.push({
    name: "Create",
    params: { initialRefImg: encodeURIComponent(item) },
  });
};

// 方法：点击按钮，触发上传源图片方法
const uploadImg = async () => {
  // try {
  //ElMessage.success("uploadImg方法发起请求");

  imgInput.value.click(); // 触发文件选择
};
//方法：调用input组件上传源图片
const handleImageUpload = async (event) => {
  //ElMessage.success("handleImageUpload方法发起请求");
  imgFile.value = event.target.files[0]; // 获取选择的文件
  if (!imgFile.value) {
    return;
  }
  const response = await SrcImgService.uploadImage(imgFile.value);
  loading.value = false;
  srcImg.value = response;
};
//功能：匹配与上传图片相似的参考图片
const findSimilarImage = async () => {
  //ElMessage.success("findSimilarImage方法发起请求");
  rightTips.value=false;//不显示右侧提示
  rightLoading.value=true;//显示骨架屏
  const response = await RecommendService.findSimilarImgByScene(imgFile.value);
  // const response = await RecommendService.findSimilarImgByColor(imgFile.value);
  arr.value = response.data;
  rightLoading.value=false;//不显示骨架屏
  rightImg.value=true;

  // alert(response.data);
  console.log(response);
  // resFile.value = response.data;
};
</script>

<style scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.imgList img {
  margin-bottom: 60px;
}
.result {
  padding: 33px 92px;
  background-color: rgba(248, 248, 248, 1);
}
.title {
  margin-bottom: 50px;
  text-align: center;
  font-size: 36px;
}
.imgBtn {
  width: 627px;
  height: 372px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 70px;
}
.imgBtn .btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 229px;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  background-color: rgba(164, 173, 179, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: center;
}
.tabs >>> .is-active {
  background-color: #1684fc;
}
:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  color: #fff !important;
}
.tabs >>> .el-radio-button__inner {
  color: #1684fc;
  border: 1px solid #1684fc;
}
.tabs {
  margin: 37px 0 51px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.page {
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  justify-content: space-evenly;
}
.content .left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content .left .skeletonImg {
  background-color: #e6e6e69c;
}
.content .left img {
  width: 450px;
  height: 300px;
  margin-top: 30px;
  /* border: 1px solid rgba(18, 100, 182, 0.267); */
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
}
.content .right {
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 900px;
  align-items: baseline;
}
.content .right img {
  margin-right: 30px; /* 右边距 */
  margin-bottom: 40px; /* 下边距 */
  width: 400px;
  height: 280px;
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
  /* border-radius: 15px; */
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  cursor: pointer;
}
.right .placeholder {
  width: 750px;
  height: 300px;
  background-color: rgba(255, 255, 204, 0.725);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #333;
  text-align: center;
  /* box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4); */
  border: 1px solid rgba(187, 187, 187, 0.579);
  font-family: Lora-regular;
}
.skeleton-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.skeleton-grid .skeletonImg {
 
  border-radius: 10px;
  margin: 10px;
  flex: 0 0 calc(50% - 20px); 
}

</style>
