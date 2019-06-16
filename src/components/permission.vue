<template>
  <div class="comp-permission" v-if="eleType === 'block'">
    <slot></slot>
    <button
      v-show="!isLogin" class="getUserInfo-normal"
      open-type="getUserInfo" @getuserinfo="onGetUserInfo"
      hover-class="none" plain
    ></button>
  </div>
  <span class="comp-permission" v-else>
    <slot></slot>
    <button
      v-show="!isLogin" class="getUserInfo-normal"
      open-type="getUserInfo" @getuserinfo="onGetUserInfo"
      hover-class="none" plain
    ></button>
  </span>
</template>

<script>
import login from '@/utils/loginUntil';

export default {
  props: {
    eleType: {
      type: String,
      default: 'block',
    },
    opeType: {
      type: String,
      default: '',
    },
    param: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      isLogin: false,
      userId: '',
    };
  },
  mounted() {
    this.changeLoginStatus();
  },
  methods: {
    changeLoginStatus() {
      if (wx.getStorageSync('userId')) this.userId = wx.getStorageSync('userId');
    },
    operationHandle() {
      this.changeLoginStatus();
      this.$emit('operation', {
        opeType: this.opeType,
        userId: this.userId,
        param: this.param,
      });
    },
    onGetUserInfo(ev) {
      if (ev.mp.detail.signature === undefined) return;

      const alias = this;
      if (this.userId) {
        this.operationHandle();
      } else {
        login.loginFn(function(userInfo) {
          alias.operationHandle();
        });
      }
    },
  },
};
</script>

<style lang="scss">
.comp-permission {
  position: relative;
}
</style>

