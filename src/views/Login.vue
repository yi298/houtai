<template>
  <div class="login">
    <div class="container">
      <img class="avatar" src="../assets/3.jpg" alt />
      <el-form ref="loginform" :model="loginform" :rules="rules">
        <el-form-item label prop="username">
          <el-input
            v-model="loginform.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            v-model="loginform.password"
            prefix-icon="iconfont icon-mima"
            placeholder="请输入密码"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user_api.js";
export default {
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      },
      // 表单初次验证：验证非空
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },

  methods: {
    // 二次验证：验证输入是否合法
    loginSubmit() {
      this.$refs.loginform.validate(valid => {
        if (valid) {
          login(this.loginform)
            .then(res => {
              if(res.data.meta.status=== 200){
                localStorage.setItem('token',res.data.data.token)
                this.$message.success(res.data.meta.msg);
                this.$router.push({name:'home'})
              }else{
                this.$message.error(res.data.meta.msg);
                return false;
              }
            })
            .catch(err => {
              console.log(err,'登陆失败');
            });
        } else {
          this.$message.error("输入格式错误，请重新输入");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #d9ecff;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #409eff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>