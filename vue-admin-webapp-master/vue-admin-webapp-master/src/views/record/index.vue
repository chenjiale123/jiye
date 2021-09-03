<template>
  <div class="mod-config">
  <el-button type="primary" @click="exportTable">
    导出表格
  </el-button>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
  
      <el-table-column
        prop="staffName"
        header-align="center"
        align="center"
        label="受访者姓名">
      </el-table-column>
           <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="访问者姓名">
      </el-table-column>
             <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="访问者手机号">
      </el-table-column>
      <el-table-column
        prop="timestamp"
        header-align="center"
        align="center"
        label="访问时间">
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
import {request3}  from "../../api/index1";
import  baseURL from "../../api/index1";
import {recordHistory} from '../../api/login1'
  export default {
    data () {
      return {
          id:undefined,
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
         this.id=Number(this.$route.query.userId);
      this.getRecodeList()
     
    },
    methods: {
      // 导出表格

      exportTable(){
        console.log(baseURL+this.id)

window.open(baseURL+ '/ecard/user/export/'+this.id,'_blank') 
      },
      // 获取数据列表
      getRecodeList () {
     
        this.dataListLoading = true

   recordHistory({

  userId : this.id,
   limit: this.pageSize,
    page:  this.pageIndex
   
   }
   )
   .then(res=>{
     console.log(res)
     if(res.data.code==200){
       this.dataList = res.data.data.list
       this.totalPage = res.data.data.totalCount
     }
      this.dataListLoading = false
   })

      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getRecodeList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getRecodeList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
 
    
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