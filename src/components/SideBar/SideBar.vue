<template>
  <transition name="side">
    <div class="box" v-if="isShow">
      <a @click="toTop" href="javascript:" class="toTop iconfont">&#xe6ac;</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    judgeScroll() {
      this.isShow = window.pageYOffset > 400
    },
    toTop(){
      let y = document.documentElement.scrollTop
      let id = setInterval(() => {
        document.documentElement.scrollTop = y = Math.floor(y/2)
        if (y === 0) {
          clearInterval(id)
        }
      },16)
    }
  },
  mounted() {
    this.judgeScroll()
    window.addEventListener('scroll', this.judgeScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.judgeScroll)
  }
}
</script>

<style scoped lang="less">
@left-to-container:40px;
@box-width:40px;
.box {
  width: @box-width;
  position: fixed;
  left: 50%;
  bottom: 10%;
  margin-left: 0.5*@page-width + @left-to-container;
  box-shadow: 2px 1px 7px 1px rgba(0,0,0,.2);
  border-radius: 8px;
  background-color: #fff;
}
.toTop {
  display: block;
  width: @box-width;
  height: @box-width;
  font-size: 25px;
  text-align: center;
  line-height: $height;
}
.side-enter-active,.side-leave-active{
  transition: all .3s;
}
.side-enter{
  transform: translateY(-20%);
  opacity: 0;
}
.side-enter-to{
  transform: translateY(0%);
  opacity: 1;
}
.side-leave{
   transform: translateY(0%);
   opacity: 1;
 }
.side-leave-to{
  transform: translateY(-20%);
  opacity: 0;
}
</style>
