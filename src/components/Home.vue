<template>
  <div>
    <el-container>
      <el-header>
        <div style="display: flex;align-items: center;">
          <span style="font-size:large;">超市</span>
        </div>
        <el-button type="primary" v-on:click="logout" style="float: right">退出</el-button>
      </el-header>

      <el-container>
        <el-aside width="300px">
          <el-menu router>
            <el-menu-item index="/user">用户信息</el-menu-item>
            <el-menu-item index="/goods">商品</el-menu-item>
            <el-menu-item index="/records">购买记录</el-menu-item>

            <!-- 管理员编号为1  -->
            <el-menu-item index="/goods/addGoods" v-if="userid===1">增加商品</el-menu-item>


          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      userid:1
    }
  },
  created() {
    //this.userid=sessionStorage.getItem("userid");
  },
  methods:{
    logout:function (){
      sessionStorage.removeItem("userid");
      location="/login";
    }
  }
}
</script>

<style scoped>

</style>