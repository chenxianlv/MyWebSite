<template>
  <div class="focus w" @mouseenter="stopAutoPlay" @mouseleave="autoPlay">
    <ul>
      <li :id="'a'+index" v-for="(imgObj,index) in imgObjs" :key="index">
        <a href="javascript:">
          <img :src="imgObj.url" alt="">
        </a>
        <h3>{{ imgObj.description }}</h3>
      </li>
    </ul>
    <ol class="circle" :style="{marginLeft:-0.5*olWidth+'px'}">
      <li :class="{'current':activeIndex===_-1}" v-for="_ in imgObjs.length" :key="_"></li>
    </ol>
    <a href="javascript:" class="button_l iconfont" @click="prePic">&#xe6ab;</a>
    <a href="javascript:" class="button_r iconfont" @click="nextPic">&#xe6ad;</a>
  </div>
</template>

<script>
//todo 添加点击小圆点跳转
//todo 点击图片弹出详情
export default {
  name: "Carousel",
  //imgObjs:[{url:'xx',description:'xx'}]
  props: ['imgObjs'],
  data() {
    return {
      olWidth: 0,
      activeIndex: 0,
      isMoving: false,
      intervalId: {}
    }
  },
  methods: {
    autoPlay() {
      this.intervalId = setInterval(() => {
        this.nextPic()
      }, 3000)
    },
    stopAutoPlay() {
      clearInterval(this.intervalId)
    },
    nextPic() {
      if (this.isMoving) return
      let index = this.activeIndex
      let index_change = index >= this.imgObjs.length - 1 ? 0 : index + 1
      document.querySelector('#a' + index).className = 'show left-leave-active left-leave'
      document.querySelector('#a' + index_change).className = 'show left-enter-active left-enter'
      this.isMoving = true

      setTimeout(() => {
        document.querySelector('#a' + index).className = ''
        document.querySelector('#a' + index_change).className = 'show'
        this.isMoving = false
      }, 500)
      this.activeIndex = index_change
    },
    prePic() {
      if (this.isMoving) return
      let index = this.activeIndex
      let index_change = index <= 0 ? this.imgObjs.length - 1 : index - 1
      document.querySelector('#a' + index).className = 'show right-leave-active right-leave'
      document.querySelector('#a' + index_change).className = 'show right-enter-active right-enter'
      this.isMoving = true

      setTimeout(() => {
        document.querySelector('#a' + index).className = ''
        document.querySelector('#a' + index_change).className = 'show'
        this.isMoving = false
      }, 500)
      this.activeIndex = index_change
    }
  },
  mounted() {
    this.olWidth = document.querySelector('.focus .circle').offsetWidth
    document.querySelector('#a' + this.activeIndex).className = 'show'
    this.autoPlay()
  }
}
</script>

<style scoped lang="less">
@arrow-size: 40px;
.focus {
  position: relative;
  height: 562.5px;
  overflow: hidden;

  img {
    width: @page-width;
  }

  ul li {
    opacity: 0;
    position: absolute;

    h3 {
      position: absolute;
      height: 35px;
      width: 100%;
      text-align: center;
      bottom: 0;
      font-size: 18px;
      line-height: 35px;
      background-color: rgba(0, 0, 0, .3);
      color: #ffffff;
    }
  }

  & > a {
    position: absolute;
    color: #fff;
    font-size: @arrow-size;
  }

  .button_l {
    left: 30px;
    top: 50%;
    margin-top: -0.5*@arrow-size;
  }

  .button_r {
    right: 30px;
    top: 50%;
    margin-top: -0.5*@arrow-size;
  }

  .circle {
    position: absolute;
    bottom: 45px;
    left: 50%;
  }

  .circle li {
    float: left;
    width: 12px;
    height: 12px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .current {
    background-color: #fff !important;
  }

  .show {
    opacity: 1;
  }

  .right-leave-active {
    left: 0;
    transition: transform 0.5s;
  }

  .right-enter-active {
    left: -100%;
    transition: transform 0.5s;
  }

  .right-leave, .right-enter {
    transform: translateX(100%);
  }

  .left-leave-active {
    left: 0;
    transition: transform 0.5s;
  }

  .left-enter-active {
    left: 100%;
    transition: transform 0.5s;
  }

  .left-leave, .left-enter {
    transform: translateX(-100%);
  }
}
</style>
