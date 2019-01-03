import * as type from './mutation-types';
const mutations = {
  [type.SET_ISLOGIN](state, userIslogin) { // eslint-disable-line
    state.userIslogin = userIslogin;
  }
}

export default mutations;
