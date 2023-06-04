<template>
  <div class="musicitem">
    <!-- 榜单音乐列表 -->
    <headernav></headernav>
    <div class="music">
      <div class="music-detail">
        <div class="coverImg">
          <img :src="playlist.coverImgUrl" />
        </div>
        <div class="right">
          <div class="title">{{ playlist.name }}</div>
          <div class="content">{{ playlist.description }}</div>
        </div>
      </div>
      <div class="music-list">
        <div class="box" v-for="(item, index) in music">
          <RouterLink :to="{ path: '/play', query: { id: item.id } }">
            <div class="index">{{ index + 1 }}</div>
            <div class="name">
              <i class="el-icon-video-play"></i>
              {{ item.name }}
            </div>
            <div class="ar">
              <div class="ar-name" v-for="i in item.ar">
                <i class="el-icon-mic"></i>
                {{ i.name }}
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicdetail } from "@/api/api";
import { RouterLink } from "vue-router";
export default {
  name: "musicitem",
  data() {
    return {
      playlist: [],
      music: [],
    };
  },
  components: {
    headernav: () => import("@/components/common/HeaderNav.vue"),
    RouterLink,
  },
  created() {
    this.getMusicdetail();
  },
  methods: {
    async getMusicdetail() {
      try {
        //获取歌单id
        let id = this.$route.query.id;
        //传递参数并调用接口
        const { data: res } = await getMusicdetail(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        this.playlist = res.playlist;
        this.music = res.playlist.tracks;
        console.log(this.music);
      } catch (error) {
        console.log("错误", error);
      }
    },
    // play(){

    // }
  },
};
</script>

<style lang="less">
.musicitem {
  width: 1200px;
  margin: 0 auto;

  .music {
    .music-detail {
      width: 100%;
      height: 300px;
      display: flex;

      .coverImg {
        width: 30%;
        height: 100%;

        img {
          margin: 50px 80px;
          width: 200px;
          height: 200px;
        }
      }

      .right {
        width: 70%;
        margin-top: 75px;

        .title {
          font-size: 20px;
          font-weight: bold;
        }

        .content {
          font-size: 16px;
          width: 80%;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
    .music-list {
      width: 100%;
      .box {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        a {
          text-decoration: none;
          color: black;
          display: flex;
          .index {
            width: 100px;
            text-align: center;
          }
          .name {
            margin-left: 200px;
            width: 500px;
          }
          .ar {
            display: flex;
            width: 350px;

            .ar-name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
