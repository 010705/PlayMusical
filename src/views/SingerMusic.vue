<template>
  <div class="singermusic">
    <!-- 歌手音乐列表 -->
    <headernav></headernav>
    <div class="singer">
      <!-- 歌手信息介绍 -->
      <div class="singer-info">
        <div class="img">
          <img :src="singer.picUrl" />
        </div>
        <div class="intro">
          <h2>{{ singer.name }}</h2>
          {{ singer.briefDesc }}
        </div>
      </div>
      <!-- 歌手单曲列表 -->
      <div class="title">单曲</div>
      <div v-for="(item, index) in songs" :class="'all-list-' + (index % 2)">
        <RouterLink :to="{ path: '/play', query: { id: item.id } }">
          <div class="index">{{ index + 1 }}</div>
          <div class="name">
            <i class="el-icon-video-play"></i>
            {{ item.name }}</div>
          <span v-for="i in detail" class="ar">
            <i class="el-icon-mic"></i>
            {{ i.name }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerMusic, getSingerInfo } from "@/api/api";
import { RouterLink } from "vue-router";
export default {
  name: "singermusic",
  data() {
    return {
      songs: [],
      ar: [],
      detail: [],
      singer: [],
    };
  },
  components: {
    headernav: () => import("@/components/common/HeaderNav.vue"),
    RouterLink,
  },
  created() {
    this.getSingerMusic();
    this.getSingerInfo();
  },
  methods: {
    async getSingerMusic() {
      try {
        //获取歌单id
        let id = this.$route.query.id;
        //传递参数并调用接口
        const { data: res } = await getSingerMusic(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        res.songs.forEach((item) => {
          this.detail = item.ar;
          console.log(this.detail);
        });
        this.songs = res.songs;
        console.log(this.songs);
      } catch (error) {
        console.log("错误", error);
      }
    },
    async getSingerInfo() {
      try {
        //获取歌单id
        let id = this.$route.query.id;
        //传递参数并调用接口
        const { data: res } = await getSingerInfo(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        this.singer = res.artist;
        console.log(this.singer);
      } catch (error) {
        console.log("错误", error);
      }
    },
  },
};
</script>

<style lang="less">
.singermusic {
  width: 1200px;
  margin: 0 auto;

  .singer {
    .singer-info {
      height: 400px;
      display: flex;
      margin-right: 50px;
      .img {
        width: 30%;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .intro {
        width: 70%;
        margin-top: 50px;
      }
    }
    .title {
      width: 100%;
      margin: 20px 25px;
      font-size: 20px;
      font-weight: bold;
    }
    .all-list-0 {
      width: 100%;
      display: flex;
      background-color: #f5f5f5;
      height: 40px;
      display: flex;
      align-items: center;
    }

    .all-list-1 {
      width: 100%;
      height: 40px;
      display: flex;
      background-color: #fff;
      display: flex;
      align-items: center;
    }
    a {
        display: flex;
        text-decoration: none;
      .index {
        width: 100px;
        text-align: center;
      }

      .name {
        width: 500px;
        margin: 0 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
