<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input
        v-model="query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px "
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" @click="AdddialogFormVisible=true">添加用户</el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="value" active-color="#3f9cfe" inactive-color="#d7dce4"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
            <el-button type="success" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 添加用户对话框 -->
    <el-dialog title="用户添加" :visible.sync="AdddialogFormVisible">
      <el-form :model="AddForm" :label-width="'120px'" :rules="rules" ref="AddForm">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="AddForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="AddForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="AddForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="AddForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AdddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser } from "@/api/user_api.js";
export default {
  data() {
    return {
      // 状态栏
      value: true,
      // 列表数据参数
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 3, //每页显示条数
      userList: [],
      // 当前页面
      pagenum: 1,
      // 数据总条数
      total: 0,
      // 添加用户 对话框 显示或隐藏
      AdddialogFormVisible: false,
      // 添加用户数据对象
      AddForm: {
        username: "",
        password: "",
        email: "123@126.com",
        mobile: "15236558452"
      },
      // 添加用户表单元素的验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
            pattern: /\w+[@]\w+[.]\w{2,3}/
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[345678]\d{9}$/,
            message: "请填写正确的手机号（11位数字）",
            trigger: "blur"
          }
        ]
      }
    };
  },
  // 调用方法
  mounted() {
    // 获取列表数据的调用方法
    this.init();
  },
  methods: {
    // 封装获取列表的调用方法
    init() {
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res);
          this.userList = res.data.data.users; // 获取列表数据
          this.total = res.data.data.total; // 获取数据总条数
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 封装搜索调用方法
    search() {
      this.pagenum = 1;
      this.init();
    },

    // 编辑
    handleEdit(index, row) {
      console.log(index, row, "编辑");
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row, "删除");
    },

    // 分页
    // 切换每页条数
    handleSizeChange(val) {
      // 重置pagesize，再次发起请求  console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.init();
    },
    // 切换当前页码
    handleCurrentChange(val) {
      // 把当前页码pagenum重置，再次发起数据请求   console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.init();
    },

    // 添加用户数据
    addUser() {
      this.$refs.AddForm.validate(valid => {
        if (valid) {
          addUser(this.AddForm)
            .then(res => {
              console.log(res, "新增用户数据");
              if (res.data.meta.status === 201) {
                this.AdddialogFormVisible = false;
                this.$refs.AddForm.resetFields();  // 发送后清空
                this.init();
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>