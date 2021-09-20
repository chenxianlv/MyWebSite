<template>
  <header :class="{shadow:shadowOn}">
    <div class="w clearfix" >
      <nav>
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.to" active-class="active" replace>{{ item.title }}</router-link>
          </li>
        </ul>
      </nav>
      <!--todo 未登录状态下显示登陆/注册-->
      <!--todo 点击显示用户操作菜单（个人中心，登出）-->
      <a class="userInfo" href="javascript:">
        <span>{{ userName }}</span>
        <div class="arrowDown"></div>
      </a>
    </div>
  </header>
</template>

<script>
//todo 当页面向下滚动时，保持头部导航条位置不变，并产生阴影
import {mapState} from 'vuex'

export default {
  name: "UserHeader",
  data() {
    return {
      shadowOn: false,
      menuItems: [
        {title: '首页', to: '/main'},
        {title: '照片墙', to: '/photoWall'},
        {title: '留言板', to: '/msgBoard'},
      ]
    }
  },
  computed: {
    ...mapState(['userName']),
  },
  methods: {
    judgeScroll() {
      this.shadowOn = window.pageYOffset > 10
    }
  },
  mounted() {
    window.addEventListener('scroll', this.judgeScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.judgeScroll)
  }
}
</script>

<style scoped lang="less">

header {
  background-color: #fff;
  width: 100%;
  position: fixed;
  z-index: 9;
  border-bottom: solid 1px @tint-border-color;
}

.active {
  color: #0066ff;
}
.shadow {
  transition: box-shadow 0.25s;
  box-shadow: 0 0 5px 3px rgba(0, 0,0,.2);
}

nav {
  float: left;

  li {
    float: left;

    a {
      display: block;
      height: @uer-header-height;
      line-height: @uer-header-height;
      padding: 0 10px;
      background-color: #fff;
    }

    &:hover a {
      color: #175199;
    }
  }
}

.userInfo {
  float: right;
  padding-right: 10px;
  margin-right: 15px;

  span {
    line-height: @uer-header-height;
    margin-right: 5px;
  }

  .arrowDown {
    @border-width: 4px;
    display: inline-block;
    cursor: pointer;
    border: @border-width solid #000;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg) translateY(-1*@border-width);
  }
}
</style>
