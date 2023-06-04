<template>
    <div class="mv">
        <headernav></headernav>
        <div class="mvlist">
            <el-tabs v-model="activeName">
                <el-tab-pane label="全部MV" name="first">
                    <div class="all">
                        <div class="list1" v-for="item in allMV">
                            <router-link :to="{ path: '/mvitem', query: { id: item.id } }">
                                <img :src="item.cover" />
                                <span>{{ item.name }}</span>
                            </router-link>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="最新MV" name="second">
                    <div class="new">
                        <div class="list2" v-for="i in newMV">
                            <router-link :to="{ path: '/mvitem', query: { id: i.id } }">
                                <img :src="i.cover" />
                                <span>{{ i.name }}</span>
                            </router-link>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="网易出品MV" name="third">
                    <div class="wyMV">
                        <div class="list3" v-for="s in wyMV">
                            <router-link :to="{ path: '/mvitem', query: { id: s.id } }">
                                <img :src="s.cover" />
                                <span>{{ s.name }}</span>
                            </router-link>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
  
<script>
import { getAllMV, getnewMV, getMV } from '@/api/api';
import { RouterLink } from "vue-router"
export default {
    name: 'MV',
    data() {
        return {
            activeName: 'first',
            allMV: [],
            newMV: [],
            wyMV: [],
        }
    },
    components: {
        headernav: () => import("@/components/common/HeaderNav.vue"),
        RouterLink
    },
    created() {
        this.getAllMV()
        this.getnewMV()
        this.getMV()
    },
    mounted() {
        // if (location.href.indexOf("#reloaded") == -1) {
        //         location.href = location.href + "#reloaded";
        //         location.reload();
        //     }
    },
    methods: {
        async getAllMV() {
            try {
                const { data: res } = await getAllMV()

                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };

                this.allMV = res.data
            } catch (error) {
                console.log('错误', error)
            }
        },
        async getnewMV() {
            try {
                const { data: res } = await getnewMV()

                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };

                this.newMV = res.data
            } catch (error) {
                console.log('错误', error)
            }
        },
        async getMV() {
            try {
                const { data: res } = await getMV()

                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };

                this.wyMV = res.data
            } catch (error) {
                console.log('错误', error)
            }
        },
    },
}
</script>
  
<style lang="less">
.mv {
    width: 1200px;
    margin: 0 auto;

    .headernav {
        width: 1200px;
    }

    .mvlist {
        width: 1200px;

        .el-tabs {
            margin: 30px 10px;
        }

        .all {
            width: 1200px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            .list1 {
                width: 200px;
                height: 200px;
                margin: 0 20px;

                img {
                    width: 200px;
                    height: 150px;
                }

                span {
                    font-size: 14px;
                }
            }
        }

        .new {
            width: 1200px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            .list2 {
                width: 200px;
                height: 200px;
                margin: 0 20px;

                img {
                    width: 200px;
                    height: 150px;
                }

                span {
                    font-size: 14px;
                }
            }
        }

        .wyMV {
            width: 1200px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            .list3 {
                width: 200px;
                height: 200px;
                margin: 0 20px;

                img {
                    width: 200px;
                    height: 150px;
                }

                span {
                    font-size: 14px;
                }
            }
        }
    }

    a {
        color: black;
        text-decoration: none;
    }
}
</style>
  