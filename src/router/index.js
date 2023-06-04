import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/Rank.vue'),
    children:[{
      path: '/rankL',
      name: 'rankL',
    }]
  },
  {
    path: '/songs',
    name: 'songs',
    component: () => import('../views/Songs.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('../views/MV.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('../views/Singer.vue'),
    children: [
      {
        path: 'singerlist',
        name: 'singerlist',
      }
    ]
  },
  {
    path: '/musicitem',
    name: 'musicitem',
    component: () => import('../views/musicItem.vue')
  },
  {
    path: '/mvitem',
    name: 'mvitem',
    component: () => import('../views//Mvitem.vue')
  },
  {
    path: '/singermusic',
    name: 'singermusic',
    component: () => import('../views/SingerMusic.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/myMusic',
    name: 'myMusic',
    component: () => import('../views/MyMusic.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/myMusic'){
    const token=localStorage.getItem('token')
    if(token){
      next()
    }
    else{
      next('/login')
    }
  }
  else{  
    // 如果不去后台则直接跳转
    next()
  }
})

export default router
