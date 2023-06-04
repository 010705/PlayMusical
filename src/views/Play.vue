<template>
  <div id="play">
    <headernav></headernav>
    <div class="play-page">
      <div class="left">
        <div class="img" v-for="item in songs" @click="play(item)">
          <el-avatar :src="item.al.picUrl" class="avatar"></el-avatar>
          <img src="@/assets/stylus.png" class="stylus" />
        </div>
        <div class="audio" v-for="item in data">
          <audio :src="item.url"  controls></audio>
        </div>
      </div>
      <div class="right" v-show="currentMusicLyric">
        <!-- 歌曲简介-->
        <div class="name" v-for="item in songs">
          <h2>{{ item.name }}</h2>
          <div class="ar-name" v-for="i in item.ar">歌手：{{ i.name }}</div>
        </div>
        <!-- 歌词模块 -->
        <div class="lyric">
          <p v-for="(item, key, index) in currentMusicLyric" :key="key">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicUrl, getSongDetail, getLyric } from "@/api/api";
export default {
  name: "play",
  data() {
    return {
      data: [],
      songs: [],
      words: [],
      currentMusicLyric: [],
    };
  },
  components: {
    headernav: () => import("@/components/common/HeaderNav.vue"),
  },
  mounted() {
    this.getMusicUrl();
    this.getAlbumPhoto();
    this.getLyric();
  },

  methods: {
    //播放暂停
    play(info){
      console.log(info);
    },
    // 获取歌曲url
    async getMusicUrl() {
      try {
        let id = this.$route.query.id;
        const { data: res } = await getMusicUrl(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        this.data = res.data;
        // console.log(this.data);
      } catch (error) {
        console.log("错误", error);
      }
    },
    // 获取歌曲封面
    async getAlbumPhoto() {
      try {
        let id = this.$route.query.id;
        const { data: res } = await getSongDetail(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        this.songs = res.songs;
        // console.log(this.songs);
      } catch (error) {
        console.log("错误", error);
      }
    },
    //获取歌词
    async getLyric() {
      try {
        let id = this.$route.query.id;
        const { data: res } = await getLyric(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        this.words = res.lrc.lyric;
        // console.log(this.words);
        this.dispose(this.words);
      } catch (error) {
        console.log("错误", error);
      }
    },
    //对歌词进行处理
    dispose(param) {
      // this.text=l.replace(/\[.*?\]/g,'<br>')
      // console.log(this.text);
      let lyricArr = param.split("[").slice(1);
      let lrcObj = {};
      lyricArr.forEach((item) => {
        let arr = item.split("]"); // 再分割右括号
        // 时间换算成秒
        let m = parseInt(arr[0].split(":")[0]);
        let s = parseInt(arr[0].split(":")[1]);
        arr[0] = m * 60 + s;
        if (arr[1] != "\n") {
          // 去除歌词中的换行符
          lrcObj[arr[0]] = arr[1];
        }
      });
      // 存储数据
      this.currentMusicLyric = lrcObj;
      // console.log(this.currentMusicLyric);
    },
  },
  watch:{
    value() {
            let i = 0
            // 循环歌词对象
            for (let key in this.currentMusicLyric) {
            // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
                if (+key == this.value) {
                    this.lyricIndex = i;
                    // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
                    if (i > 5) {
                        this.$refs.lyric.scrollTop = 30 * (i - 5);
                    }
                }
                i++;
            }
        }
  }
};
</script>

<style lang="less">
#play {
  width: 1200px;
  margin: 0 auto;
  .play-page {
    display: flex;
    .left {
      width: 400px;
      margin-left: 100px;
      .img {
        margin-top: 50px;
        height: 300px;
        background-image: url("@/assets/disc.png");
        background-repeat: no-repeat;
        position: relative;
        .avatar {
          width: 160px;
          height: 160px;
          position: absolute;
          margin-top: 40px;
          margin-left: 40px;
        }
        .stylus {
          position: absolute;
          margin-left: 220px;
          transform: rotate(-10deg);
          transform-origin: 0 0;
          transition: all 20s;
        }
      }
      .audio{
        width: 400px;
      }
    }
    .right {
      width: 800px;
      
      .name{
        width: 100%;
        text-align: center;
      }
      .lyric {
        width: 100%;
        height: 600px;
        overflow: auto;
        p {
          text-align: center;
        }
      }
    }
  }
}
</style>
