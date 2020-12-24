<template>
  <div>
    <div>
      <el-card>
        <el-form >
          <el-form-item label="商品名" >
            <el-input v-model="goods.goodsname"></el-input>
          </el-form-item>

          <el-form-item label="商品单价" >
            <el-input-number  v-model="goods.goodsprice" :min="1" :max="10000" ></el-input-number>
          </el-form-item>

          <el-form-item label="库存数量" >
            <el-input-number v-model="goods.goodsnumber" :min="1" :max="10000"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="submit">立即添加</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddGoods",
  data(){
    return{
      goods:{
        goodsname:"",
        goodsprice:0,
        goodsnumber:0
      }
    }
  },
  created() {

  },
  methods:{

    submit:function (){
      const url='http://localhost:8080/';
      //const url = 'http://106.15.234.251:8081/';
      this.$axios.post(url + 'addGoods',
          {"goodsname":this.goods.goodsname
            ,"goodsprice":this.goods.goodsprice
            ,"goodsnumber":this.goods.goodsnumber})
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

    }




  }

}
</script>

<style scoped>

</style>