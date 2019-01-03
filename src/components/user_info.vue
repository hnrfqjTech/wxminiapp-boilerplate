<template>
  <div class="home-page">
    <button class="touts-flex touts-align_center" hover-class="none" plain @click="toPersonalInfo" v-if="isLogin">
        <div class="userinfo_avatar touts-flex touts-align_center">
          <img class="touts-userinfo_avatar" alt="" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
          <img src="/static/assets/user_icon.png" alt="" v-else class="touts-userinfo_avatar">
        </div>
        <div class="touts-flex touts-flex_flow userInfo">
          <p v-if="userInfo.nickName" class="userInfo_nickName">{{userInfo.nickName}}</p>
          <p v-else class="userInfo_nickName">昵称</p>
          <div class="touts-flex touts-align_center" v-if="show == 'true'">
            <i class="personal_info">个人主页</i>
            <img src="/static/assets/more@2x.png" alt="" class="arrayRight">
          </div>
        </div>
      </button>
    <button class="touts-flex touts-align_center" hover-class="none" plain open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-else>
        <div class="userinfo_avatar touts-flex touts-align_center">
          <img class="touts-userinfo_avatar" alt="" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
          <img src="/static/assets/user_icon.png" alt="" v-else class="touts-userinfo_avatar">
        </div>
        <div class="touts-flex touts-flex_flow userInfo">
          <p v-if="userInfo.nickName" class="userInfo_nickName">{{userInfo.nickName}}</p>
          <p v-else class="userInfo_nickName">昵称</p>
          <div class="touts-flex touts-align_center" v-if="show == 'true'">
            <i class="personal_info">个人主页</i>
            <img src="/static/assets/more@2x.png" alt="" class="arrayRight">
          </div>
        </div>
      </button>
  </div>
</template>

<script>
import login from "../utils/loginUntil";

export default {
  props: ["show"],
  data() {
    return {
      userInfo: {},
      isLogin: false
    };
  },
  onShow(options) {
    var that = this;
    login.getSetting(function(userInfo) {
      that.isLogin = true
      that.userInfo = userInfo;
    });
  },
  created() {
    var that = this;
    login.getSetting(function(userInfo) {
      that.isLogin = true;
      that.userInfo = userInfo;
    });
  },
  onLoad() {
    // Object.assign(this.$data, this.$options.data());
  },
  methods: {
    checkWxVersion() {
      login.checkWxVersion();
    },
    bindGetUserInfo(e) {
      var that = this;
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        // 调用应用实例的方法获取全局数据
        wx.showLoading({
          mask: true
        });
        login.loginFn('/api/wechat/login', function(userInfo) {
          wx.hideLoading();
          that.isLogin = true;
          that.userInfo = userInfo;
          if (that.show == "true") {
            that.toPersonalInfo();
          }
        });
      } else {
        //用户按了拒绝按钮
      }
    },
    toPersonalInfo() {
      if (this.show == "true") {
        const url = "/pages/user/index";
        wx.navigateTo({ url });
      }
    }
  }
};
</script>

<style scoped>
.home-page {
  width: 100%;
}

button {
  height: 94rpx;
  border: 0;
  width: 100%;
  padding: 0;
}

.userinfo_avatar {
  width: 94rpx;
  height: 94rpx;
}

.touts-userinfo_avatar {
  width: 92rpx;
  height: 92rpx;
  border-radius: 50%;
  border: 1rpx solid #efefef;
}

.userInfo {
  margin-left: 26rpx;
  flex: 3;
}

.userInfo_nickName {
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: #333333;
  text-align: left;
  line-height: 40rpx;
  margin-bottom: 10rpx;
}

.personal_info {
  font-size: 24rpx;
  color: #999999;
  letter-spacing: 0.38px;
  line-height: 34rpx;
  margin-right: 15.6rpx;
}
</style>
