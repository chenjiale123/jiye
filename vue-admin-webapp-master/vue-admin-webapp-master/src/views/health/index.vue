<template>
<div class="form">
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="单人录入" name="first">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>

      </el-form-item>
        <el-form-item label="昵称" prop="nickname">
    <el-input v-model="ruleForm.nickname"></el-input>

      </el-form-item>
    <el-form-item label="幼儿园名字" prop="schoolName  ">
    <el-input v-model="ruleForm.schoolName"></el-input>
  </el-form-item>
  </el-form-item>
    <el-form-item label="班级" prop="className">
    <el-input v-model="ruleForm.className"></el-input>
  </el-form-item>
   <el-form-item label="身份证号" prop="idCardNo">
    <el-input v-model="ruleForm.idCardNo"></el-input>
  </el-form-item>
    <el-form-item label="卡号" prop="cardNumber">
    <el-input v-model="ruleForm.cardNumber"></el-input>
  </el-form-item>
      <el-form-item label="学号" prop="studentNo">
    <el-input v-model="ruleForm.studentNo"></el-input>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </el-tab-pane>
    <el-tab-pane label="批量导入" name="second">
     <el-upload
	       class="upload"
	       action="" 
	       :multiple="false"   
	       :show-file-list="true " 
	       accept=".xls , .xlsx"  
	       :http-request="httpRequest" 
	       >
	       <el-button size="small" type="primary">批量导入</el-button>
	     </el-upload>

    </el-tab-pane>

  </el-tabs>

</div>
</template>

<script>
import XLSX from "xlsx";
import { getUploadAll } from "../../api/login1";
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        name: "",
        className: "",
        cardNumber: "",
        idCardNo: "",
        studentNo: "",
       
        nickname: "",
        schoolName: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        schoolName: [
          { required: true, message: "请输入学校", trigger: "blur" },
        ],
        className: [{ required: true, message: "请输入班级", trigger: "blur" }],
        cardNumber: [
          { required: true, message: "请输入身份证", trigger: "blur" },
        ],
        idCardNo: [{ required: true, message: "请输入卡号", trigger: "blur" }],
        studentNo: [
          { required: true, message: "请输入学号", trigger: "blur" },
        ],
 
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         getUploadAll([this.ruleForm]).then((res) => {
            console.log(res);
         
          });

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    httpRequest(e) {
      let file = e.file; // 文件信息

      if (!file) {
        // 没有文件
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      const fileReader = new FileReader();
      // fileReader.readAsBinaryString(e.file)
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary", // 以字符编码的方式解析
          });
          const exlname = workbook.SheetNames[0]; // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); //生成json表格内容
          console.log(exlname);
          // 将 JSON 数据挂到 data 里
          this.tableData = exl;
          console.log(this.tableData);
// 中转英
          // const newArr = ws1.map(item => {
          //   return {
          //     item1: item['属性名称'],
          //     item2: item['属性类型'],
          //     item3: item['属性标识'],
          //     item4: item['唯一标识'],
          //     item5: item['必填'],
          //     item6: item['显示属性'],
          //     item7: item['是否多值'],
          //     item8: item['默认值']
          //   }
          // })
             const newarr=this.tableData.map(item=>{
              return{
cardNumber:String(item.cardNumber)  ,
className: String(item.className)  ,
idCardNo: String(item.idCardNo)  ,
name: String(item.name)  ,
nickname: String(item.nickname)  ,
schoolName: String(item.schoolName)  ,
studentNo: String(item.studentNo)  ,
              }
            })
            console.log(newarr)

          getUploadAll(newarr).then((res) => {
            console.log(res);
         
          });
          // document.getElementsByName('file')[0].value = ''
          // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          console.log("出错了：：");
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
  },
};
</script>
<style scoped>
.form {
  width: 50%;
  padding: 20px;
  background-color: #fff !important;
  margin-top: 20px;
  margin-left: 20px;
}
</style>