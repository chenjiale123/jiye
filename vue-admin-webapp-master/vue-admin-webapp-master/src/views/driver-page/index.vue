<template>
  <div class="driver">
    <el-card>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="avrter">
          <el-upload
            action="https://jileaf.oss-cn-hangzhou.aliyuncs.com"
            :data="dataObj"
            ref="uploadImg"
            :multiple="true"
            :file-list="fileList"
            list-type="picture"
            accept=".png,.jpg,.jpeg,.gif"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog> -->
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="egname">
          <el-input v-model="ruleForm.egname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="职位英文" prop="egposition">
          <el-input v-model="ruleForm.egposition"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="企业微信ID" prop="qwID">
          <el-input v-model="ruleForm.qwID"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="value">
          <!-- <el-input v-model="ruleForm.addr"></el-input> -->
          <el-select v-model="ruleForm.value" placeholder="请选择公司">
            <el-option
              v-for="item in comList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="intro">
          <el-input type="textarea" v-model="ruleForm.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="https://jileaf.oss-cn-hangzhou.aliyuncs.com"
            :data="fldataObj"
            ref="uploadImg1"
            :multiple="true"
            :file-list="flfileList"
            :limit="1"
            accept=".mp3,.wav"
            :before-upload="flbeforeUpload"
            :on-remove="flhandleRemove"
            :on-success="flhandleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传音频文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import driver from "@/mixins/useDriver";
import {
  policy,
  userCard,
  getuser,
  updataUserCard,
  getCompany,
} from "../../api/login1";
import ossClient from "../../utils/aliyun.oss";
export default {
  mixins: [driver],
  data() {
    var phone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
    };
    var name = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      }
    };
    var egname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入英文名"));
      }
    };
    var position = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入职位"));
      }
    };
    var egposition = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入英文职位"));
      }
    };
    var email = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
    };

    return {
      userId: undefined,
      fileList: [],
      flfileList: [],
      dialogVisible: false,
      options: [
        {
          label: "吉叶生物",
          value: 1,
        },
      ],
      images: [],
      uploadConf: {
        region: null,
        accessKeyId: null,
        accessKeySecret: null,
        bucket: null,
        stsToken: null,
      },
      ruleForm: {
        name: "",
        egname: "",
        position: "",
        egposition: "",
        phone: "",
        email: "",
        addr: "",
        intro: "",
        qwID: "",
        value: "",
      },
      comList: [],
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
      fldataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
      rules: {
        name: [{ validator: name, trigger: "blur" }],
        egname: [{ validator: egname, trigger: "blur" }],
        position: [{ validator: position, trigger: "blur" }],
        egposition: [{ validator: egposition, trigger: "blur" }],
        phone: [{ validator: phone, trigger: "blur" }],
        email: [{ validator: email, trigger: "blur" }],
      },
    };
  },

  created() {
    console.log(this.$route.query.userId);
    this.userId = this.$route.query.userId;
    this.getCompanyList(100, 1);
    if (this.$route.query.userId !== undefined) {
      this.getUser(this.userId);
    }
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (c === "x"
          ? (Math.random() * 16) | 0
          : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    getCompanyList(limit, page) {
      getCompany(limit, page).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.comList = res.data.page.list;
          console.log(this.comList);
        }
      });
    },

    getUser(userId) {
      var that = this;
      getuser(userId).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          that.ruleForm.name = res.data.user.username;
          that.ruleForm.egname = res.data.user.englishName;
          that.ruleForm.phone = res.data.user.mobile;
          that.ruleForm.email = res.data.user.email;
          that.ruleForm.intro = res.data.user.introduce;

          that.ruleForm.position = res.data.user.position;
          that.ruleForm.egposition = res.data.user.englishPosition;
          that.ruleForm.value = Number(res.data.user.companyId);
          that.ruleForm.qwID = res.data.user.qiweiId;
          // that.fileList[0].url=res.data.user.header
          //    that.flfileList[0].url=res.data.user.voice
          if (res.data.user.header !== "") {
            that.fileList.push({
              url: res.data.user.header,
              name: res.data.user.header,
            });
          }
          if (res.data.user.voice !== "" && res.data.user.voice !== null) {
            that.flfileList.push({
              url: res.data.user.voice,
              name: res.data.user.voice,
            });
          }
          console.log(that.fileList);
        }
      });
    },
    submitForm(formName) {
      var that = this;
      // this.$refs[formName].validate((valid) => {
      //   console.log(valid)
      //   if (valid) {
      //     console.log("submit!");
      console.log(that.fileList[0].url);
      if (this.userId == undefined) {
        var count,count1
        if(that.flfileList[0]==undefined){
  count=""
        }else{
          count=that.flfileList[0].url
        }

           if(that.fileList[0]==undefined){
  count1=""
        }else{
          count1=that.fileList[0].url
        }
        userCard({
          username: that.ruleForm.name,
          englishName: that.ruleForm.egname,
          mobile: that.ruleForm.phone,
          email: that.ruleForm.email,
          introduce: that.ruleForm.intro,
          voice:count,
          position: that.ruleForm.position,
          englishPosition: that.ruleForm.egposition,
          companyId: that.ruleForm.value,
          qiweiId: that.ruleForm.qwID,
          header: count1,
        })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.$router.push("/icons/index");
            } else {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
             var count,count1
        if(that.flfileList[0]==undefined){
  count=""
        }else{
          count=that.flfileList[0].url
        }

           if(that.fileList[0]==undefined){
  count1=""
        }else{
          count1=that.fileList[0].url
        }
        updataUserCard({
          userId: that.userId,
          username: that.ruleForm.name,
          englishName: that.ruleForm.egname,
          mobile: that.ruleForm.phone,
          email: that.ruleForm.email,
          introduce: that.ruleForm.intro,
          voice: count,
          position: that.ruleForm.position,
          englishPosition: that.ruleForm.egposition,
          companyId: that.ruleForm.value,
          qiweiId: that.ruleForm.qwID,
          header: count1   ,
        })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.$router.push("/icons/index");
            } else {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      let _self = this;
      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            console.log("响应的数据", response.data.data.signature);
            _self.dataObj.policy = response.data.data.policy;
            _self.dataObj.signature = response.data.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.data.accessid;
            _self.dataObj.key =
              response.data.data.dir + _self.getUUID() + "_${filename}";
            _self.dataObj.dir = response.data.data.dir;
            _self.dataObj.host = response.data.data.host;
            console.log("响应的数据222。。。", _self.dataObj);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },

    flbeforeUpload(file) {
      let _self = this;
      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            console.log("响应的数据", response.data.data.signature);
            _self.fldataObj.policy = response.data.data.policy;
            _self.fldataObj.signature = response.data.data.signature;
            _self.fldataObj.ossaccessKeyId = response.data.data.accessid;
            _self.fldataObj.key =
              response.data.data.dir + _self.getUUID() + "_${filename}";
            _self.fldataObj.dir = response.data.data.dir;
            _self.fldataObj.host = response.data.data.host;
            console.log("响应的数据222。。。", _self.fldataObj);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },
    handleUploadSuccess(res, file) {
      console.log(res);

      this.fileList.push({
        name: file.name,
        url:
          this.dataObj.host +
          "/" +
          this.dataObj.key.replace("${filename}", file.name),
      });
      console.log(this.fileList);
    },
    flhandleUploadSuccess(res, file) {
      console.log(res);

      this.flfileList.push({
        name: file.name,
        url:
          this.fldataObj.host +
          "/" +
          this.fldataObj.key.replace("${filename}", file.name),
      });
      console.log(this.flfileList);
    },
    handleRemove() {
      //  for (var i in this.fileList) {

      //      this.fileList.splice(i, 1)
      //     }
      this.fileList = [];
      // this.$refs.uploadImg.clearFiles() //移除已上传图片
    },
    flhandleRemove() {
      //  for (var i in this.flfileList) {

      //      this.flfileList.splice(i, 1)
      //     }
      // this.$refs.uploadImg1.clearFiles() //移除已上传图片
      this.flfileList = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.driver {
  font-size: 14px;
  margin-bottom: 20px;
  width: 60%;
  height: 90%;
  overflow: auto;
}
</style>
