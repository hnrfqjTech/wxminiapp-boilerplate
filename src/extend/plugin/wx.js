import Vue from 'vue';

const wxCls = new Vue({
  computed: {
    userId() {
      return wx.getStorageSync('userId') || '';
    }
  },
  methods: {
    toast(title) {
      wx.showToast({
        title,
        icon: 'none'
      });
    },
    backTo(msg, url) {
      wx.showModal({
        content: msg,
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url,
            });
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
    },
  }
});
const wxPlugin = {
  install(Vue, options) {
    Vue.prototype.$wx = wxCls;
  }
};

export default wxPlugin;
