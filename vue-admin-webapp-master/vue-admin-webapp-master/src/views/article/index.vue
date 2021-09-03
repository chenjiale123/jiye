<template>
  <div class="article">
    <div class="el-container">
      <div class="el-aside" width="30%">
        <div class="title">
          <h2>干货分类</h2>
          <el-button type="primary" @click="addCate"> 添加分类</el-button>
        </div>

        <ul class="itemList">
          <li
            class="item"
            v-for="(item, index) in categoryList"
            :key="index"
            @click="click(index, item.id)"
            :class="{ active: current == index }"

          >
            <span>{{ item.name }} </span>

            <el-popover
              trigger="click"
              placement="top"
              :ref="refNamePopover + index"
            >
              <!-- <div>
                  <el-input type="textarea" :rows="5" maxlength="300" placeholder="请输入内容" v-model="scope.row.spaceAllocatePrice"></el-input>
              </div> -->
              <div style="text-align: left; margin-top: 20px">
                <el-button size="small" plain @click="cancelClick(index)"
                  >删除</el-button
                >
                <el-button type="primary" size="small" @click="sureClick(index)"
                  >编辑</el-button
                >
              </div>
              <!-- <el-button slot="reference" type="text">说明</el-button> -->
              <img
                class="more"
                slot="reference"
                src="../../assets/img/more.png"
                alt=""
              />
            </el-popover>
          </li>
        </ul>
      </div>
      <div class="el-main">
        <div class="tab-content">
          <div class="title">
            <h2>文章列表</h2>
            <el-button type="primary" @click="addArt"> 添加文章</el-button>
          </div>
          <div
            v-for="(item, index) in categoryList"
            :key="index"
            v-show="current == index"
          >
            <div class="item" v-for="(item1, index) in artList" :key="index">
              {{ item1.title }}

              <el-popover
                trigger="click"
                placement="top"
                :ref="refNamePopover1 + index"
              >
                <!-- <div>
                  <el-input type="textarea" :rows="5" maxlength="300" placeholder="请输入内容" v-model="scope.row.spaceAllocatePrice"></el-input>
              </div> -->
                <div style="text-align: left; margin-top: 20px">
                  <el-button size="small" plain @click="cancelClick1(index)"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    size="small"
                    @click="sureClick1(index)"
                    >编辑</el-button
                  >
                </div>
                <!-- <el-button slot="reference" type="text">说明</el-button> -->
                <img
                  class="more"
                  slot="reference"
                  src="../../assets/img/more.png"
                  alt=""
                />
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="分类编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confim">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  category,
  article,
  addCategory,
  updateCategory,
  delCategory,
  delItem
} from "../../api/login1";
export default {
  data() {
    return {
      id:1,
      refNamePopover: "popover-",
      refNamePopover1: "popover1-",
      categoryList: [],
      artList: [],
      current: 0,
      dialogFormVisible: false,
      form: {
        name: "",
        id: "",
      },
      // visible2: false,
    };
  },
  created() {
    this.getCategory();
    this.click(0, 1);
  },
  methods: {
    getCategory() {
      category().then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.categoryList = res.data.page.list;
        }
      });
    },
    addCate() {
      this.dialogFormVisible = true;
    },
    click(index, id) {
      this.current = index;
      article(id).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.artList = res.data.list;
          this.id=id
        }
      });
    },
    confim() {
      if (this.form.id == "") {
        addCategory({
          name: this.form.name,
          sort: 0,
        }).then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.dialogFormVisible = false;
            this.getCategory();
          }
        });
      } else {
        updateCategory({
          id: this.form.id,
          name: this.form.name,
        }).then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
            this.dialogFormVisible = false;
            this.getCategory();
          }
        });
      }
    },
    addArt() {
    
         this.$router.push("/addArticle?id=" + Number(this.id) );
      
     
    },
    cancelClick(id) {
      var that=this
    this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(that.categoryList[id].id)
          delItem(
            that.categoryList[id].id,
          ).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
                     that.getCategory()
            }else{
               this.$message({
                type: "success",
                message: res.data.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sureClick(id) {
      // 可以在这里执行删除数据的回调操作.......删除操作......
      let refName = this.refNamePopover + id;

      // 通过操作dom树，关闭popover
      this.$refs[refName][0].doClose();
      this.dialogFormVisible = true;
      this.form.name = this.categoryList[id].name;
      this.form.id = this.categoryList[id].id;
    },
    cancelClick1(id) {
           var that=this
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCategory(
            that.artList[id].id,
          ).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
           that.click(that.current, that.categoryList[that.current].id);
            }else{
               this.$message({
                type: "success",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sureClick1(id) {
      // 可以在这里执行删除数据的回调操作.......删除操作......
      let refName = this.refNamePopover1 + id;

      // 通过操作dom树，关闭popover
      this.$refs[refName][0].doClose();

      this.$router.push("../addArticle/index?id=" + this.artList[id].id+'&img='+this.artList[id].image+"&title="+this.artList[id].title);
    },
  },
};
</script>
<style lang="scss" scoped>
.article {
  width: 92%;
  height: 100%;
}
.active {
  background: #409eff;
  color: #fff;
}
.el-container {
  width: 100%;
  height: 100%;
  background: rgb(231, 231, 231);
  display: flex;
  justify-content: space-between;
}
.el-aside {
  background: #fff;

  height: 100%;
  width: 30%;
  border-right: 3px solid #eee;
  padding: 20px;
  box-sizing: border-box;
}
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h2 {
  font-weight: bold;
}
.itemList {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 20px;
}
.item {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 40px;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more {
  width: 14px;
  display: block;
}

.el-main {
  background: #fff;

  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>