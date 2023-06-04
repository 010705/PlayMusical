<template>
  <div class="rank">
    <div class="rankTotalTitle">
      <h2>排行榜</h2>
    </div>
    <!-- 内容部分 -->
    <div class="rankList">
      <div v-for="item in rankContentList" class="rankDetail">
        <div class="rank-title">{{ item.name }}</div>
        <div class="rank-content" v-for="i in item.tracks">
          {{ i}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  getRankList,getRankContent } from "@/api/api";

export default {
  data() {
    return {
      listTitle: [],
      rankContentList: [],
      ids:[]
    };
  },
  mounted() {
    this.getRankList();
   this.getRankContent();
  },
  methods: {
    //获取排行榜分类
    // async getRankList() {
    //   const { data: res } = await getRankList();

    //   if (res.code !== 200) {
    //     return this.$msg.error("数据请求失败");
    //   }
    //   this.listTitle = res.list.splice(0, 4);
    //   this.list=this.list.forEach((item)=>{
    //     console.log(item);
    //   })
    //   // console.log(this.list.id);
    // },

    //获取排行榜内容
    async getRankContent() {
      const { data: res } = await getRankContent();

      if (res.code !== 200) {
        return this.$msg.error("数据请求失败");
      }
      this.rankContentList = res.list.splice(0, 4);
      // res.list.forEach((item)=>{
      //   this.ids=item.id
      // })

      // this.listTitle = res.list.splice(0, 4);
      // console.log(this.rankContentList);

    },
  },
};
</script>

<style lang="less">
.rank {
  width: 100%;
  height: 600px;

  .rankTotalTitle {
    text-align: center;
    height: 50px;
  }

  .rankList {
    width: 100%;
    height: 550px;
    display: flex;

    .rankDetail {
      width: 300px;
      height: 100%;

      .rank-title {
        height: 30px;
        text-align: center;
      }

      .rank-content {
      }
    }
  }
}
</style>
