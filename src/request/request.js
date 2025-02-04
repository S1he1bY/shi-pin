import axios from 'axios';

// https://note.youdao.com/ynoteshare/index.html?id=b136e8254d0ff3dd48958af8fff8719e&type=note&_time=1679465327106

var http =  axios.create({
    baseURL: 'https://apis.netstart.cn/xpc',
    timeout: 30000,
    // headers: {'X-Custom-Header': 'foobar'}
  });


// 全局配置请求时携带cookie
// http.defaults.withCredentials = true

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

  // 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  // console.log('错误原因',error);
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default http