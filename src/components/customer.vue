<template>
  <div class="customer-comp flex-wrap" v-if="message.iconName && phone.iconName">
    <div class="flex-col1"  catchtap>
      <button class="list" hover-class="none" plain open-type="contact" session-from="weapp">
        <image
          mode="widthFix"
          :style="{width: message.width, height: message.height, marginRight: message.right}"
          :src="'/static/assets/' + message.iconName" class="ctm-icon"></image>
        <p v-if="showTips" class="ctm-txt">{{message.tips}}</p>
      </button>
    </div>
    <div class="flex-col1">
      <button class="list" hover-class="none" plain @click.stop="onPhoneCall">
        <image
          mode="widthFix"
          :style="{width: message.width, height: message.height, marginLeft: message.left}"
          :src="'/static/assets/' + phone.iconName" class="ctm-icon"></image>
        <p v-if="showTips" class="ctm-txt">{{phone.tips}}</p>
      </button>
    </div>
  </div>
</template>

<script>
import { customerPhone } from '@/config';
export default {
  props: {
    message: {
      type: Object,
      default() {
        return {
          iconName: 'message@2x.png',
          tips: '在线客服',
          width: '80rpx',
          height: '80rpx',
          right: '0'
        };
      }
    },
    phone: {
      type: Object,
      default() {
        return {
          iconName: 'phone@2x.png',
          tips: '电话客服',
          url: '',
          width: '80rpx',
          height: '80rpx',
          left: '0'
        };
      }
    },
    showTips: {
      type: Boolean,
      default() {
        return true;
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    onPhoneCall() {
      if (this.phone.url) {
        wx.navigateTo({
          url: this.phone.url
        });
      } else {
        wx.makePhoneCall({
          phoneNumber: customerPhone
        });
      }
    },
  },
}
</script>

<style lang="scss">
.customer-comp {
  text-align: center;
  button {
    border: none;
  }
  .ctm-icon {
    margin-top: 10rpx;
    width: 80rpx;
  }
  .ctm-txt {
    font-size: 28rpx;
    color: #666;
    margin-top: 2rpx;
  }
}
</style>
