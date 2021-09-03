<template>
    <div class="role">

            <el-form ref="form3" :model="form3" label-width="80px">
          <el-form-item label="公司名称" prop="company">
            <el-input v-model="form3.company" type="string"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="form3.address" type="string"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit3('form3')"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
return{
         form3: {
        company: "",
        address: "",
      },
}
    },
    methods:{
            onSubmit3(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post("https://www.jileaf.top:8282/ecard/company/save", {
            name: this.form3.company,
            address: this.form3.address,
          })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message("添加成功");

                this.$refs["form3"].resetFields();
              } else {
                this.$message(res.msg);

                this.$refs["form3"].resetFields();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message("添加失败");
              this.$refs["form3"].resetFields();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    }
}
</script>
<style lang="scss" scoped>

</style>