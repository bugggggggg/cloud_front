<template>
  <div class="bloglist_container">
    <div>


      <el-timeline>
        <el-timeline-item :timestamp="record.purchasetime" placement="top" v-for="record in recordList" :key="record.purchaseid">
          <el-card>
            <p>用户编号:{{record.userid}}</p>
            <p>用户名:{{record.username}}</p>
            <p>商品编号:{{record.goodsid}}</p>
            <P>商品名:{{record.goodsname}}</P>
            <p>购买数量:{{record.purchasenumber}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

    </div>

    <!--分页-->
    <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total" :page-size="pagesize" :current-page="pagenum">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "RecordsList",
  data(){
    return {
      recordList:[],
      userList:[],
      goodsList:[],
      total:0,
      pagenum:1,
      pagesize:2,
    }
  },
  created() {
    this.getRecordList();
  },
  methods:{
    getRecordList:function() {
      const url='http://localhost:8080/';
      //const url = 'http://106.15.234.251:8081/';
      this.$axios.get(url + 'getRecords',
          { params: { pagenum:this.pagenum,pagesize:this.pagesize }})
          .then((response) => {
            //console.log(response);
            const data = response.data;
            if(data.code === 200){
              this.recordList = data.data.recordList;
              this.total = data.data.total;

              //console.log(this.problemList);
            }
            else{
              console.log(data.msg);
              alert(data.msg);
            }
          })
    },

    handleCurrentChange:function(newnum) {
      this.pagenum = newnum;
      console.log(this.pagenum);
      this.getRecordList();
    }
  }
}
</script>

<style scoped>

</style>