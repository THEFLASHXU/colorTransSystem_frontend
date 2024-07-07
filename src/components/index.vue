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
      <el-radio-button label="xg">习惯推荐</el-radio-button>
      <el-radio-button label="sj">随机探索</el-radio-button>
      <el-radio-button label="fg">构图匹配</el-radio-button>
    </el-radio-group> -->

    <div class="imgbox">
      <div class="one">
        <div v-for="item in oneArr" class="image">
          <img @click="sendToCreate(item)" :src="item" alt="" />
        </div>
      </div>
      <div class="two">
        <div v-for="item in twoArr" class="image">
          <img @click="sendToCreate(item)" :src="item" alt="" />
        </div>
      </div>
      <div class="three">
        <div v-for="item in threeArr" class="image">
          <img @click="sendToCreate(item)" :src="item" alt="" />
        </div>
      </div>
    </div>

    <div class="next">
      <el-button type="primary" class="button" @click="ChangeImages" round
        >换一批</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { TabsPaneContext } from "element-plus";
import RefImgService from "../api/refImg.js";
import { useRouter } from "vue-router";
const router = useRouter();
const tabPosition = ref("sj");
const tabChange = (tab: TabsPaneContext, e: Event) => {
  console.log(tab, e);
};

// let arr = [""];
// let oneArr = [""];
// let twoArr = [""];
// let threeArr = [""];
// 使用 ref 来包裹数组，确保它们是响应式的
const arr = ref([""]);
const oneArr = ref([""]);
const twoArr = ref([""]);
const threeArr = ref([""]);

onMounted(async () => {
  ChangeImages();
});

//方法：随机加载新的一批参考图片
const ChangeImages = async () => {
  try {
    console.log("ChangeImages方法发起请求");
    const response = await RefImgService.getRandomImages();
    // arr.value = response.data;
    arr.value = response;
    oneArr.value = arr.value.splice(0, 4);
    twoArr.value = arr.value.splice(0, 5);
    threeArr.value = arr.value;
    console.log(oneArr, twoArr, threeArr);
    console.log(arr);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
// 功能：跳转到指定的界面并且传递参数
const sendToCreate = async (item) => {
  //.success("sendToCreate方法被调用");

  // router.push({ name: "Test", params: { initialSrcImg:  encodeURIComponent(item) } });
  router.push({
    name: "Create",
    params: { initialRefImg: encodeURIComponent(item) },
  });
};

// let arr = [
//   "http://localhost:3000/images/51/000980.jpg",
//   "http://localhost:3000/images/60/000101.jpg",
//   "http://localhost:3000/images/82/000146.jpg",
//   "http://localhost:3000/images/67/000437.jpg",
//   "http://localhost:3000/images/76/002221.jpg",
//   "http://localhost:3000/images/82/009654.jpg",
//   "http://localhost:3000/images/63/000919.jpg",
//   "http://localhost:3000/images/60/000194.jpg",
//   "http://localhost:3000/images/60/000125.jpg",
//   "http://localhost:3000/images/63/000676.jpg",
//   "http://localhost:3000/images/67/000826.jpg",
//   "http://localhost:3000/images/51/001154.jpg",
//   "http://localhost:3000/images/67/000221.jpg",
// ];
// oneArr = arr.splice(0, 4);
// twoArr = arr.splice(0, 5);
// threeArr = arr;
// console.log(oneArr, twoArr, threeArr);
</script>

<style scoped>
.next {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  margin-top: 47px;
  margin-bottom: 153px;
}
.next .button {
  width: 120px;
  height: 45px;
  line-height: 45px;
  background: #1889d5;
}
.image {
  display: flex;
  /* flex-direction: column; */
  align-items: center; /* 确保结果区域内容居中 */
}
.imgbox .one,
.imgbox .three {
  justify-content: space-evenly;
}
.imgbox .two {
  justify-content: space-between;
  padding: 54px 10px;
  /* border: 1px solid #123; */
  /* width: 1400px; */
}
.imgbox > div {
  display: flex;
}
.imgbox .image {
  width: 250px;
  height: 150px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
}
.imgbox .image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
  cursor: pointer;
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
.header {
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
}
</style>
