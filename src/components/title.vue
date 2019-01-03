<template>
  <div class="touts-flex touts-align_center touts-justify_between title">
    <div class="touts-title">{{touts_title}}</div>
    <div class="touts-flex touts-align_center btn_mores touts-justify_end" @click="toMore" v-if="show == 'true'">
      <i class="touts-more">更多</i>
      <img src="/static/assets/more@2x.png" alt="" class="arrayRight">
    </div>
  </div>
</template>

<script>
import login from "../utils/loginUntil";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  props: ["touts_title", "url","show"],
  methods: {
    toMore() {
      const url = "/pages/" + this.url + "/index";
      wx.navigateTo({
        url
      });
    }
  }
};
</script>

<style>
.title {
  margin-top: 36rpx;
}
.touts-title {
  font-size: 34rpx;
  font-family: PingFangSC-Medium;
  letter-spacing: 0.54rpx;
  color: #1c1c1c;
}

.touts-more {
  font-size: 28rpx;
  color: #999999;
  letter-spacing: 0.38rpx;
  margin-right: 3.6rpx;
}
.btn_mores {
  width: 130rpx;
}
</style>