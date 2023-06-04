<template>
    <div class="singer">
        <headernav></headernav>
        <div class="list">
            <!-- 左侧导航 -->
            <div class="left">
                <div class="title" v-for="(item, index) in type" :key="index" @click="getSingerList">
                    <RouterLink :to="{ path: '/singer/singerlist', query: { cat: cats[index]} }">
                        <span @click="getSingerList">{{ item }}</span>
                    </RouterLink>
                </div>
            </div>
            <!-- 右侧歌手列表 -->
            <div class="right">
                <router-view />
                <div class="right-list">
                    <div class="singer" v-for="i in Singers">
                        <router-link :to="{ path: '/singermusic', query: { id: i.id} }">
                            <el-avatar :size="100" :src="i.img1v1Url"></el-avatar>
                            <div class="name">{{ i.name }}</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { RouterLink } from "vue-router"
import { getSingerList } from "@/api/api"
export default {
    name: 'singer',
    data() {
        return {
            type: ["入驻歌手", "华语男歌手", "华语女歌手", "华语组合/乐队", "欧美男歌手", "欧美女歌手", "欧美组合/乐队",
                "日本男歌手", "日本女歌手", "日本组合/乐队", "韩国男歌手", "韩国女歌手", "韩国组合/乐队", "其他男歌手", "其他女歌手", "其他组合/乐队"],
            cats: [5001, 1001, 1002, 1003, 2001, 2002, 2003, 6001, 6002, 6003, 7001, 7002, 7003, 4001, 4002, 4003],
            Singers: []
        }
    },
    components: {
        headernav: () => import("@/components/common/HeaderNav.vue"),
        RouterLink
    },
    mounted() {
        this.getSingerList()
    },
    methods: {
        async getSingerList() {
            try {
                let cat = this.$route.query.cat
                console.log(cat);
                const { data: res } = await getSingerList(cat)
                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };
                this.Singers = res.artists
                console.log(this.Singers);
            } catch (error) {
                console.log('错误', error)
            }
        },
    },
    watch: {
        // 方法1 //监听路由是否变化
        '$route'(to, from) {
            if (to.query.cat !== from.query.cat) {
                this.cat = to.query.cat;
                this.getSingerList(this.cat);//重新加载数据
            }
        }
    },

}
</script>
  
<style lang="less">
.singer {
    width: 1200px;
    margin: 0 auto;

    .list {
        display: flex;

        .left {
            width: 20%;
            height: 100%;
            margin-top: 50px;

            .title {
                height: 50px;
                margin-left: 30px;

                a {
                    text-decoration: none;
                }
            }
        }

        .right {
            width: 80%;

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
        }
    }

}
</style>
  