import Vue from 'vue'
import App from '../App'

var login = {
  loginFn: function (url, callback) {
    const that = this
    wx.login({
      success: res => {
        if (res.code) {
          wx.getUserInfo({
            success: useRes => {
              const data = {
                "X-WX-Code": res.code,
                "X-WX-Encrypted-Data": useRes.encryptedData,
                "X-WX-IV": useRes.iv
              };
              //添加请求拦截器
              Vue.prototype.$http.interceptors.request.use((config, promise) => {
                //给所有请求添加自定义header
                config.headers["token"]="testToken";
                config.headers["Content-Type"] = "application/json";
                config.headers["X-WX-Code"] = res.code;
                config.headers["X-WX-Encrypted-Data"] = useRes.encryptedData;
                config.headers["X-WX-IV"] = useRes.iv;
                config.headers["App_Id"] = "testAppId";
                return config;
              });
              Vue.prototype.$http
                .post(url, data)
                .then(res => {
                  wx.setStorageSync('openId', res.data.data.openId);
                  wx.setStorageSync('userId', res.data.data.id);
                  wx.setStorageSync('userName', res.data.data.nickName);
                  callback(useRes.userInfo);
                })
                .catch(err => {
                  console.error(err.status, err.message);
                });
            }
          });
        }
      }
    });
  },
  getSetting: function (callback) {
    const that = this
    if (wx.canIUse("button.open-type.getUserInfo")) {
      // 用户版本可用
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            // 调用应用实例的方法获取全局数据
            wx.getUserInfo({
              success: function (data) {
                callback(data.userInfo);
              }
            })
          }
        }
      });
    } else {
    }

  }

}
export default login
