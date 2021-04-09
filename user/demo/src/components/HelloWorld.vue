<template>
  <div class="hello">
    <div class="head">
      <h1>吉叶用户管理</h1>
    </div>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="second">
        <el-card class="box-card">
          <el-table :data="dataList" style="width: 100%; margin: 0 auto">
            <el-table-column label="账号" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>昵称: {{ scope.row.nickname }}</p>
                  <p>负责区域: {{ scope.row.name }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column label="性别" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px" v-if="scope.row.gender == 1"
                  >男</span
                >
                <span style="margin-left: 10px" v-if="scope.row.gender == 0"
                  >女</span
                >
              </template>
            </el-table-column>

            <el-table-column label="负责区域" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="状态" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px" v-if="scope.row.status == 0"
                  >禁用</span
                >
                <span style="margin-left: 10px" v-if="scope.row.status == 1"
                  >启用</span
                >
              </template>
            </el-table-column> -->
            <el-table-column label="类型" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px" v-if="scope.row.type == 2"
                  >省级</span
                >
                <span style="margin-left: 10px" v-if="scope.row.type == 3"
                  >市级</span
                >
                <span style="margin-left: 10px" v-if="scope.row.type == 4"
                  >区级</span
                >
                <span style="margin-left: 10px" v-if="scope.row.type == 5"
                  >校级</span
                >
                <span style="margin-left: 10px" v-if="scope.row.type == 6"
                  >个人级</span
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-if="scope.row.type !== 0"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  v-if="scope.row.type == 0"
                  >删除</el-button
                >

                <el-button
                  size="mini"
                  type="primary"
                  @click="typeUser(scope.$index, scope.row)"
                  v-if="scope.row.type == 0"
                  >分配角色</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="query.currentPage"
            :page-size="query.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="query.recordCount"
          >
          </el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="用户添加" name="first">
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户账号" prop="accont">
              <el-input
                v-model="form.accont"
                type="number"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="psd">
              <el-input v-model="form.psd"></el-input>
            </el-form-item>

            <el-form-item label="用户性别" prop="value4">
              <el-radio-group v-model="form.value4">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="用户备注" prop="desc">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')"
                >立即创建</el-button
              >
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="用户角色" name="third">
        <el-form ref="form1" :model="form1" label-width="80px" :rules="rules1">
          <el-form-item label="用户账号" prop="accont1">
            <el-input
              v-model="form1.accont1"
              type="number"
              maxlength="11"
            ></el-input>
          </el-form-item>

          <el-form-item label="用户类型" prop="type">
            <el-radio-group v-model="form1.type" @change="changeType">
              <el-radio :label="2">省级</el-radio>
              <el-radio :label="3">市级</el-radio>
              <el-radio :label="4">区级</el-radio>
              <el-radio :label="5">校级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="省-市-区" v-if="hidden == true">
            <el-select
              v-model="form1.value1"
              placeholder="请选择省"
              @change="change1"
            >
              <el-option
                v-for="item in options1"
                :key="item.adcode"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>

            <el-select
              v-if="show >= 3"
              v-model="form1.value2"
              placeholder="请选择市"
              @change="change2"
            >
              <el-option
                v-for="item in options2"
                :key="item.adcode"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>

            <el-select
              v-model="form1.value3"
              placeholder="请选择区"
              v-if="show >= 4"
            >
              <el-option
                v-for="item in options3"
                :key="item.adcode"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit1('form1')"
              >立即添加</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改用户" name="fourth">
        <el-form ref="form2" :model="form2" label-width="80px">
          <el-form-item label="旧用户账号" prop="oldUsername">
            <el-input
              v-model="form2.oldUsername"
              type="number"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="新用户账号" prop="newUsername">
            <el-input
              v-model="form2.newUsername"
              type="number"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2('form2')"
              >修改</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="添加公司" name="fifth">
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
      </el-tab-pane>

      <el-tab-pane label="解绑设备" name="sixth">
        <el-form ref="form5" :model="form5" label-width="80px">
          <!-- <el-form-item label="账号" prop="username">
            <el-input v-model="form5.username" type="string"></el-input>
          </el-form-item> -->
          <el-form-item label="设备号" prop="sdrid">
            <el-input v-model="form5.sdrid" type="string"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit4()">查询</el-button>
            <el-button type="primary" @click="onSubmit5('form5')"
              >解绑</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  data() {
    return {
      show: 0,
      hidden: false,
      dataList: [],
      query: {
        pageNum: 1,
        pageSize: 10,
        currentPage: 1,
        recordCount: 1150,
      },
      totalElementsData: 0,
      activeName: "second",
      form: {
        accont: "",
        nickname: "",
        psd: "",

        value4: "",
        sex: "",
        desc: "",
      },
      form1: {
        type: "",
        value1: "",
        value2: "",
        value3: "",
        schoolname: "",
      },
      form2: {
        oldUsername: "",
        newUsername: "",
      },
      form3: {
        company: "",
        address: "",
      },
      form5: {
        username: "",
        sdrid: "",
      },
      form4: {
        username: "",
      },
      rules1: {},
      rules: {
        accont: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
        psd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],

        value4: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
      },
      options1: [],
      options2: [],
      options3: [],
      tableData: [],
      options4: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "0",
          label: "女",
        },
      ],
    };
  },
  created() {
    this.getpro();
    this.getuser();
  },
  methods: {
    changeType(e) {
      console.log(e);
      this.hidden = true;
      var that = this;
      this.$nextTick(() => {
        that.show = e;
      });
    },
    onPageChange(page) {
      this.pageInfo.page = page;
      this.fetchData();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.activeName = "fourth";
      this.form2.oldUsername = row.username;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$post("http://192.168.10.18:8080/user/manager/delete", {
        username: row.username,
      })
        .then((res) => {
          console.log(res);

          if (res.code == 200) {
            this.$message("删除成功");

            this.getuser();
          } else {
            this.$message(res.msg);
            this.getuser();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message("删除失败");
        });
    },
    typeUser(index, row) {
      console.log(index, row);
      this.activeName = "third";
      this.form1.accont1 = row.username;
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post("http://192.168.10.18:8080/user/manager/register", {
            username: this.form.accont,
            nickname: this.form.nickname,
            password: this.form.psd,

            // type: this.form.type,
            gender: this.form.value4,
            remark: this.form.desc,
          })
            .then((res) => {
              console.log(res);

              if (res.code == 200) {
                this.$message("注册成功");
                this.getpro();
                this.getuser();
                this.$refs["form"].resetFields();
              } else {
                this.$message(res.msg);
                this.getuser();
                this.getpro();

                this.$refs["form"].resetFields();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message("注册失败");
              this.$refs["form"].resetFields();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    onSubmit1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post("http://192.168.10.18:8080/user/manager/dispatchRole", {
            username: this.form1.accont1,
            province: this.form1.value1,
            city: this.form1.value2,
            district: this.form1.value3,
            type: this.form1.type,
          })
            .then((res) => {
              console.log(res);

              if (res.code == 200) {
                this.$message("添加成功");
                this.activeName = "second";
                this.getuser();
                this.$refs["form1"].resetFields();
              } else {
                this.$message(res.msg);
                this.getuser();

                this.$refs["form1"].resetFields();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message("添加失败");
              this.$refs["form1"].resetFields();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    onSubmit2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post("http://192.168.10.18:8080/user/manager/update", {
            oldUsername: this.form2.oldUsername,
            newUsername: this.form2.newUsername,
            domain: "",
          })
            .then((res) => {
              console.log(res);

              if (res.code == 200) {
                this.$message("修改成功");
                this.activeName = "second";
                this.getuser();
                this.$refs["form2"].resetFields();
              } else {
                this.$message(res.msg);
                this.getuser();

                this.$refs["form2"].resetFields();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message("修改失败");
              this.$refs["form2"].resetFields();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit3(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post("http://192.168.10.18:8080/wxapp/company", {
            name: this.form3.company,
            address: this.form3.address,
          })
            .then((res) => {
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
    onSubmit4() {
      console.log(this.form5);
      this.$get("http://192.168.10.18:8080/wxapp/qb/" + this.form5.sdrid)
        .then((res) => {
          console.log(res);
          if (res.data !== null) {
            this.$message("已绑定" + res.data);
          } else {
            this.$message("未绑定学校");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit5(formName) {
      this.$get("http://192.168.10.18:8080/wxapp/unbind/" + this.form5.sdrid)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message("解绑成功");
            this.$refs["form5"].resetFields();
          } else {
            this.$message("解绑失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change1(e) {
      console.log(e);

      this.$get(
        "https://restapi.amap.com/v3/config/district?keywords=" +
          e +
          "&key=fc99f5ab80dd95d76bcbd32579c47a35"
      ).then((res) => {
        console.log(res);
        this.options2 = res.districts[0].districts;
      });
    },
    change2(e) {
      console.log(e);

      this.$get(
        "https://restapi.amap.com/v3/config/district?keywords=" +
          e +
          "&key=fc99f5ab80dd95d76bcbd32579c47a35"
      ).then((res) => {
        console.log(res);
        this.options3 = res.districts[0].districts;
      });
    },
    getpro() {
      this.$get(
        "https://restapi.amap.com/v3/config/district?keywords=中国&key=fc99f5ab80dd95d76bcbd32579c47a35"
      ).then((res) => {
        console.log(res);
        this.options1 = res.districts[0].districts;
      });
    },

    getuser() {
      this.$get(
        "http://192.168.10.18:8080/user/manager/page/" +
          this.query.pageNum +
          "/" +
          this.query.pageSize
      ).then((res) => {
        this.dataList = res.data.list;
        console.log(res);
        this.query.recordCount = res.data.total;
        this.query.pageSize = res.data.pageSize;
        this.query.currentPage = res.data.pageNum;
      });
    },
    handleCurrentChange(pageNum) {
      this.query.pageNum = pageNum;
      this.getuser();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}

h1 {
}
.box-card {
  width: 100%;
  margin: 0 auto;
}
</style>
