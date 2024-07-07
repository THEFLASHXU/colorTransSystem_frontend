<template>
  <div class="page">
 

    <div class="content">
      <div class="scene-similar">
        <p class="title">与您拍摄场景相似的图片</p>
        <div class="imageList">
          <img
            @click="sendToCreate(item)"
            :src="item"
            v-for="item in similar_scene_arr"
            alt=""
          />
        </div>
      </div>
      <div class="color-similar">
        <p class="title">与您常用色调相似的图片</p>
        <div class="imageList">
          <img
            @click="sendToCreate(item)"
            :src="item"
            v-for="item in similar_color_arr"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import one from "../assets/5.png";
// import one1 from "../assets/6.png";
// import one2 from "../assets/7.png";
// import one3 from "../assets/8.png";
import RecommendService from "../api/recommend.js";
import type { TabsPaneContext } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

const tabPosition = ref("pp");
const tabChange = (tab: TabsPaneContext, e: Event) => {
  console.log(tab, e);
};
const similar_scene_arr = ref([]);
const similar_color_arr = ref([]);
// const arr = ref([one1, one2, one3, one1, one2, one3, one1, one2, one3]);
onMounted(async () => {
  loadSimilarImg();
});
//功能：获取当前登录用户的默认推荐构图像素图片集合和颜色相似图片集合
const loadSimilarImg = async () => {
  //ElMessage.success("loadSimilarImg方法被调用");
  const response = await RecommendService.loadSimilarImg();
  similar_scene_arr.value = response.data[0]; // 第一个数组赋值给 similar_scene_arr
  similar_color_arr.value = response.data[1]; // 第二个数组赋值给 similar_color_arr
  console.log("response.data", response.data);
};

// 功能：跳转到指定的界面并且传递参数
const sendToCreate = async (item) => {
  //ElMessage.success("sendToCreate方法被调用");
  // router.push({ name: "Test", params: { initialSrcImg:  encodeURIComponent(item) } });
  router.push({ name: "Create", params: { initialRefImg:  encodeURIComponent(item) } });
};

</script>

<style scoped>
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
/* .header {
  height: 103px;
  background: linear-gradient(
    180deg,
    rgba(22, 69, 201, 1) 0%,
    rgba(80, 27, 141, 0.73) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 34px;
}
.header .left {
  font-size: 45px;
  font-family: Lora-regular;
}
.header .right {
  display: flex;
}
.header .right div {
  margin-right: 50px;
  font-family: SourceHanSansSC-regular;
  font-size: 24px;
} */

.content {
  display: flex;
  flex-direction: column; /* 改变主轴方向为垂直 */
  justify-content: center; /* 居中显示 */
  align-items: center; /* 保证子元素在交叉轴上也居中 */
}
.content .scene-similar {
  /* border: 3px solid #1684fc; */
  display: flex;
  flex-direction: column; /* 使标题和图片列表垂直排列 */
  align-items: center; /* 保证标题和图片列表在交叉轴上居中 */
  /* flex-wrap: wrap; */
  /* justify-content: space-evenly; */
  width: 1200px;
}
.content .scene-similar .title {
  width: 100%; /* 让标题宽度与父容器相同 */
  /* border: 2px solid rgb(30, 234, 51); */
  font-size: 20px;
  text-align: center; /* 文本居中 */
  font-family: Lora-regular;
}
.content .scene-similar .imageList {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* 宽度与父容器相同，保证可以适应不同屏幕 */
  justify-content: center; /* 居中显示 */
  /* border: 2px solid rgb(162, 37, 102); */
  /* align-items: center; */
}
.content .scene-similar .imageList img {
  margin-right: 30px; /* 右边距 */
  margin-bottom: 40px; /* 下边距 */
  height: 235px;
  width: 314px;
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
  cursor: pointer;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
}

.content .color-similar {
  /* border: 3px solid #1684fc; */
  display: flex;
  flex-direction: column; /* 使标题和图片列表垂直排列 */
  align-items: center; /* 保证标题和图片列表在交叉轴上居中 */
  /* flex-wrap: wrap; */
  /* justify-content: space-evenly; */
  width: 1200px;
  margin-top: 40px;
}
.content .color-similar .title {
  width: 100%; /* 让标题宽度与父容器相同 */
  /* border: 2px solid rgb(30, 234, 51); */
  font-size: 20px;
  text-align: center; /* 文本居中 */
  font-family: Lora-regular;
}
.content .color-similar .imageList {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* 宽度与父容器相同，保证可以适应不同屏幕 */
  justify-content: center; /* 居中显示 */
  /* border: 2px solid rgb(162, 37, 102); */
  /* align-items: center; */
}
.content .color-similar .imageList img {
  margin-right: 30px; /* 右边距 */
  margin-bottom: 40px; /* 下边距 */
  height: 235px;
  width: 314px;
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
  cursor: pointer;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>
