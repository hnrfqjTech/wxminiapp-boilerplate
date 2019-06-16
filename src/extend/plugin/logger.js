const { CLIENT_ENV } = process.env;
import Vue from 'vue';

const loggerCls = new Vue({
  methods: {
    info() {
      if (CLIENT_ENV !== 'prod') console.info.apply(console, arguments);
    }
  }
});
const loggerPlugin = {
  install(Vue, options) {
    Vue.prototype.logger = loggerCls;
  }
};

export default loggerPlugin;
