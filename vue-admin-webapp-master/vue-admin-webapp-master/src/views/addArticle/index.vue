<template>
  <div class="add">
    <el-card>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面上传" prop="fm">
          <el-upload
            action="https://jileaf.oss-cn-hangzhou.aliyuncs.com"
            :data="fmdataObj"
            ref="uploadImg3"
            :multiple="true"
            :file-list="fmfileList"
            :limit="1"
            accept=".png,.jpg,.jpeg"
            :before-upload="fmbeforeUpload"
            :on-remove="fmhandleRemove"
            :on-success="fmhandleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传封面图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="发布时间" prop="title">
          <el-date-picker
            value-format="yyyy-MM-dd  HH:mm:ss"
            v-model="ruleForm.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="视频上传" prop="mp4">
          <el-upload
            action="https://jileaf.oss-cn-hangzhou.aliyuncs.com"
            :data="fldataObj"
            ref="uploadImg1"
            :multiple="true"
            :file-list="flfileList"
            :limit="1"
            accept=".mp4,.avi,.ogg,.flv,.rmvb"
            :before-upload="flbeforeUpload"
            :on-remove="flhandleRemove"
            :on-success="flhandleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传视频文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="图文上传" prop="imgtext">
          <quill-editor
            id="myQuillEditorId"
            ref="myQuillEditor"
            v-model="ruleForm.editeContent"
            :options="editorOption"
            @change="handelEditorChange($event)"
            @ready="onEditorReady($event)"
          >
          </quill-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="上传图片" :visible.sync="dialogTableVisible">
      <el-upload
        action="https://jileaf.oss-cn-hangzhou.aliyuncs.com"
        :data="fldataObj1"
        ref="uploadImg2"
        :multiple="true"
        :file-list="flfileList1"
        :limit="1"
        accept=".png,.jpg,.jpeg,.gif"
        :before-upload="flbeforeUpload1"
        :on-remove="flhandleRemove1"
        :on-success="flhandleUploadSuccess1"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传图片</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { policy, addContent, cardDetail, updataCard } from "../../api/login1";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
//自定义编辑器配置
const toolbarOptions = [
  // ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  // ["blockquote", "code-block"], //引用、代码块儿
  // [{ header: 1 }, { header: 2 }], //标题，键值对的形式；1、2表示字体大小
  // [{ list: "ordered" }, { list: "bullet" }], //列表
  // [{ script: "sub" }, { script: "super" }], //上下标
  // [{ indent: "-1" }, { indent: "+1" }], //缩进
  // [{ direction: "rtl" }], //文本方向
  // [{ size: ["small", false, "large", "huge"] }], //字体大小
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  // [{ color: [] }, { background: [] }], //字体颜色，字体背景颜色
  // [{ font: [] }], //字体
  // [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ["image"], //上传图片、上传视频(video)、超链接(link)
];
export default {
  data() {
    return {
      img: "",
      id: undefined,
      content: "",
      title: "",
      imageUrl: "",
      dialogTableVisible: false,
      editorOption: {
        modules: {
          clipboard: {
            // 粘贴版，处理粘贴时候的自带样式
            matchers: [[Node.ELEMENT_NODE, this.HandleCustomMatcher]],
          },
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: this.hand,
              clean: this.changeline,
            },
          },
        },
        placeholder: "",
      },

      ruleForm: {
        ruleForm: "",
        title: "",
        time: "",
        editeContent: "",
      },
      fldataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
      fmdataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
      flfileList: [],
      fmfileList: [],
      fldataObj1: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
      flfileList1: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        fm: [{ required: true, message: "请选择封面", trigger: "blur" }],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  components: {
    quillEditor,
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  created() {
    this.id = Number(this.$route.query.id);
    this.img = this.$route.query.img;
    this.title = this.$route.query.title;
    console.log(this.title);
    this.getDetail(this.id);
  },

  methods: {
    getDetail(id) {
      cardDetail(id).then((res) => {
        console.log(res);
        this.ruleForm.title = this.title;

        this.ruleForm.time = res.data.detail[0].createTime;

        this.ruleForm.editeContent = res.data.detail[0].resource.replace(
          /0xff/g,
          "|<br/></br>"
        );

        if (this.img !== "") {
          this.fmfileList.push({
            url: this.img,
            name: this.img,
          });
        }
        if (
          res.data.detail[0].videoUrl !== "" &&
          res.data.detail[0].videoUrl !== null
        ) {
          this.flfileList.push({
            url: res.data.detail[0].videoUrl,
            name: res.data.detail[0].videoUrl,
          });
        }
      });
    },
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (c === "x"
          ? (Math.random() * 16) | 0
          : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    hand() {
      console.log(this.dialogTableVisible);
      this.dialogTableVisible = true;
    },
    changeline() {
      let quill = this.$refs.myQuillEditor.quill;

      var range = quill.getSelection();
      console.log(range.index);
      quill.insertText(range.index, "|");
    },
    submit() {
      var item = this.ruleForm.editeContent.split("|");
      for (let i in item) {
        item[i] = item[i].replace(/<p>/g, "");
        item[i] = item[i].replace(/<\/p>/g, "");
        item[i] = item[i].replace(/&nbsp;/g, "");
        item[i] = item[i].replace(/<br>/g, "");
      }
      var item1 = item.filter((item) => {
        /* fliter 返回结果是true的*/
        return item;
      });
      console.log(item1);
      console.log(this.ruleForm);

      var con, com;
      console.log(this.flfileList);
      if (this.flfileList.length == 0) {
        con = "";
      } else {
        console.log(this.flfileList);
        con = this.flfileList[0].url;
      }

      if (this.fmfileList.length == 0) {
        com = "";
      } else {
        com = this.fmfileList[0].url;
      }
 if (this.fmfileList.length !== 0) {
      if (this.title == undefined) {
       
          console.log(this.fmfileList);

          addContent({
            categoryId: this.id,
            title: this.ruleForm.title,
            videoUrl: con,
            image: com,
            content: item1,
            createTime: this.ruleForm.time,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.$router.push("/article/index");
            } else {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            }
          });
        } else {
          updataCard({
            itemId: this.id,
            title: this.ruleForm.title,
            videoUrl: con,
            image: com,
            content: item1,
            createTime: this.ruleForm.time,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "更新成功!",
              });
              this.$router.push("/article/index");
            } else {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请上传封面!",
        });
      }
    },

    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    handelEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)

      this.ruleForm.editeContent = html;
    },
    HandleCustomMatcher(node, Delta) {
      // 文字、图片等，从别处复制而来，清除自带样式，转为纯文本
      let ops = [];
      Delta.ops.forEach((op) => {
        if (op.insert && typeof op.insert === "string") {
          ops.push({
            insert: op.insert,
          });
        }
      });
      Delta.ops = ops;
      return Delta;
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
    flhandleRemove() {
      //  for (var i in this.flfileList) {

      //      this.flfileList.splice(i, 1)
      //     }
      // this.$refs.uploadImg1.clearFiles() //移除已上传图片
      this.flfileList = [];
    },

    flbeforeUpload1(file) {
      let _self = this;
      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            console.log("响应的数据", response.data.data.signature);
            _self.fldataObj1.policy = response.data.data.policy;
            _self.fldataObj1.signature = response.data.data.signature;
            _self.fldataObj1.ossaccessKeyId = response.data.data.accessid;
            _self.fldataObj1.key =
              response.data.data.dir + _self.getUUID() + "_${filename}";
            _self.fldataObj1.dir = response.data.data.dir;
            _self.fldataObj1.host = response.data.data.host;
            console.log("响应的数据222。。。", _self.fldataObj1);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },

    flhandleUploadSuccess1(res, file) {
      console.log(res);

      this.flfileList1.push({
        name: file.name,
        url:
          this.fldataObj1.host +
          "/" +
          this.fldataObj1.key.replace("${filename}", file.name),
      });

      this.ruleForm.editeContent =
        this.ruleForm.editeContent + "|" + this.flfileList1[0].url + "|";
      let quill = this.$refs.myQuillEditor.quill;
      let length = this.$refs.myQuillEditor.quill.selection.savedRange.index;

      quill.insertEmbed(length, "|" + this.flfileList1[0].url + "|");
      quill.setSelection(length);
      this.dialogTableVisible = false;
      this.flfileList1 = [];

      this.ruleForm.editeContent = this.ruleForm.editeContent.replace(
        "/<br>/g",
        "|"
      );
      console.log(this.ruleForm.editeContent);
    },
    flhandleRemove1() {
      //  for (var i in this.flfileList) {

      //      this.flfileList.splice(i, 1)
      //     }
      // this.$refs.uploadImg1.clearFiles() //移除已上传图片
      this.flfileList1 = [];
    },
    fmbeforeUpload(file) {
      let _self = this;

      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            console.log("响应的数据", response.data.data.signature);
            _self.fmdataObj.policy = response.data.data.policy;
            _self.fmdataObj.signature = response.data.data.signature;
            _self.fmdataObj.ossaccessKeyId = response.data.data.accessid;
            _self.fmdataObj.key =
              response.data.data.dir + _self.getUUID() + "_${filename}";
            _self.fmdataObj.dir = response.data.data.dir;
            _self.fmdataObj.host = response.data.data.host;
            console.log("响应的数据222。。。", _self.fmdataObj);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },

    fmhandleUploadSuccess(res, file) {
      console.log(res);

      this.fmfileList.push({
        name: file.name,
        url:
          this.fmdataObj.host +
          "/" +
          this.fmdataObj.key.replace("${filename}", file.name),
      });
      console.log(this.fmfileList);
    },
    fmhandleRemove() {
      //  for (var i in this.flfileList) {

      //      this.flfileList.splice(i, 1)
      //     }
      // this.$refs.uploadImg1.clearFiles() //移除已上传图片
      this.fmfileList = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.add {
  font-size: 14px;
  margin-bottom: 20px;
  width: 92%;
  height: 90%;
  overflow: auto;
}
</style>
