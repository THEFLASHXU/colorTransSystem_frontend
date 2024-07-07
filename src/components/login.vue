<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="registerData.rePassword"
          ></el-input>
        </el-form-item>
        <!-- 验证码输入 -->
        <el-form-item class="captcha-item">
          <div class="captcha-container">
            <el-input
              v-model="registerData.code"
              placeholder="请输入验证码"
              class="captcha-input"
            ></el-input>
            <el-image
              :src="kaptchaImg"
              fit="contain"
              class="captcha-image"
            ></el-image>
          </div>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="
              isRegister = false;
              clearRegisterData();
            "
          >
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-else
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码输入 -->
        <el-form-item class="captcha-item">
          <div class="captcha-container">
            <el-input
              placeholder="请输入验证码"
              v-model="registerData.code"
              class="captcha-input"
            ></el-input>
            <el-image
              :src="kaptchaImg"
              fit="contain"
              class="captcha-image"
              @click="refreshKaptcha"
            ></el-image>
          </div>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="registerData.rememberMe">记住我</el-checkbox>
            <!-- <el-link type="primary" :underline="false">忘记密码？</el-link> -->
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="
              isRegister = true;
              clearRegisterData();
            "
          >
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
// import { onMounted } from 'vue';
import { ElMessage } from "element-plus";
//控制注册与登录表单的显示， 默认显示登录
const isRegister = ref(false);
//定义数据模型
const registerData = ref({
  username: "",
  password: "",
  rePassword: "",
  code: "",
  rememberMe: false,
});
const kaptchaImg = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
//页面渲染后先调用这个函数
onMounted(async () => {
  refreshKaptcha();
});

//校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次确认密码"));
  } else if (value !== registerData.value.password) {
    callback(new Error("请确保两次输入的密码一样"));
  } else {
    callback();
  }
};

//定义表单校验规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 16, message: "长度为5~16位非空字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 16, message: "长度为5~16位非空字符", trigger: "blur" },
  ],
  rePassword: [{ validator: checkRePassword, trigger: "blur" }],
};

//调用后台接口,完成注册
// import { userRegisterService, userLoginService} from '../api/user.js'
import UserService from "../api/user.js";
const register = async () => {
  ElMessage.success("register方法被调用");
  //registerData是一个响应式对象,如果要获取值,需要.value
  // let result = await userRegisterService(registerData.value);
  /* if (result.code === 0) {
        //成功了
        alert(result.msg ? result.msg : '注册成功');
    }else{
        //失败了
        alert('注册失败')
    } */
  //alert(result.msg ? result.msg : '注册成功');
  // ElMessage.success(result.msg ? result.msg : '注册成功')
  let result = await UserService.userRegist(
    registerData.value.username,
    registerData.value.password,
    registerData.value.code
  );
  if (result.code === 0) {
    //成功了
    ElMessage.success(result.message ? result.message : "注册成功");
  } else {
    ElMessage.error(result.message);
    //失败了
    // alert("注册失败");
  }
};

//绑定数据,复用注册表单的数据模型
//表单数据校验
//登录函数
import { useTokenStore } from "../stores/token.js";
import { useRouter } from "vue-router";
const router = useRouter();
const tokenStore = useTokenStore();
const login = async () => {
  // ElMessage.success("login方法被调用");
  //调用接口,完成登录
  let result = await UserService.userLogin(
    registerData.value.username,
    registerData.value.password,
    registerData.value.code,
    registerData.value.rememberMe
  );
  /* if(result.code===0){
    alert(result.msg? result.msg : '登录成功')
   }else{
    alert('登录失败')
   } */
  //alert(result.msg? result.msg : '登录成功')
  if (result.code === 0) {
    // ElMessage.success(result.message ? result.message : "登录成功");
    ElMessage.success( "登录成功");
    //把得到的token存储到pinia中
    // tokenStore.setToken(result.data);
    // alert(result.data);
    //跳转到首页 路由完成跳转
    router.push("/");
  } else {
    ElMessage.error(result.message);
  }
  // console.log(result);
};

const refreshKaptcha = async () => {
  // alert("refreshKaptcha方法被调用");
  const timestamp = new Date().getTime(); // 获取当前时间戳
  let result = await UserService.getKaptcha();
  console.log(result);
  // if (result.data instanceof Blob)
  const imageUrl = URL.createObjectURL(result); // 创建一个 URL 对象表示指定的 Blob 对象
  console.log(imageUrl);
  kaptchaImg.value = imageUrl;
  // 在验证码图片 URL 中添加时间戳作为查询参数，强制浏览器请求新的图片
  // kaptchaImg.value = `${result.data}?t=${timestamp}`;
};

//定义函数,清空数据模型的数据
const clearRegisterData = () => {
  registerData.value = {
    username: "",
    password: "",
    rePassword: "",
    code: "",
    rememberMe: "",
  };
};
</script>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url("../assets/ColorTrans.png") no-repeat 50% center / 350px auto,
      url("../assets/login_bg.jpg") no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.captcha-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.captcha-input {
  flex: 1; /* 输入框占据剩余空间 */
  margin-right: 10px; /* 和图片保持一定间隔 */
}

.captcha-image {
  width: 100px; /* 设置图片宽度 */
  height: 40px; /* 设置图片高度 */
}
</style>