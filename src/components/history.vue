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

    <div class="content">
      <div style="overflow: auto; height: 100%" infinite-scroll-distance="0">
        <div class="infinite-list-item" v-for="item in dataList">
          <div>
            <span>源图片</span
            ><img
              @click="sendSrcImgToCreate(item.srcImgServerUrl)"
              :src="item.srcImgServerUrl"
              alt=""
            />
          </div>
          <div>
            <span>参考图片</span
            ><img
              @click="sendRefImgToCreate(item.refImgServerUrl)"
              :src="item.refImgServerUrl"
              alt=""
            />
          </div>
          <div class="line"></div>
          <div>
            <span>颜色迁移结果</span><img :src="item.resImgServerUrl" alt="" />
          </div>
          <div>
            <span>{{ item.formattedTimestamp }}</span>
            <div>
              <!-- <el-button
                type="danger"
                style="width: 170px; margin-bottom: 33px"
                @click="deleteRecord(item.id)"
                >删除记录</el-button
              > -->
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确认删除这条历史记录吗？"
                @confirm="deleteRecord(item.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    style="width: 170px; margin-bottom: 33px"
                    >删除记录</el-button
                  >
                </template>
              </el-popconfirm>
              <el-button
                type="primary"
                style="width: 170px; margin-left: 0"
                @click="downloadImage(item.resImgServerUrl)"
                >下载迁移结果</el-button
              >
            </div>
          </div>
        </div>
        <div class="next">
          <el-button
            type="primary"
            class="button"
            @click="loadInitialHistory"
            v-show="buttonIsShow"
            >加载更多</el-button
          >
        </div>
        <div class="loader" v-if="loading"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();

import one from "../assets/5.png";
import one1 from "../assets/6.png";
import one2 from "../assets/7.png";
import one3 from "../assets/8.png";

const buttonIsShow = ref(true);
const currentPage = ref(0); //当前加载页码
const pageSize = 4; //一页显示多少个
const offset = ref(-4);
const loading = ref(false); //进度条
// let arr = [one, one1, one2, one3]
const dataList = ref([]);
const list = ref([
  { img1: one, img2: one1, img3: one2, time: "2024年5月17日" },
  { img1: one, img2: one1, img3: one2, time: "2024年5月17日" },
  { img1: one, img2: one1, img3: one2, time: "2024年5月17日" },
  { img1: one, img2: one1, img3: one2, time: "2024年5月17日" },
]);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    list.value.push({
      img1: one,
      img2: one1,
      img3: one2,
      time: "2024年5月17日",
    });
    list.value.push({
      img1: one,
      img2: one1,
      img3: one2,
      time: "2024年5月17日",
    });
    list.value.push({
      img1: one,
      img2: one1,
      img3: one2,
      time: "2024年5月17日",
    });
    list.value.push({
      img1: one,
      img2: one1,
      img3: one2,
      time: "2024年5月17日",
    });
    loading.value = false;
  }, 2000);
};
import HistoryService from "../api/history.js";
onMounted(async () => {
  loadInitialHistory();
});

// 功能：跳转到指定的界面并且传递源图片
const sendSrcImgToCreate = async (item) => {
  //ElMessage.success("sendSrcImgToCreate方法被调用");
  // router.push({ name: "Test", params: { initialSrcImg:  encodeURIComponent(item) } });
  router.push({
    name: "Create",
    params: { initialSrcImg: encodeURIComponent(item) },
  });
};

// 功能：跳转到指定的界面并且传递参考图片
const sendRefImgToCreate = async (item) => {
  //ElMessage.success("sendRefImgToCreate方法被调用");
  // router.push({ name: "Test", params: { initialSrcImg:  encodeURIComponent(item) } });
  router.push({
    name: "Create",
    params: { initialRefImg: encodeURIComponent(item) },
  });
};

//功能：加载四条历史数据
const loadInitialHistory = async () => {
  currentPage.value += 1;
  offset.value = offset.value + pageSize;
  const historyData = await HistoryService.loadHistory(
    currentPage.value,
    pageSize,
    offset.value
  );
  if (historyData.data.length == 0) {
    ElMessage.success("所有历史数据加载完毕");
    buttonIsShow.value = false;
    // const buttonIsShow = ref(true);
  }
  //console.log(historyData.data.length);
  console.log(historyData.data);
  // ElMessage.success(historyData.data.length);
  dataList.value.push(...historyData.data);
  console.log(dataList.value);
};
//功能：删除历史记录
const deleteRecord = async (id) => {
  //ElMessage.success("deleteRecord方法被调用");
  dataList.value = dataList.value.filter((item) => item.id !== id);
  offset.value = offset.value - 1;
  const response = await HistoryService.removeHistory(id);

  if (response.code == 0) {
    // dataList.value = dataList.value.filter((item) => item.id !== id);
    ElMessage.success("删除成功");
  } else {
    ElMessage.error("删除失败");
  }
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
.next {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  margin-top: 47px;
  margin-bottom: 153px;
}
.next .button {
  width: 171px;
  height: 48px;
  line-height: 48px;
  background: #1889d5;
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

.content {
  height: calc(100% - 103px);
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list-item {
  margin: 30px 80px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  display: flex;
  /* box-sizing: border-box; */
  padding: 17px 45px 35px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
}
.infinite-list-item div {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.infinite-list-item div span {
  margin-bottom: 18px;
  font-family: Lora-regular;
  font-size: 18px;
}
.infinite-list-item div img {
  height: 130px;
  width: 200px;
  border-radius: 10px;
  object-fit: cover; /* 保持图片原始比例的同时进行裁剪 */
  border-radius: 10px; /* 圆角边框效果 */
  overflow: hidden; /* 确保图片超出部分被隐藏 */
}
.infinite-list-item .line {
  border: 1px solid rgba(187, 187, 187, 1);
  height: 150px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.loader {
  border: 8px solid rgba(255, 255, 255, 0.2); /* Semi-transparent white */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s ease-in-out infinite;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
