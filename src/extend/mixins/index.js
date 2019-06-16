export const infiniteList = function (options) {
  return {
    data() {
      return {
        current: 1,
        size: 5,
        loadDone: false,
        loadTxt: '',
        dTxt: '',
        lTxt: '',
      }
    },
    onLoad() {
      this.dTxt = options.dTxt || '没有更多了';
      this.lTxt = options.lTxt || '加载中...';
      this.getInfiniteList();
    },
    onPullDownRefresh: function () {
      setTimeout(() => {
        this.resetInfiniteParam();
        this.getInfiniteList();
      }, 500);
    },
    onReachBottom: function () {
      if (!this.loadDone) this.getInfiniteList();
    },
    methods: {
      resetInfiniteParam() {
        this.loadTxt = '';
        this.current = 1;
        this.loadDone = false;
        options.infiResetParamFn && options.infiResetParamFn.bind(this)();
      },
      getInfiniteList() {
        options.infiDataFn && options.infiDataFn.bind(this)();
      },
      afterInfiniteLoad(listsLens, total) {
        if ((this.current - 1) * this.size > listsLens) {
          this.loadDone = true;
        } else {
          this.loadDone = listsLens >= parseInt(total) ? true : false;
        }
        this.loadTxt = '';
        this.current += 1;
        this.$nextTick(() => {
          this.loadTxt = this.loadDone ? this.dTxt : this.lTxt;
        });
        wx.stopPullDownRefresh();
      },
    }
  };
};
