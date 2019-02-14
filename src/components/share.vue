<template>
  <div class="share-wrap">
    <div catchtouchmove="ture" class="canvas-wrap" v-show="shareFriends">
      <cover-image @click="closeShareFriends" class="close" src="/static/assets/canvas-close@2x.png" />
      <canvas canvas-id="myCanvas" class="canvas" :style="'height: ' + canvasHeight + 'px'"></canvas>
      <cover-image @click="saveShareImage" class="save" src="/static/assets/canvas-save@2x.png" />
    </div>

    <div class="share-comp flex-wrap">
      <!-- 分享给好友和群 -->
      <div class="flex-col1">
        <button
          class="touts-flex touts-align_center touts-flex_flow"
          hover-class="none"
          plain
          open-type="share">
          <p v-if="showTips" class="wechat_share">{{friends.tips}}</p>
          <img :src="chatIcon" class="wechat_icon">
          <p class="wechat_friend">{{friends.title}}</p>
        </button>
        <!-- <button
          v-if="isLogin"
          class="touts-flex touts-align_center touts-flex_flow"
          hover-class="none"
          plain
          open-type="getUserInfo"
          @getuserinfo="bindGetUserInfo">
          <p v-if="showTips" class="wechat_share">分享至</p>
          <img src="/static/assets/wechat2@2x.png" class="wechat_icon">
          <p class="wechat_friend">微信好友</p>
        </button> -->
      </div>
      <!-- 分享到朋友圈 -->
      <div class="flex-col1" v-if="showFriendsCircle">
        <button
          v-if="coFriendsStatus === 1"
          class="touts-flex touts-align_center touts-flex_flow"
          hover-class="none"
          @click="onSaveImageToPhotosAlbum"
          plain>
          <p v-if="showTips" class="wechat_share">{{friendsCircle.tips}}</p>
          <img :src="circleIcon" class="wechat_icon">
          <p class="wechat_friend">{{friendsCircle.title}}</p>
        </button>

        <button
          v-if="coFriendsStatus === 2"
          class="touts-flex touts-align_center touts-flex_flow"
          hover-class="none"
          @click="onAuthorizeWritePhotosAlbum"
          plain>
          <p v-if="showTips" class="wechat_share">{{friendsCircle.tips}}</p>
          <img :src="circleIcon" class="wechat_icon">
          <p class="wechat_friend">{{friendsCircle.title}}</p>
        </button>

        <button
          v-if="coFriendsStatus === 3"
          class="touts-flex touts-align_center touts-flex_flow"
          hover-class="none"
          plain
          open-type="openSetting"
          @opensetting="bindOpensetting">
          <p v-if="showTips" class="wechat_share">{{friendsCircle.tips}}</p>
          <img :src="circleIcon" class="wechat_icon">
          <p class="wechat_friend">{{friendsCircle.title}}</p>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import login from "@/utils/loginUntil";
import { getData, postData } from '@/api';
import { apiGetCodeImgFile } from '@/config';

let windowWidth = 0;
let windowHeight = 0;
let canvasWidth = 0;

// 组件完成 UI 效果，分享内容需要在每个页面 onShareAppMessage 中定制
export default {
  props: {
    chatIcon: {
      type: String,
      default: '/static/assets/wechat2@2x.png',
    },
    circleIcon: {
      type: String,
      default: '/static/assets/PYQ@2x.png',
    },
    pagePath: {
      type: String,
      default: 'pages/index/index',
    },
    canvasTopImg: {
      type: String,
      default: '/static/assets/share_card@2x.png',
    },
    friends: {
      type: Object,
      default() {
        return {
          tips: '分享至',
          title: '分享给好友'
        };
      }
    },
    friendsCircle: {
      type: Object,
      default() {
        return {
          tips: '分享至',
          title: '分享到朋友圈'
        };
      }
    },
    showTips: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showFriendsCircle: {
      type: Boolean,
      default() {
        return true;
      }
    },
  },
  data() {
    return {
      isLogin: false,
      coFriendsStatus: 2, // 1：有权限，2：拉起授权后同意，3：拉起授权后拒绝
      shareFriends: false,
      canvasHeight: 0,
      canvasTitle: '师爷到，您的私人税务专家',
      canvasCodeImg: '',
      canvasTips: '长按识别图中二维码进入小程序',
      canvasToImgUrl: '',
    };
  },
  onLoad(options) {
    const that = this;
    if (wx.getStorageSync("userId")) {
      this.isLogin = true;
      // this.userId = wx.getStorageSync("userId");
    }
    this.getAuthWritePhotosAlbum();

    wx.getSystemInfo({
      success: function (res) {
        // console.info(res);
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
        canvasWidth = Math.floor(588 / 750 * windowWidth);
        that.canvasHeight = windowHeight * 0.8;
      },
    });
  },
  methods: {
    bindGetUserInfo(e) {
      var that = this;
      if (e.mp.detail.rawData) {
        login.loginFn(function(userInfo) {
          that.isLogin = true;
        });
      }
    },
    // 图片读写权限处理
    setCoFriendsStatus(val) {
      const key = 'coFriendsStatus';
      wx.setStorageSync(key, val);
      this[ key ] = val;
    },
    getAuthWritePhotosAlbum() {
      const scope = 'scope.writePhotosAlbum';
      const alias = this;
      this.coFriendsStatus = wx.getStorageSync('coFriendsStatus') || 2;
      wx.getSetting({
        success(res) {
          const authSetting = res.authSetting;
          const scopeResult = authSetting[ scope ];
          if (!!scopeResult) alias.setCoFriendsStatus(1);
          else if(alias.coFriendsStatus !==3) alias.setCoFriendsStatus(2);
        }
      })
    },
    onAuthorizeWritePhotosAlbum() {
      const scope = 'scope.writePhotosAlbum';
      const alias = this;
      wx.authorize({
        scope,
        success() {
          alias.setCoFriendsStatus(1);
          alias.onSaveImageToPhotosAlbum();
        },
        fail() {
          alias.setCoFriendsStatus(3);
        }
      });
    },
    bindOpensetting(e) {
      const scope = 'scope.writePhotosAlbum';
      const authSetting = e.target.authSetting;
      const scopeResult = authSetting[ scope ];
      if (!!scopeResult) {
        this.setCoFriendsStatus(1);
        this.onSaveImageToPhotosAlbum();
      }
    },
    // 图片生成流程
    onSaveImageToPhotosAlbum() {
      this.createWXACodeImage();
    },
    // create wxAcodeImage
    createWXACodeImage() {
      const that = this;
      postData(apiGetCodeImgFile, {
        path: that.pagePath,
      }).then(res => {
        if (res.data.code === 0) {
          that.getWXACodeImage(res.data.data);
        } else {
          that.$wx.toast('获取当前页面程序码失败');
        }
      }).catch(err => {
        that.$wx.toast('网络超时，请重试')
      });
    },
    // get wxAcodeImage
    getWXACodeImage(url) {
      wx.showLoading({
        title: '绘制中...',
        mask: true
      });
      const that = this;
      wx.downloadFile({
        url,
        success(res) {
          if (res.statusCode === 200) {
            that.canvasCodeImg = res.tempFilePath
            that.drawCanvas();
            that.shareFriends = true;
          }
          wx.hideLoading();
        },
        fail() {
          wx.hideLoading();
          that.$wx.toast('未设置的非法域名')
        }
      });
    },
    drawCanvas() {
      var that = this;
      const ctx = wx.createCanvasContext('myCanvas', this);
      const halfCanvasWidth = Math.floor(canvasWidth / 2);
      const topImgHeight = Math.floor(canvasWidth * 510 / 636);
      const mutableHeight = that.canvasHeight - topImgHeight;

      // 背景色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvasWidth, that.canvasHeight);
      // 宽度满屏图
      ctx.drawImage(that.canvasTopImg, 0, 0, canvasWidth, topImgHeight);
      ctx.fillStyle = "#000";
      const titleFS = parseInt(canvasWidth / 750 * 44);
      const titleY = Math.floor(topImgHeight + mutableHeight * 0.2);
      ctx.setFontSize(titleFS);
      ctx.setTextAlign('center');
      ctx.fillText(that.canvasTitle, halfCanvasWidth, titleY);
      // 宽度没满屏
      const codeImgWidth = Math.floor(340 / 750 * mutableHeight);
      const codeImgX = (canvasWidth - codeImgWidth) / 2;
      const codeImgY = Math.floor(topImgHeight + mutableHeight * 0.32);
      ctx.drawImage(that.canvasCodeImg, codeImgX, codeImgY, codeImgWidth, codeImgWidth);
      // 长按识别图中二维码进入小程序
      ctx.fillStyle = "#999";
      const tipsFS = parseInt(canvasWidth / 750 * 32);
      const tipsY = Math.floor(topImgHeight + mutableHeight * 0.9);
      ctx.setFontSize(tipsFS);
      ctx.setTextAlign('center');
      ctx.fillText(that.canvasTips, halfCanvasWidth, tipsY);

      ctx.draw(false, function (res) {
        setTimeout(() => {
          that.saveCanvasImage();
        }, 500)
      });
    },
    // transfer img
    saveCanvasImage: function () {
      var that = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: that.canvasHeight,
        canvasId: 'myCanvas',
        success: function (res) {
          that.canvasToImgUrl = res.tempFilePath;
          wx.hideLoading();
        },
        fail(err) {
          wx.hideLoading();
          that.$wx.toast('图片转换失败')
        }
      }, this);
    },
    // save img
    saveShareImage() {
      var that = this;
      wx.saveImageToPhotosAlbum({
        filePath: that.canvasToImgUrl,
        success(res) {
          wx.showModal({
            title: '图片已保存到系统相册',
            content: '快去分享到朋友圈吧',
            showCancel: false,
            success(res) {
              that.shareFriends = false;
            }
          });
        },
        fail(err) {
          that.$wx.toast(err.errMsg)
        }
      });
    },
    closeShareFriends() {
      this.shareFriends = false;
    }
  },
};
</script>

<style lang="scss">
@import 'src/css/variable';
.canvas-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .close {
    width: 62rpx;
    height: 62rpx;
    position: absolute;
    top: 15rpx;
    right: 15rpx;
    z-index: 1000;
  }
  .canvas {
    width: 588rpx;
    margin: 70rpx auto 0;
    border-radius: 20rpx;
  }
  .save {
    width: 588rpx;
    height: 88rpx;
    position: fixed;
    bottom: 30rpx;
    left: 81rpx;
  }
}
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
