<template>
  <div class="box">
    <ul class="nav clearfix">
      <li v-for="(imgInfo,index) in imgInfos" :key="index">
        <a @click="titleNow=imgInfo.title" :class="{active:imgInfo.title===titleNow}" href="javascript:">
          {{ imgInfo.title }}
        </a>
      </li>
    </ul>
    <ul class="imgsContainer clearfix" :key="titleNow">
      <li class="hover-float" v-for="(img,index) in imgs" :key="index">
        <a href="javascript:" @click="a_handler" :id="JSON.stringify(img)">
          <img :src="img.url" alt="">
        </a>
        <span id="upper">{{img.upper}}</span>
        <span id="date">{{
            handleFormatData(img.date)
          }}</span>
        <div id="description" :title="img.description"> {{img.description}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from '@/assets/js'
import {mapActions} from "vuex";
export default {
  name: "Menu",
  props:['openMask'],
  data() {
    return {
      titleNow: '人物',
      imgInfos: this.$store.state.imgInfos
    }
  },
  computed: {
    imgs() {
      return this.imgInfos.find(e => e.title === this.titleNow).imgs
    },
  },
  methods: {
    a_handler(e){
      this.openMask(this.changeSelectedImg,JSON.parse(e.currentTarget.id));
    },
    ...mapActions(['changeSelectedImg']),
    handleFormatData(){
      return formatDate(...arguments)
    }
  },
}


</script>

<style scoped lang="less">
@nav-height: 60px;
@img-width: 300px;

.box {
  width: 100%;
  background-color: #fff;

  .nav {
    height: @nav-height;
    border-bottom: 1px solid #f0f2f7;

    li {
      float: left;

      a {
        display: block;
        padding: 0 15px;
        line-height: @nav-height;
        text-align: center;

        &:hover {
          color: #175199;
        }
      }
    }

    .active {
      color: #0066ff;
    }
  }

  .imgsContainer {
    width: @page-width + 10px;
    li {
      float: left;
      width: @img-width;
      height: ($width/16)*9 + 60px;
      margin: 20px (@page-width - @img-width*3)*0.2 20px (@page-width - @img-width*3)*0.15;
      padding: 15px;
      border: 1px solid @tint-border-color;
      border-radius: @common-border-radius;

      img {
        display: block;
        width: 100%;
        margin-bottom: 9px;
      }
      #upper,#date {
        font-size: 14px;
        color: @tint-font-color;
        margin-bottom: 9px;
      }
      #upper {
        float: left;
      }
      #date {
        float: right;
      }
      #description {
        width: 100%;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
