<template>
    <div id="songlist">
        <!-- 歌单主页面 -->
        <headernav></headernav>
        <div class="sort">
            <div v-for="item in categories" class="sortTitle">
                <span>
                    {{ item.name }}
                </span>
                <div class="subitem" v-for="sub in item.children.slice(0, 8)" :key="sub.name">{{ sub.name }} |</div>
            </div>
        </div>
        <div class="all">
            <h2>全部</h2>
            <div class="allList">
                <div class="lbox" v-for="i in  allist">
                    <router-link :to="{ path: '/musicitem', query: { id: i.id } }">
                        <img :src="i.coverImgUrl" class="img" />
                        <div class="detail">
                            {{ i.name }}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import headernav from '@/components/common/HeaderNav.vue'
import { RouterLink } from "vue-router"
import { Sort, getall } from '@/api/api';
export default {
    name: 'songs',
    data() {
        return {
            subItem: [],
            categories: [],
            curTyp: [],
            allist: []
        }
    },
    components: {
        headernav,
        RouterLink
    },
    mounted() {
        this.Sort();
        this.getall();
    },
    methods: {
        // async Sort() {
        //     const { data: res } = await Sort()

        //     if (res.code !== 200) {
        //         return this.$msg.error('数据请求失败')
        //     }
        //     this.sorts = res.categories
        //     this.sub=res.sub.splice(0,8)
        // },
        // async Sort() {
        //     try {
        //         const { data: res } = await Sort()
        //         if (res.code !== 200) {
        //             return this.$msg.error('数据请求失败')
        //         };
        //         this.sorts= res.categories
        //         console.log(this.sorts);
        //     } catch (error) {
        //         console.log('错误', error)
        //     }
        // },
        async Sort() {
            const { data: res } = await Sort()
            this.sub = res.sub

            if (res.code !== 200) {
                return this.$msg.error('数据请求失败')
            }

            for (const k in res.categories) {
                const params = { name: res.categories[k] }

                params.children = this.sub.filter(subItem => { return subItem.category === Number(k) })
                this.categories.push(params)
            }

            this.curType = this.$route.query.cat ? this.$route.query.cat : res.all.name
            this.allList = res.all
        },
        async getall() {
            try {
                const { data: res } = await getall()
                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };
                this.allist = res.playlists
            } catch (error) {
                console.log('错误', error)
            }
        },
    },
}
</script>
  
<style lang="less">
body {
    width: 1200px;
    margin: 0 auto;
}
a{
    color: black;
    text-decoration: none;
}
.sort {
    width: 100%;
    height: 350px;
    border-bottom: 2px solid #999;

    .sortTitle {
        display: flex;

        span {
            width: 50px;
            height: 30px;
            font-weight: bold;
            margin: 20px 50px;
            cursor: pointer;
            font-size: 18px;
        }

        .subitem {
            margin-top: 20px;
            margin-right: 20px;
            cursor: pointer;
            color: #00008B;
        }
    }
}

.all {
    width: 1200px;

    .allList {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .lbox {
            width: 200px;
            height: 200px;
            margin: 20px;

            .img {
                width: 200px;
                height: 150px;
            }

            .detail {
                width: 100%;
            }
        }
    }
}
</style>