<template>
  <div id="rank">
    <headernav></headernav>
    <div class="content">
      <div class="left">
        <div class="list" v-for="item in rankTitleList">
          <RouterLink :to="{ path: '/rank/rankL', query: { id: item.id } }">
            <div class="imgCover">
              <img :src="item.coverImgUrl" />
            </div>
            <div class="name">{{ item.name }}</div>
          </RouterLink>
        </div>
      </div>
      <div class="right">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankList, getRankContent } from "@/api/api";
import { RouterLink, RouterView } from "vue-router";
export default {
  name: "rank",
  data() {
    return {
      rankTitleList: [],
      id: [],
    };
  },
  components: {
    headernav: () => import("@/components/common/HeaderNav.vue"),
    RouterLink,
    RouterView,
  },
  mounted() {
    this.getRankList();
  },
  methods: {
    //获取排行榜分类
    async getRankList() {
      const { data: res } = await getRankList();

      if (res.code !== 200) {
        return this.$msg.error("数据请求失败");
      }
      this.rankTitleList = res.list;
    },
//     //获取排行榜内容
//     async getRankContent() {
//       let id = this.$route.query.id;
//       const { data: res } = await getRankContent(id);

//       if (res.code !== 200) {
//         return this.$msg.error("数据请求失败");
//       }
//       this.rankContentList = res.list;
//       //   res.list.forEach((item)=>{
//       //     this.ids=item.id
//       //   })

//       // this.listTitle = res.list.splice(0, 4);
//       // console.log(this.rankContentList);
//     },
//   },
//   watch: {
//     // 方法1 //监听路由是否变化
//     $route(to, from) {
//       if (to.query.id !== from.query.id) {
//         this.id = to.query.id;
//         this.getRankContent(this.id); //重新加载数据
//       }
//     },
  },
};
</script>

<style lang="less">
#rank {
  width: 1200px;
  margin: 0 auto;
  .content {
    width: 100%;
    display: flex;
    .left {
      width: 20%;
      .list {
        width: 100%;
        height: 50px;
        display: flex;
        margin-bottom: 20px;
        a {
          text-decoration: none;
          display: flex;
          color: black;
        }
        .imgCover {
          height: 100%;
          img {
            width: 50px;
            height: 50px;
          }
        }
        .name {
          width: 170px;
          margin-left: 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .right {
      width: 70%;
    }
  }
}
</style>
