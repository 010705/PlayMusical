<template>
    <div class="mvitem">
        <!-- MV视频播放页面 -->
        <headernav></headernav>
        <div class="video">
            <video :src="urldata.url" autoplay @click="pause"></video>
                <span style="font-size:24px;margin: 50px;">{{ MVdata.name }}</span>
                <span>歌手：{{ MVdata.artistName }}</span>
        </div>
        <div class="commemt">
            <!-- 评论区-->
            <div class="title">
                <span>评论</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getMVdetail, getMVvideo } from "@/api/api"
export default {
    name: 'mvitem',
    data() {
        return {
            MVdata: [],
            urldata: [],
            artists: []
        }
    },
    components: {
        headernav: () => import("@/components/common/HeaderNav.vue"),
    },
    mounted() {
        this.getMVdetail(),
            this.getMVvideo()
    },
    methods: {
        pause() {
            var video = document.querySelector("video")
            if (video.paused) {
                video.play()
            } else if (video.play()) {
                video.pause()
            }
        },
        async getMVdetail() {
            try {
                //获取MVid
                let id = this.$route.query.id
                //传递参数并调用接口
                const { data: res } = await getMVdetail(id)
                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };
                this.MVdata = res.data
                console.log(this.MVdata);
                // this.artists=res.data.artists
                // console.log(this.artists);
            } catch (error) {
                console.log('错误', error)
            }
        },
        async getMVvideo() {
            try {
                //获取MV视频id
                let id = this.$route.query.id
                //传递参数并调用接口
                const { data: res } = await getMVvideo(id)
                if (res.code !== 200) {
                    return this.$msg.error('数据请求失败')
                };
                this.urldata = res.data
                console.log(this.urldata);
            } catch (error) {
                console.log('错误', error)
            }
        },
    },
}
</script>
  
<style lang="less">
.mvitem {
    width: 1200px;
    margin: 0 auto;

    .video {
        width: 100%;
        padding-top: 50px;
        height: 650px;
        video {
            width: 100%;
            height: 600px;
        }
    }

    .commemt {
        width: 100%;
        height: 100px;
        margin: 50px;
        .title{
            border-bottom: #999 solid;
        }
    }
}
</style>
  