<template>
    <div class="history">
          <div class="head">
      <h1>吉叶用户管理</h1>
    </div>

          <el-table
      :data="hislist"
      style="width: 90%;margin:0 auto">
        <el-table-column
        prop="sn"
        label="卡号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="usage"
        label="总流量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="count"
        label="次数">
      </el-table-column>
          <el-table-column
        prop="voltage"
        label="电压">
      </el-table-column>
    </el-table>

    </div>
</template>
<script>
export default {
    data(){
        return{
hislist:[]
        }
    },
    created(options){
        console.log( this.$route.params)
    this. getHis()
         localStorage.setItem('key', this.$route.params.route)
    },
    methods:{
   getHis(){
      this.$get("https://www.jileaf.top/hm/history/" +this.$route.params.id )
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
             this.hislist=res.data
                console.log(res.code);
        
          } else {
            this.$message("查询失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
    },
    }
}
</script>

<style scoped>
.head {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
</style>