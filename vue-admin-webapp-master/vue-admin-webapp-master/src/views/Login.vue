

<template>
  <div class="login-container">
    <img src="../assets/img/login/logo.png" alt />
    <div class="left">
      <img src="../assets/img/GIF.gif" alt="" class="top1" />
      <!-- <img src="../assets/img/detail/jianzhu.png" alt="" class="cen"> -->
    </div>
    <div class="right">
      <div class="title">
        <h2>智慧卫生安全防控系统</h2>
        <h5>—— 用生物科技保护人们的安全 ——</h5>
      </div>
      <div class="tab">
        <span class="lf">用户登录</span>
        <span class="rt" @click="dialogFormVisible = true">用户注册</span>
      </div>

      <div class="loginForm">
        <h1>欢迎登录</h1>
        <el-form ref="ruleForm" :model="form" class="dom" :rules="rules">
          <el-form-item>
            <img src="../assets/img/login/user.png" alt class="img" />
            <el-input
              v-model="form.name"
              placeholder="请输入用户名/手机号"
              class="dialog-input-text"
              @blur="getCode1"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <img src="../assets/img/login/password.png" alt class="img" />
            <el-input
              v-model="form.password"
              placeholder="请输入登录密码"
              class="dialog-input-text1"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <img src="../assets/img/login/password.png" alt class="img" />
            <el-input
                class="dialog-input-text2"
              v-model="form.code"
              auto-complete="off"
              placeholder="验证码"
              @keyup.enter.native="handleLogin"
              maxlength="4"
            >
              <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
            </el-input>
            <span class="login-code" @click="getCode1" v-if="show==true">
              <img :src="codeUrl" />
            </span>
              <span class="login-code" @click="getCode1" v-if="show==false">
            获取验证码
            </span>
          </el-form-item>
          <div class="center">
            <div class="lf">
              <el-checkbox v-model="checked"></el-checkbox>
              <span>一周内自动登录</span>
            </div>
            <div class="rt">
              <span>忘记密码？</span>
            </div>
          </div>
          <!-- <JcRange status="ruleForm.status" :successFun="onMpanelSuccess" :errorFun="onMpanelError"></JcRange> -->

          <el-slider
            v-model="form.status"
            :step="50"
            :max="3050"
            :show-tooltip="false"
          />
          <el-button type="primary" @click="onSubmit">登 录</el-button>
        </el-form>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogFormVisible"
      class="dialog"
      custom-class="class1"
    >
      <el-form :model="form1" class="form">
        <el-form-item>
          <div class="type">
            <span>类别:</span>
            <el-select v-model="form1.type">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="name">
            <span>机构名称:</span>
            <el-input v-model="form1.name" autocomplete="off"></el-input>
          </div>
        </el-form-item>

        <el-form-item class="pan">
          <div class="user">
            <span>用户名:</span>
            <el-input v-model="form1.user" autocomplete="off"></el-input>
          </div>
          <div class="password">
            <span>密码:</span>
            <el-input v-model="form1.password" autocomplete="off"></el-input>
          </div>
        </el-form-item>

        <h2>申请人信息</h2>
        <el-form-item>
          <div class="username">
            <span>姓名:</span>
            <el-input v-model="form1.username" autocomplete="off"></el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="phone">
            <span>手机号:</span>
            <el-input v-model="form1.phone" autocomplete="off"></el-input>
          </div>
          <div class="code">
            <span>验证码:</span>
            <el-input v-model="form1.code" autocomplete="off"></el-input>
            <el-button>发送验证码</el-button>
          </div>
        </el-form-item>
        <h2>上传身份证正反面复印件</h2>
        <el-form-item class="up">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload1"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <span class="avatar-uploader-icon">正面+</span>
          </el-upload>

          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <span class="avatar-uploader-icon">反面+</span>
          </el-upload>
        </el-form-item>

        <div class="file">
          <span>扫描件</span>
          <span>模板下载 ↓</span>
          <span>文件上传 ↑</span>
        </div>

        <el-form-item class="up">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload2"
          >
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <h2>审核时间为3个工作日</h2>

        <el-button>提 交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { login, getCode } from "../api/login1";

import { hexMD5 } from "../utils/MD5";

export default {
  name: "Login",

  data() {
    return {
      show:false,
      codeUrl: "",
      dialogFormVisible: false,
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      name: "18255316669",
      password: "JYSW12345678",
      form: {
        name: "",
        password: "",
        status: [],
        code: "",
      },
      checked: false,
      form1: {
        type: "",
        name: "",
        user: "",
        password: "",
        username: "",
        phone: "",
        code: "",
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getCookie();
  },
  methods: {
    
    getCode1() {
  
      getCode(this.form.name).then((res) => {
        console.log(res.data);
            this.show= true
        this.codeUrl =
          "data:image/png;base64," +
         res.data.data
          console.log( this.codeUrl)
      });
    },
    register() {
      this.dialogFormVisible = false;
    },
    onSubmit() {
      var that = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          login(this.form.name, this.form.password, this.form.code).then(
            (res) => {
              console.log(res);
              if (that.checked == true) {
                that.setCookie(this.form.name, this.form.password, 7);
              } else {
                that.clearCookie();
              }
              console.log(res.data.code)
              if (res.data.code == 200) {
  
                if (this.form.status == 3050) {
                  sessionStorage.setItem("token", res.data.data.token);
              
                     localStorage.setItem("token", res.data.data.token);
                        localStorage.setItem("nickname", res.data.data.userInfo.nickname);
                            localStorage.setItem("userid", res.data.data.userInfo.userId);
                  this.$router.push("/home");
          
                } else {
           
                  this.$message({
                    type: "error",
                    message: "请滑动滑块完成验证",
                  });
                }
              } else {
                     console.log('333')
                this.$message({
                  type: "error",
                  message: res.data.msg,
                });
              }
            }
          )
          .catch((err)=>{
            this.getCode1()
            console.log(err)
   this.$message({
                  type: "error",
                  message: err.data.msg,
                });
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            //  console.log(arr2[1])
            this.name = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            // console.log(arr2[1])
            this.password = arr2[1];
          }
        }
        this.checked = true;

    
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    onMpanelSuccess() {},
    onMpanelError() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload2(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess3(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload3(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "../assets/styles/slide.scss";

::v-deep .el-slider {
  width: 96%;
  margin: 0 auto;
  margin-top: 20px;
}
::v-deep  .el-slider__runway {
  height: 29px;
  margin-top: 0;
  margin-bottom: 0 !important;
  background-color: rgb(61, 61, 61);

  border-radius: 10px 10px 10px 10px;
}
::v-deep  .el-slider__bar {
  height: 29px;
  background: rgba(55, 159, 255, 1);
  border-radius: 10px 10px 10px 10px;
}
::v-deep  .el-slider__button-wrapper {
  top: 0;
  height: 29px;
}
::v-deep  .el-slider__button {
  width: 57px;
  height: 29px;

  border: none;
  box-shadow: 0px 2px 2px 2px #d3d3d3;
  border-radius: 10px 10px 10px 10px;
  box-sizing: border-box;
}
::v-deep  .el-slider__stop {
  width: 1px;
  height: 31px;
  border-radius: 0;
  background-color: #dcdfe6;
}
::v-deep  .el-slider__marks-text {
  color: #717171;
  margin-top: 0;
}

.top1 {
  width: 100%;
  height: 100%;
  display: inline-block;
}

.class1 {
  border-radius: 35px !important;
}
.form > h2 {
  font-size: 19px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #c5c5c5;
  margin-bottom: 14px;
}
.type {
  position: relative;
  height: 50px;
}
.type > span {
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #919191;
  position: absolute;
  top: 0px;
  left: 15px;
  z-index: 99999;
}
.el-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.name {
  position: relative;
  height: 50px;
}
.username {
  position: relative;
  height: 50px;
}
.user {
  display: inline-block;
  position: relative;
  width: 48%;
  float: left;
  height: 50px;
}
.password {
  display: inline-block;
  position: relative;
  width: 48%;
  float: right;
  height: 50px;
}

.phone {
  display: inline-block;
  position: relative;
  width: 48%;
  float: left;
  height: 50px;
}
.code {
  display: inline-block;
  position: relative;
  width: 48%;
  float: right;
  height: 50px;
}

.el-input >>> .el-input__inner {
  padding-left: 80px !important;
  box-sizing: border-box;
}
.name > span,
.password > span,
.user > span,
.username > span,
.phone > span,
.code > span {
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #919191;
  position: absolute;
  top: 0px;
  left: 15px;
  z-index: 99999;
}

.code .el-button {
  width: 94px;
  height: 40px;
  font-size: 15px;
  position: absolute;
  right: 0px;
  top: 0;
  border-radius: 8px;
  padding: 0;
  background: #2297ec;
  color: #fff;
}
.form > .el-button {
  width: 100%;
  height: 50px;
  background: #2297ec;
  border-radius: 15px;
  color: #fff;
}
.code > .el-input {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-select >>> .el-input__inner {
  padding-left: 80px !important;
  box-sizing: border-box;
}
.up {
  height: 140px;
  overflow: hidden;
}
.file > span {
  font-size: 19px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #919191;
  margin-right: 40px;
}
.avatar-uploader {
  width: 160px;
  height: 124px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
  float: left;
  margin-right: 14px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #c5c5c5;
  width: 160px;
  height: 124px;
  line-height: 124px;
  text-align: center;
  display: block;
  margin: 0 auto;
}
.avatar {
  width: 160px;
  height: 124px;
  display: block;
}
.login-container {
  width: 100%;
  height: 100%;
  background: url(../assets/img/login/bj.png);
  background-image: linear-gradient(to right, #1c90b8, #2868b1);
  background-size: 100% 100%;
  position: relative;
}

.login-container > img {
  display: block;
  width: 214px;
  height: 78px;
  position: absolute;
  top: 64px;
  left: 84px;
}
.left {
  width: 41%;
  height: 53%;
  position: absolute;
  left: 182px;
  top: 50%;
  margin-top: -12%;
}
.right {
  width: 550px;
  height: 720px;
  position: absolute;
  right: 182px;
  top: 50%;
  margin-top: -360px;
}
.right > .title {
  text-align: center;
}
.right > .title > h2 {
  font-size: 36px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
}
.right > .title > h5 {
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  margin-top: 15px;
}
.tab {
  width: 200px;
  height: 34px;
  margin: 0 auto;
  margin-top: 37px;
  display: flex;
  justify-content: space-between;
}
.tab > .lf {
  display: inline-block;
  width: 100px;
  height: 35px;
  background: #ffffff;
  border-radius: 10px 0px 0px 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #2297ec;
  text-align: center;
  line-height: 35px;
}
.tab > .rt {
  width: 100px;
  display: inline-block;
  height: 35px;
  border: 2px solid #ffffff;
  border-radius: 0px 10px 10px 0px;

  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  line-height: 35px;
  box-sizing: border-box;
}
.loginForm {
  width: 551px;
  height: 511px;
  background: #ffffff;
  border-radius: 35px;
  margin-top: 30px;
  padding: 50px 90px;
  box-sizing: border-box;
}
.loginForm > h1 {
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #c5c5c5;
}
.dom {
  margin-top: 23px;
  width: 100%;
  height: 100%;
}
.loginForm .el-form-item {
  width: 100%;
  height: 67px;
  border-radius: 20px;
  position: relative;
  margin-left: 0;
  margin-bottom: 0;
}
.el-form-item {
  margin-bottom: 0;
}
.dom .img {
  display: block;
  height: 30px;
  width: 28px;
  position: absolute;
  top: 4px;
  left: 15px;
  z-index: 999;
}
.el-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // padding-left: 75px;
  box-sizing: border-box;
}

  .el-input__inner {

  width: 100%;
  height: 54px;
  padding-left: 75px!important;
  box-sizing: border-box;

  border: 1px solid #ffc740;
  border-radius: 20px;
}

.el-input__inner {
  -web-kit-appearance: none;
  -moz-appearance: none;
  border-radius: 20px;
  padding-left: 75px!important;
  width: 100%;
  height: 54px;
  padding-left: 75px;
  box-sizing: border-box;
}

.dialog-input-text2 >>> .el-input__inner {
  -web-kit-appearance: none;
  -moz-appearance: none;
  border-radius: 20px;

  width: 70%;
  height: 54px;
  padding-left: 75px;
  box-sizing: border-box;
}
.login-code{
  display: inline-block;
  width: 28%;
  height: 43px;
  float: right;
  position: relative;
}
.login-code>img{
  display: block;
  width: 100%;
  height: 100%;
}
.center {
  width: 100%;
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}

.el-checkbox {
  width: 13px;
  height: 13px;
}
.center > .lf > span {
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #949494;
}
.center > .rt > span {
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ffc740;
}
.loginForm .el-button {
  width: 100%;

  height: 67px;
  background: #2297ec;
  border-radius: 15px;
  margin-top: 37px;

  font-size: 37px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
}
</style>
