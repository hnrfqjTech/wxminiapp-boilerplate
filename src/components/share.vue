<template>
  <div class="share-comp flex-wrap">
    <!-- 分享给好友和群 -->
    <div class="flex-col1">
      <button class="touts-flex touts-align_center touts-flex_flow" hover-class="none" plain open-type="share" v-if="isLogin">
        <p v-if="showTips" class="wechat_share">{{friends.tips}}</p>
        <img src="/static/assets/wechat2@2x.png" class="wechat_icon">
        <p class="wechat_friend">{{friends.title}}</p>
      </button>
      <button class="touts-flex touts-align_center touts-flex_flow"
        hover-class="none" plain open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-else>
        <p v-if="showTips" class="wechat_share">分享至2</p>
        <img src="/static/assets/wechat2@2x.png" class="wechat_icon">
        <p class="wechat_friend">微信好友</p>
      </button>
    </div>
    <!-- 分享到朋友圈 -->
    <!-- <div class="flex-col1"></div> -->
  </div>
</template>

<script>
import login from "@/utils/loginUntil";

// 组件完成 UI 效果，分享内容需要在每个页面 onShareAppMessage 中定制
export default {
  props: {
    friends: {
      type: Object,
      default() {
        return {
          tips: '分享至',
          title: '分享给好友'
        };
      }
    },
    showTips: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },
  data() {
    return {
      isLogin: false,
    };
  },
  onLoad(options) {
    if (wx.getStorageSync("userId")) {
      this.isLogin = true;
      // this.userId = wx.getStorageSync("userId");
      // this.userName = wx.getStorageSync("userName");
    }
  },
  methods: {
    bindGetUserInfo(e) {
      var that = this;
      if (e.mp.detail.rawData) {
        login.loginFn('/api/wechat/login', function(userInfo) {
          that.isLogin = true;
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import 'src/css/variable';
.share-comp {
  button {
    border: none;
  }
  .wechat_share {
    padding: 30rpx 0 25rpx 0;
    font-size: 24rpx;
  }
  .wechat_icon {
    width: 90rpx;
    height: 90rpx;
  }
  .wechat_friend {
    padding-top: 15rpx;
    font-size: 28rpx;
    color: #666;
  }
}
</style>
