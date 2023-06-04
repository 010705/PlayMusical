<template>
  <!-- 头部导航栏 -->
  <div class="headernav">
    <div class="logo">
      <img src="../../assets/logo.jpg" alt="" />
    </div>
    <div class="header-content">
      <span @click="home">首页</span>
      <span @click="rank">排行榜</span>
      <span @click="songs">歌单</span>
      <span @click="mv">MV</span>
      <span @click="singer">歌手</span>
      <span @click="myMusic">我的音乐</span>
    </div>
    <div class="find">
      <el-input placeholder="请输入歌名、歌词、歌手或专辑" suffix-icon="el-icon-search"></el-input>
    </div>
    <div class="login">
      <el-button type="text" @click="dialogVisible = true">登录</el-button>
      <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-input placeholder="请输入账号"></el-input>
        <el-input placeholder="请输入密码" show-password></el-input>
        <el-button type="primary">登录</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import home from '@/views/Home.vue';
import rank from '@/views/Rank.vue';

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    home() {
      this.$router.push('/home').catch(err => {
        console.log('输出报错', err)
      })
    },
    rank() {
      this.$router.push('/rank').catch(err => {
        console.log('输出报错', err)
      })
    },
    songs() {
      this.$router.push('/songs').catch(err => {
        console.log('输出报错', err)
      })
    },
    mv() {
      this.$router.push('/mv').catch(err => {
        console.log('输出报错', err)
      })
    },
    singer() {
      this.$router.push('/singer').catch(err => {
        console.log('输出报错', err)
      })
    },
    myMusic(){
      this.$router.push('/myMusic').catch(err => {
        console.log('输出报错', err)
      })
    }
  }
};
</script>
  
<style lang="less">
.headernav {
  min-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  height: 100px;
  .logo {
    width: 145px;
  }

  .header-content {
    width: 600px;
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    span {
      cursor: pointer
    }
  }

  .find {
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    .el-input {
      width: 250px;
      border: none;
    }
  }

  .login {
    width: 100px;
  }
}
</style>
  