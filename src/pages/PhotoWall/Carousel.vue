<template>
  <div class="focus w" @mouseenter="isAutoPlaying=false" @mouseleave="isAutoPlaying=true">
    <ul>
      <li ref="index" :id="'a'+index" v-for="(imgObj,index) in imgObjs" :key="index">
        <a href="javascript:" @click="a_handler" :id="JSON.stringify(imgObj)">
          <img :src="imgObj.url" alt="">
        </a>
        <h3>{{ imgObj.description }}</h3>
      </li>
    </ul>
    <ol class="circle" :style="{marginLeft:-0.5*olWidth+'px'}">
      <li
          @click="toPic($event,index)"
          :class="{'current':activeIndex===index}"
          v-for="(num,index) in imgObjs.length"
          :key="num"
      ></li>
    </ol>
    <a href="javascript:" class="button_l iconfont" @click="prePic">&#xe6ab;</a>
    <a href="javascript:" class="button_r iconfont" @click="nextPic">&#xe6ad;</a>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Carousel",
  props: ['openMask'],
  data() {
    return {
      olWidth: 0,
      activeIndex: 0,
      isMoving: false,
      isAutoPlaying: true,
      intervalId: 0,
      imgObjs: this.$store.state.recommendImgs
    }
  },
  methods: {
    autoPlay() {
      this.intervalId = setInterval(() => {
        if (!this.isAutoPlaying) return
        this.nextPic()
      }, 3000)
    },
    turnTo(targetIndex, next=true) {
      if (this.isMoving) return
      let index = this.activeIndex
      if (targetIndex === index) return
      if (next) {
        this.$refs.index[index].className = 'show left-leave-active left-leave'
        this.$refs.index[targetIndex].className = 'show left-enter-active left-enter'
      }else{
        this.$refs.index[index].className = 'show right-leave-active right-leave'
        this.$refs.index[targetIndex].className = 'show right-enter-active right-enter'
      }
      this.isMoving = true
      setTimeout(() => {
        this.$refs.index[index].className = ''
        this.$refs.index[targetIndex].className = 'show'
        this.isMoving = false
      }, 700)
      this.activeIndex = targetIndex
    },
    nextPic() {
      let index_change = this.activeIndex >= this.imgObjs.length - 1 ? 0 : this.activeIndex + 1
      this.turnTo(index_change,true)
    },
    prePic() {
      let index_change = this.activeIndex <= 0 ? this.imgObjs.length - 1 : this.activeIndex - 1
      this.turnTo(index_change,false)
    },
    //next：布尔值，为真时表示向左移动显示下一张
    toPic(e, targetIndex){
      let index = this.activeIndex
      if (targetIndex === index) return
      if (index < targetIndex) {
        this.turnTo(targetIndex,true)
      }else {
        this.turnTo(targetIndex,false)
      }
    },
    a_handler(e){
      this.openMask(this.changeSelectedImg,JSON.parse(e.currentTarget.id));
    },
    ...mapActions(['changeSelectedImg'])
  },
  mounted() {
    this.olWidth = document.querySelector('.focus .circle').offsetWidth
    document.querySelector('#a' + this.activeIndex).className = 'show'
    this.autoPlay()
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>

<style scoped lang="less">
@arrow-size: 40px;
@focus-height: 562.5px;
.focus {
  position: relative;
  height: @focus-height;
  overflow: hidden;

  ul li {
    opacity: 0;
    position: absolute;
    width: @page-width;
    height: @focus-height;
    left: -200%;

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
    img {
      position: absolute;
      width: @page-width;
      top: 50%;
      transform: translateY(-50%) ;
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
    left: 0;
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
