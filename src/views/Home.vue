<template>
    <div class="home">
        <headernav></headernav>
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in banners" >
                <img :src='item.imageUrl' :alt="item.imageUrl" class='image' />
            </el-carousel-item>
        </el-carousel>
        <hotplaylist></hotplaylist>
        <!-- <rankingList></rankingList> -->
        <newestMv></newestMv>
    </div>
</template>
  
<script>
import hotplaylist from '@/components/common/hotplaylist.vue'
// import rankingList from '@/components/common/rankingList.vue'
import newestMv from '@/components/common/newestMv.vue'
import { getBanner } from "@/api/api.js"
export default {
    name: 'home',
    data() {
        return {
            banners: [],
        }
    },
    components: {
        headernav:()=>import("@/components/common/HeaderNav.vue"),
        hotplaylist,
        // rankingList,
        newestMv
    },
    mounted() {
        this.getBanners();
    },
    methods: {
        async getBanners() {
            try {
                const { data: res } = await getBanner()

                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };

                this.banners = res.banners
            } catch (error) {
                console.log('错误', error)
            }
        },
    },
}
</script>
  
<style lang="less">
html,
body {
    width: 100%;

    .home {
        width: 1200px;
        margin: 0 auto;
        
        .el-carousel__item h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }

        .image {
            width: 100%;
            height: 100%;
        }

    }
}
</style>
  