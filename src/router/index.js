import Vue from 'vue'
import VueRouter from "vue-router"

const Main = () => import('@/pages/Main/Main')
const MsgBoard = () => import('@/pages/MsgBoard/MsgBoard')
const PhotoWall = () => import('@/pages/PhotoWall/PhotoWall')

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/photoWall'
    },{
      path:'/main',
      component: Main
    },{
      path:'/msgBoard',
      component: MsgBoard
    },{
      path:'/photoWall',
      component: PhotoWall,
    },
  ]
})
