import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  // 存储变量
  state: {
    playList:[{
      al:{
        id:'',
        name:'待播放',
        picUrl:'',

      }
    }],
    playListIndex:0,
  },
  //获取变量
  getters: {},
  //同步操作变量
  mutations: {
    //获取当前播放歌曲的歌词
    setLyric(state, payload) {
      state.playContent.lyric = payload;
    },
  },
  //异步操作变量
  actions: {},
  //将vuex进行分模块，处理数据的唯一途径，state的改变或赋值只能在这里
  modules: {},
});
