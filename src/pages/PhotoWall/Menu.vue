<template>
  <div class="box">
    <ul class="nav clearfix">
      <li v-for="(imgInfo,index) in imgInfos" :key="index">
        <a @click="categoryNow=imgInfo.category" :class="{active:imgInfo.category===categoryNow}" href="javascript:">
          {{ imgInfo.category }}
        </a>
      </li>
    </ul>
    <ul class="imgsContainer clearfix" :key="categoryNow">
      <li class="hover-float iconfont" v-for="(img,index) in imgs" :key="index">
        <a href="javascript:" @click="a_handler" :id="JSON.stringify(img)">
          <img :src="img.url" alt="">
        </a>
        <span id="upper">&#xe682;&nbsp;{{img.user}}</span>
        <span id="date">&#xe680;&nbsp;{{handleFormatData(img.date) }}</span>
        <!--<div id="description" :title="img.description"> {{img.description}}</div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from '@/assets/js'
import {mapActions, mapState} from "vuex";
export default {
  name: "Menu",
  props:['openMask'],
  data() {
    return {
      categoryNow: this.$store.state.imgInfos[0].category,
    }
  },
  computed: {
    ...mapState(['imgInfos']),
    imgs() {
      return this.imgInfos.find(e => e.category === this.categoryNow).imgs
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
    padding-bottom: 30px;
    li {
      float: left;
      width: @img-width;
      //height: ($width/16)*9 + 60px;
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
        margin-top: 3px;
        //margin-bottom: 9px;
      }
      #upper {
        float: left;
      }
      #date {
        float: right;
      }
      //#description {
      //  width: 100%;
      //  float: left;
      //  white-space: nowrap;
      //  overflow: hidden;
      //  text-overflow: ellipsis;
      //}
    }
  }
}
</style>
