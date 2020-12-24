<template>
  <div>
    <el-card>
      <div>用户编号:{{user.userid}}</div>
      <div>用户名:{{user.username}}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return {
      userid:1,
      user:{
        userid:1,
        username:""
      }
    }
  },
  created() {

    //this.userid=sessionStorage.getItem("userid");
    this.getUserInformation();
  },
  methods:{

    getUserInformation:function (){

      const url='http://localhost:8080/';
      //const url = 'http://106.15.234.251:8081/';
      this.$axios.get(url + 'user',
          { params: { userid:this.userid }})
          .then((response) => {
            //console.log(response);
            const data = response.data;
            if(data.code === 200){
              this.user.userid = data.data.userid;
              this.user.username = data.data.username;

              //console.log(this.problemList);
            }
            else{
              console.log(data.msg);
              alert(data.msg);
            }
          })


    }



  }

}
</script>

<style scoped>

</style>