// 引入 fly
const fly = require("flyio");

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // 默认请求头
  request.headers['X-Requested-With'] = 'XMLHttpRequest';
  request.headers['Content-Type'] = 'application/json';
  return request;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return Promise.resolve(response.data);
  },
  async (err) => {
    return Promise.reject(err.response.data);
  }
);

// 配置请求基地址
// fly.config.baseURL = '';

export default fly;
