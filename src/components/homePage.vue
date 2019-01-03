<template>
  <div v-if="iconName" class="homePage" @click="toHomePage">
    <img :src="'/static/assets/' + iconName" class="home">
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'home@2x.png'
    },
    url: {
      type: String,
      default: '/pages/index/index'
    },
  },
  data () {
    return {
      scene: 0
    }
  },
  mounted () {
    // console.log(this.$root.$mp.appOptions.scene)
    // this.scene = this.$root.$mp.appOptions.scene;
    // this.$root.$mp.appOptions.scene = 0;
    // v-if="scene == 1007 ||scene == 1008|| scene == 1011 || scene == 1012|| scene == 1013|| scene == 1014|| scene == 1037|| scene == 1038|| scene == 1044|| scene == 1047|| scene == 1048 || scene == 1049 ||scene == 1073 ||scene == 1074"
  },
  methods: {
    toHomePage() {
      this.scene = 0;
      const url = this.url;
      wx.reLaunch({ url });
    }
  }
};
</script>

<style scoped>
.homePage {
  position: fixed;
  bottom: 280rpx;
  right: 30rpx;
  z-index: 99999;
}

.home {
  width: 140rpx;
  height: 140rpx;
}
</style>
