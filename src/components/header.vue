<template>
  <div class="page">
    <div class="header">
      <div class="left">ColorTrans</div>
      <div class="right">
        <router-link class="routerlink" to="/">首页</router-link>
        <router-link class="routerlink" to="/create">创作中心</router-link>
        <router-link class="routerlink" to="/history">历史记录</router-link>
        <!-- <div>首页</div>
        <div>创作中心</div>
        <div>历史记录</div> -->
        <div>个人中心</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import Index from "./index.vue";
// import Recommend from "./recommend.vue";
// import Matenew from "./mateNew.vue";

// import type { TabsPaneContext } from "element-plus";
// const tabChange = (tab: TabsPaneContext, e: Event) => {
//   console.log(tab, e);
// };
// const tabPosition = ref("sj");
</script>

<style scoped>
/* .tabs >>> .is-active {
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
} */
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
.header .right .routerlink {
  margin-right: 50px;
  font-family: SourceHanSansSC-regular;
  font-size: 24px;
  color: white; /* 设置字体颜色为白色 */
  text-decoration: none; /* 去除下划线 */
}
</style>
