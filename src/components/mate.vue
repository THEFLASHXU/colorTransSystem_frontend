<template>
  <div class="page">
    <div class="header">
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
    </el-radio-group>
    <div class="imgBtn">
      <div class="btn">上传图片</div>
      <img src="../assets/4.png" alt="" />
    </div>
    <div class="result">
      <div class="title">匹配结果</div>
      <div class="imgList">
        <img :src="item" v-for="item in arr" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import one from '../assets/5.png'
import one1 from '../assets/6.png'
import one2 from '../assets/7.png'
import one3 from '../assets/8.png'
import one4 from '../assets/9.png'
import one5 from '../assets/10.png'
import type { TabsPaneContext } from 'element-plus'
const tabPosition = ref('pp')
const tabChange = (tab: TabsPaneContext, e: Event) => {
  console.log(tab, e)
}
let arr = [one, one1, one2, one3, one4, one5]
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
