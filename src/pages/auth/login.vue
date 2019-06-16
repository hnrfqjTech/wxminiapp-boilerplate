<template>
  <div class="page-auth">
    <div class="logo">
      <image mode="widthFix" src="https://ft.hnrfqj.com/shiyedao/wxapp/match_avatar@2x.png"></image>
      <p>wxminiapp-boilerplate 欢迎您！</p>
    </div>
    <div class="desc">
      <div class="desc-t">wxminiapp-boilerplate申请获得以下权限</div>
      <div class="desc-d">获得你的公开信息(昵称、头像等)</div>
    </div>
    <div class="btn-wrap">
      <button
        type="primary"
        hover-class="none"
        v-if="canIUse"
        open-type="getUserInfo" @getuserinfo="onGotUserInfo">微信一键登录</button>
    </div>
  </div >
</template>

<script>
import login from '@/utils/loginUntil';

export default {
  name: 'AuthLogin',
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
    }
  },
  onLoad(options) {
    wx.setStorageSync('openId', '');
    wx.setStorageSync('userId', '');
    wx.setStorageSync('userName', '');
    wx.setStorageSync('phoneNumber', '');
    wx.setStorageSync('token', '');
    // wx.showToast({
    //   title: '授权已过期，请重新登录~',
    //   icon: 'none',
    // });
  },
  methods: {
    onGotUserInfo: function(e) {
      login.loginFn(function(userInfo) {
        wx.reLaunch({
          url: '/pages/index/index'
        });
      });
    },
  }
}
</script>

<style lang="scss">
page {
  background-color: #fff;
}
.page-auth {
  background: #fff;
  text-align: center;
  font-size: 28rpx;
  padding:20rpx;
  .logo {
    padding-top: 30rpx;
    image {
      width: 240rpx;
    }
    p {
      padding-top: 20rpx;
    }
  }
  .desc {
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    padding: 20rpx;
    margin: 20rpx;
    line-height: 52rpx;
  }
  .desc-d {
    color: #777;
  }
  .btn-wrap {
    padding: 30rpx;
    font-size: 30rpx;
    ._button {
      font-size: 30rpx;
    }
  }
  .button-hover {
    background-color: #3D91EB;
  }
}
</style>
