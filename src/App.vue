<template>
  <div id="app">
    <router-view/>
    <footerMusic ></footerMusic>
  </div>
</template>

<script>
import footerMusic from "@/components/common/FooterMusic.vue"
export default{
  components:{
    footerMusic
  }
}
</script>

<style lang="less">
#app{
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 100px;
}
</style>
