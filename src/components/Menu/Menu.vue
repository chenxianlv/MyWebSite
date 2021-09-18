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
      <li v-for="(img,index) in imgs" :key="index">
        <a href="javascript:" @click="a_handler" :id="JSON.stringify(img)">
          <img :src="img.url" alt="">
        </a>
        <span id="upper">{{img.upper}}</span>
        <span id="date">{{formatDate(img.date)}}</span>
        <div id="description" :title="img.description"> {{img.description}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
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
    formatDate(time, detailMode=false) {
      let date = new Date(time*1000)
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      if (detailMode) {
        return y + "年" + MM + "月" + d + "日 " + h + ":" + m + ':'+ s;
      }else {
        return y + "-" + MM + "-" + d + " " + h + ":" + m;
      }
    },
    a_handler(e){
      this.openMask(JSON.parse(e.currentTarget.id));
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
    width: @page-width + 100px;
    li {
      float: left;
      width: @img-width;
      height: ($width/16)*9 + 60px;
      margin: 20px (@page-width - @img-width*3)*0.2 20px (@page-width - @img-width*3)*0.15;
      padding: 15px;
      border: 1px solid #e3e2e2;
      border-radius: 8px;
      transition: all 0.4s;

      img {
        display: block;
        width: 100%;
        margin-bottom: 9px;
      }
      #upper,#date {
        font-size: 14px;
        color: #7e7c7c;
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
      &:hover {
        transform: translateY(-2%);
        box-shadow: 1px 4px 10px 1px #ccc;
      }
    }
  }
}
</style>
