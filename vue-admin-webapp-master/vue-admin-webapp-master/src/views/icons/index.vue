<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle('')">新增</el-button>
        <!-- <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="englishName"
        header-align="center"
        align="center"
        label="英文名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="englishPosition"
        header-align="center"
        align="center"
        label="英文职位">
      </el-table-column>
      <el-table-column
        prop="header"
        header-align="center"
        align="center"
        label="头像">

        <template slot-scope="scope">
          <img :src="scope.row.header" style="width:70px" alt="">

        </template>
      </el-table-column>
    
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
              <el-button type="text" size="small" @click="findRecord(scope.row.userId)">查看浏览记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
  </div>
</template>

<script>

import {userList,delCard} from '../../api/login1'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
  
    created () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
     
        this.dataListLoading = true
   userList(
    
     this.pageSize,
     this.pageIndex
   
   )
   .then(res=>{
     console.log(res)
     if(res.data.code==200){
       this.dataList = res.data.page.list
       this.totalPage = res.data.page.totalCount
     }
      this.dataListLoading = false
   })

      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        if(id==""){
    this.$router.push('/driver/index')
        }else{
    this.$router.push('/driver/index?userId='+id)
        }

      
      },
      // 查看浏览记录
      findRecord(id){
    this.$router.push('/record/index?userId='+id)
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? id : this.dataListSelections.map(item => {
          return item.id
        })
        var that=this
        this.$confirm(`确定删除`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCard(
            id
          )
          .then(res=>{
            console.log(res)
            if(res.data.code==200){
                 this.$message({
                type: "success",
                message: "删除成功!",
              });
              that.getDataList()
            }else{
                  this.$message({
                type: "success",
                message: res.data.msg,
              });
            }
          })
        
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.mod-config {
  font-size: 14px;
  margin-bottom: 20px;
  width: 100%;
  height: 90%;
  overflow: auto;
}
</style>