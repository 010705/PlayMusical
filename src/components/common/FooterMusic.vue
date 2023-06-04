<template>
  <div id="footerMusic">
    <div class="avatar" >
        <el-avatar shape="square" :size="90" :src="playList[playListIndex].al.picUrl"> </el-avatar>
    </div>
    <p>{{ playList[playListIndex].al.name }}</p>
    <div class="btn">
        <el-button icon="el-icon-arrow-left" circle @click="getMusicUrl"></el-button>
        <el-button icon="el-icon-caret-right" circle @click="getMusicUrl"></el-button>
        <el-button icon="el-icon-arrow-right" circle @click="getMusicUrl"></el-button>
    </div>
  </div>
</template>

<script>
import { getMusicUrl, getSongDetail} from "@/api/api";
import { mapState } from "vuex";
export default {
  name: "footerMusic",
  data() {
    return {
        songs:[]
    };
  },
  computed:{
    ...mapState(['playList','playListIndex'])
  },
  methods: {
    // 获取歌曲
    async getMusicUrl() {
      try {
        let id = this.$route.query.id;
        const { data: res } = await getMusicUrl(id);
        if (res.code !== 200) {
          return this.$msg.error("数据请求失败");
        }
        this.data = res.data;
        console.log(this.data);
      } catch (error) {
        console.log("错误", error);
      }
    },
  },
};
</script>

<style lang="less">
#footerMusic {
  width: 1200px;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  .avatar {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn{
    width: 300px;
    margin-left: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button{
        margin: 0 20px;
    }
  }
}
</style>
