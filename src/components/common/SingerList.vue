<template>
  <div class="right-list">
    <div class="singer" v-for="i in Singers">
      <router-link :to="{ path: '/singermusic', query: { id: i.id } }">
        <el-avatar :size="100" :src="i.img1v1Url"></el-avatar>
        <div class="name">{{ i.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
.right-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;

  .singer {
    width: 150px;
    height: 150px;

    .el-avatar {
      margin: 0 25px;
    }

    .name {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
