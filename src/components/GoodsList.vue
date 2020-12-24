<template>
  <div>
    <div >

      <el-row>
        <el-table :data="goodsList" style="width: 100%">
          <el-table-column label="商品编号" prop="goodsid" width="50px">
          </el-table-column>

          <el-table-column label="名称" prop="goodsname" width="200px">
          </el-table-column>

          <el-table-column label="单价" prop="goodsprice" width="100px">
          </el-table-column>

          <el-table-column label="库存数量" prop="goodsnumber" width="100px">
          </el-table-column>

          <el-table-column label="图片">
            <template slot-scope="scope">
              <div>{{ scope.row }}</div>
            </template>
          </el-table-column>

          <el-table-column label="购买" >
            <template slot-scope="scope">
              <div v-if="scope.row.goodsnumber>0">

                  <el-input-number v-model="num[scope.row.goodsid%pagesize]" :min="1" :max="scope.row.goodsnumber" label="购买数量"></el-input-number>
                  <el-button type="primary" v-on:click="addRecord(scope.row.goodsid)">购买</el-button>

              </div>
              <div v-if="scope.row.goodsnumber===0">
                商品库存不足
              </div>
            </template>
          </el-table-column>

          <!--   管理员编号为1 -->
          <el-table-column label="增加库存" v-if="userid===1">
            <template slot-scope="scope">
              <div >

                <el-input-number v-model="addGoodsnum[scope.row.goodsid%pagesize]" :min="1" :max="10000" label="库存增加数量"></el-input-number>
                <el-button type="primary" v-on:click="addGoodsNumber(scope.row.goodsid)">执行增加</el-button>

              </div>
            </template>
          </el-table-column>

        </el-table>

      </el-row>
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
  name: "GoodsList",
  data(){
    return {
      userid:1,
      goodsList:[],
      total:0,
      pagenum:1,
      pagesize:2,
      num:[0,0,0,0,0],////个数要大于pagesize, num[i]  对应goodsid % pagesize ==i 这种商品的购买数
      addGoodsnum:[0,0,0,0,0]///个数要大于pagesize, num[i]  对应goodsid % pagesize ==i 这种商品的库存增加数
    }
  },
  created() {
    //this.userid=sessionStorage.getItem("userid");
    this.getGoodsList();
  },
  methods: {
    getGoodsList: function () {
      const url = 'http://localhost:8080/';
      //const url = 'http://106.15.234.251:8081/';
      this.$axios.get(url + 'getGoods',
          {params: {pagenum:this.pagenum,pagesize:this.pagesize}})
          .then((response) => {
            //console.log(response);
            const data = response.data;
            if (data.code === 200) {
              this.goodsList = data.data.goodList;
              this.total = data.data.total;

              //这种方式有点小卡
              // for (let i = 0; i < this.goodsList.length; i++) {
              //   this.goodsList[i].buynum = 0;//要购买的数量
              //   this.goodsList[i].addGoodsNumber = 0;//要增加的库存数量
              // }


              //console.log(this.problemList);
            } else {
              console.log(data.msg);
              alert(data.msg);
            }
          })
    },
    addRecord: function (goodsid) {
      //alert("buy");
      const url='http://localhost:8080/';
      //const url = 'http://106.15.234.251:8081/';
      this.$axios.post(url + 'addRecord',
          {"userid":this.userid,"goodsid":goodsid,"purchasenumber":this.addGoodsnum[goodsid%this.pagenum]})
          .then((response) => {
            //console.log(response);
            const data = response.data;
            if(data.code === 200){
              alert(data.msg);

              location="/records";
              //console.log(this.problemList);
            }
            else{

              alert(data.msg);

            }
          })

    },
    addGoodsNumber: function (goodsid) {
      console.log("addNumber");
      const url='http://localhost:8080/';
      //const url = 'http://106.15.234.251:8081/';
      this.$axios.get(url + 'addGoodsNumber',
          {params:{"goodsid":goodsid,"goodsnumber":this.num[goodsid%this.pagenum]}})
          .then((response) => {
            //console.log(response);
            const data = response.data;
            if(data.code === 200){
              alert(data.msg);

              location="/goods";
              //console.log(this.problemList);
            }
            else{

              alert(data.msg);

            }
          })

    },

    handleCurrentChange:function(newnum) {
      this.pagenum = newnum;
      console.log(this.pagenum);
      this.getGoodsList();
    },
    toAddGoods:function (){
      location="/goods/addGoods";
    }




  }

}
</script>

<style scoped>

</style>