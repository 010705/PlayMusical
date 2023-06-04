<template>
    <div class="newestMv">
        <div class="mv">
            <div class="mvTitle">
                <h2>最新MV</h2>
                <div class="subtitle">
                    <span v-for="item in area">
                        {{ item }}
                    </span>
                </div>
            </div>
            <div class="mvList">
                <div v-for="item in mvLists" class="mvlistEl">
                    <RouterLink :to="{ path: '/mvitem', query: { id: item.id }}">
                        <img :src="item.cover" class="coverImg" />
                        <div class="mvdetail">
                            <a href="">{{ item.name }}</a><br>
                            <a href="">{{ item.artistName }}</a>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getNewestMv } from "@/api/api"
import { RouterLink } from "vue-router"
export default {
    data() {
        return {
            area: ["全国", "内地", "港台", "欧美", "韩国", "日本"],
            mvLists: []
        };
    },
    mounted() {
        this.getNewestMv();
    },
    methods: {
        // 最新MV
        async getNewestMv() {
            const { data: res } = await getNewestMv();
            if (res.code !== 200) {
                return this.$msg.error("数据请求失败");
            }
            this.mvLists = res.data;
        },
    },
    components: { RouterLink }
}
</script>
  
<style lang="less">
.newestMv {
    height: 500px;
    width: 100%;

    .mv {
        .mvTitle {
            h2 {
                text-align: center;
                height: 30px;
            }

            .subtitle {
                display: flex;
                justify-content: center;
                height: 30px;

                span {
                    margin: 0 20px;
                }
            }
        }

        .mvList {
            height: 440px;
            width: 1200px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            .mvlistEl {
                width: 200px;
                height: 200px;
                margin: 5px 10px;

                .coverImg {
                    width: 100%;
                    height: 70%;
                }

                .mvdetail {
                    width: 100%;
                    height: 30%;
                    font-size: 13px;

                    :first-child {
                        text-decoration: none;
                        color: black;
                    }

                    :last-child {
                        text-decoration: none;
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>
  