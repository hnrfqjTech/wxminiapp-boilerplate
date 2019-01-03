<template>
  <radio-group class="radio-group" @change="change">
    <label class="radio-item" v-for="(item, index) in arrs" :key="index">
      <radio :disabled="disabled" class="weui-check" :value="item.value" :checked="item.checked" />
      <div v-if="disabled" class="disable-icon"></div>
      <div v-else>
        <icon class="radio-circle" v-if="item.checked" type="success" color="#5EABFC"></icon>
        <icon class="radio-circle" v-else type="circle"></icon>
      </div>
      <span style="font-size: 30rpx;color: #666666;">{{item.value}}</span>
    </label>
  </radio-group>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: [],
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        arrs: []
      }
    },
    created() {
      this.arrs = this.value
    },
    methods: {
      change(e) {
        let arrs = this.value, select = e.mp.detail.value;
        for (let i = 0, length = arrs.length; i < length; ++i) {
          if (arrs[i].value == select) {
            arrs[i].checked = true;
          } else {
            arrs[i].checked = false;
          }
        }
        this.arrs = arrs;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .disable-icon{
    margin-right: 20rpx;
    width: 39rpx;
    height: 39rpx;
    border-radius: 100%;
    border: 2rpx solid rgba(178,178,178,0.7);
    background: linear-gradient(to right,#ffffff 45%,rgba(178,178,178,0.7) 45%,rgba(178,178,178,0.7) 55%,#fff 55%);
    transform:rotate(130deg);
  }
</style>
