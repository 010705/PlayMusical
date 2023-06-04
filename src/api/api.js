import instance from './request'
// 首页轮播图
export function getBanner(){
    return instance({
        url:"/banner",
        method:"GET",
    })
}

// 热门歌单分类
export function gethotlistTag(){
    return instance({
        url:"/playlist/hot",
        method:"GET",
    })
}

// 热门歌单列表
export function getPlayList (){
    return instance({
        url:"/top/playlist?limit=5&order=hot",
        method:"GET",
    })
}

// 排行榜
export function getRankList (){
    return instance({
        url:"/toplist/detail",
        method:"GET",
    })
}

//排行榜内容
export function getRankContent (){
    return instance({
        url:`/toplist/detail?id=${id}`,
        method:"GET",
    })
}

//最新MV
export function getNewestMv (){
    return instance({
        url:"/mv/first?limit=10",
        method:"GET",
    })
}

//登录
export function login(){
    return instance({
        url:"/login",
        method:"GET",
        withCredentials: true
    })
}

//歌曲大类
export function Sort(){
    return instance({
        url:"/playlist/catlist",
        method:"GET",
    })
}

//全部歌单
export function getall(){
    return instance({
        url:"/top/playlist",
        method:"GET",
    })
}

//全部MV
export function getAllMV(){
    return instance({
        url:"/mv/all?limit=200",
        method:"GET",
    })
}

//最新MV
export function getnewMV(){
    return instance({
        url:"/mv/first?limit=70",
        method:"GET",
    })
}

//网易出品MV
export function getMV(){
    return instance({
        url:"/mv/exclusive/rcmd?limit=60",
        method:"GET",
    })
}

//获取歌单详情
export function getMusicdetail(id){
    return instance({
        url:`/playlist/detail?id=${id}`,
        method:"GET",
    })
}

//获取MV详情
export function getMVdetail(id){
    return instance({
        url:`/mv/detail?mvid=${id}`,
        method:"GET",
    })
}
//获取MV视频
export function getMVvideo(id){
    return instance({
        url:`/mv/url?id=${id}`,
        method:"GET",
    })
}

//获取歌手分类列表
export function getSingerList(cat){
    return instance({
        url:`/artist/list?cat=${cat}`,
        method:"GET",
    })
}
//获取热门歌手
export function getTopSinger(){
    return instance({
        url:'/top/artists',
        method:"GET",
    })
}

//获取歌手音乐列表
export function getSingerMusic(id){
    return instance({
        url:`/artist/top/song?id=${id}`,
        method:"GET",
    })
}

//获取歌手信息
export function getSingerInfo(id){
    return instance({
        url:`/artists?id=${id}`,
        method:"GET",
    })
}

//获取音乐播放url
export function getMusicUrl(id){
    return instance({
        url:`/song/url?id=${id}`,
        method:"GET",
    })
}
//获取歌词
export function getLyric(id){
    return instance({
        url:`/lyric?id=${id}`,
        method:"GET",
    })
}
//获取歌曲详情
export function getSongDetail(id){
    return instance({
        url:`/song/detail?ids=${id}`,
        method:"GET",
    })
}

