// 放user用户的ajax接口

// 引入axios
import axios from "axios";
// 设置基准路径
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么？ 手动添加token值
    var token = localStorage.getItem("token");
    // console.log(config);
    config.headers["Authorization"] = token;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 实现用户登录
export const login = data => {
  return axios({
    method: "post",
    url: "login",
    data
  });
};

// 获取用户列表数据
export const getUserList = pa => {
  return axios({
    method: "get",
    url: "users",
    params:pa
  });
};

// 添加用户数据
export const addUser = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}