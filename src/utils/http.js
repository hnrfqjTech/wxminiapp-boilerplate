// https://wendux.github.io/dist/#/doc/flyio/readme
import { baseUrl } from '@/config';

const Fly = require('flyio/dist/npm/wx');
const $http = new Fly();

$http.interceptors.request.use((config, promise) => {
  wx.showLoading();
  wx.showNavigationBarLoading();
  // const token = wx.getStorageSync('token') || '';
  config.headers[ 'token' ] = '835add58-d040-11e8-a8d5-f2801f1b9fd1';
  return config;
})

$http.interceptors.response.use((response) => {
  const resCode = (response.data && response.data.code) || 0;
  const resMsg = (response.data && response.data.msg) || '服务异常';

  wx.hideLoading();
  wx.hideNavigationBarLoading()
  return response;
}, (err) => {
  wx.hideLoading();
  wx.hideNavigationBarLoading();
  if (err) {
    if (err.status === 404) {
      // 404, 切换到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
  return Promise.reject(err)
})

$http.config.baseURL = baseUrl;

export default $http;
