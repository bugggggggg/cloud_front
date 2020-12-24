<template>

  <div class="page">

    <div class="title-container">
      <h1 class="header">欢迎光临 超市</h1>
    </div>

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>登录</h2>
      </el-row>
      <el-form label-width="0">
        <el-form-item>
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="userid" placeholder="账号">
          </el-input>
        </el-form-item>

        <el-form-item>
          <i class="el-icon-s-goods"></i>
          <el-input class="form-input" v-model="password" placeholder="密码" show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item class="login">
          <el-button type="primary" class="form-button" v-on:click="login" round id="login">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>

  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
    return {
      userid:1,
      password:''
    }
  },
  methods:{
    login:function () {
      console.log("请求登录");
      if( this.userid == "" || this.password == "") {
        alert("请正确输入");
      }

      const url='http://localhost:8080/';
      this.$axios.get(url + 'login',
          {params:{userId: this.userid,password: this.password}})
          .then(function(response) {
            const Data = response.data;
            const data = Data.data;
            if (response.status === 200)
            {
                alert("登录成功！欢迎你!");
                let userid=data.userid;
                sessionStorage.setItem("userid",userid);
                location = '../';
              }
              else
              {
                console.log("Login Fail!");
                var message = data.msg;
                alert("登录失败！" + message);
              }

      })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },

    logout:function() {
      console.log("请求退出登录");
        sessionStorage.setItem("isLogin", false);
        sessionStorage.removeItem("userid" );

    }


  }
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
}

.box {
  width: 30%;
  margin-top: 50px;
  margin-left: 35%;
}

.header {
  text-align: center;
  margin-top: 80px;
}

.title {
  text-align: center;
}

.form-input {
  width: 80%;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-goods {
  font-size: 25px;
  margin: 0 20px;
}

.login {
  text-align: center;
}

.register {
  text-align: center;
}

.copyright {
  margin: 0 auto;
  width: 520px;
  max-width: 100%;
  text-align: center;
  font-size: 13px
}
</style>