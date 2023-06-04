<template>
    <!-- 首页热门歌单模块 -->
    <div class="recom">
        <div class="hotplaylists">
            <h2>热门歌单</h2>
            <div class="span">
                <span v-for="item in hotlistTags" @click="changePlayTag">{{ item.name }}</span>
            </div>
        </div>
        <div class="hotMusicList">
            <div v-for="item in playlists" :key="item.id" class="item">
                <router-link :to="{ path: '/musicitem', query: { id: item.id } }">
                    <img :src="item.coverImgUrl" class="coverImage" />
                    <span>{{ item.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import { gethotlistTag, getPlayList } from "@/api/api.js"
import { RouterLink } from "vue-router"

export default {
    data() {
        return {
            hotlistTags: [],
            playlists: []
        }
    },
    components: {
        RouterLink
    },
    mounted() {
        this.gethotlistTag()
        this.getPlayList()
    },
    methods: {
        // 热门歌单分类标签
        async gethotlistTag() {
            const { data: res } = await gethotlistTag()

            if (res.code !== 200) {
                return this.$msg.error('数据请求失败')
            }

            res.tags.unshift({ name: '为您推荐' })
            this.hotlistTags = res.tags.splice(0, 6)
        },
        // 分类歌单列表
        async getPlayList(params) {
            const { data: res } = await getPlayList(params)

            if (res.code !== 200) {
                return this.$msg.error('数据请求失败')
            }
            this.playlists = res.playlists
        },
        //切换热门歌单类型音乐
        changePlayTag() {

        }
    },
}
</script>
  
<style lang="less">
.recom {
    width: 100%;

    .hotplaylists {
        h2 {
            text-align: center;
        }

        .span {
            display: flex;
            justify-content: center;

            span {
                margin: 20px;
                cursor: pointer
            }
        }
    }

    .hotMusicList {
        height: 250px;
        display: flex;
        justify-content: space-around;

        .item {
            width: 200px;
            height: 200px;

            a {
                color: black;
                text-decoration: none;

                .coverImage {
                    width: 100%;
                    height: 100%;
                }
            }


        }
    }
}
</style>
  