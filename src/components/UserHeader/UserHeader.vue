<template>
  <header>
    <div class="w clearfix">
      <nav>
        <ul>
          <li>
            <router-link to="/main" replace>首页</router-link>
          </li>
          <li>
            <router-link to="/photoWall" replace>照片墙</router-link>
          </li>
          <li>
            <router-link to="/msgBoard" replace>讨论区</router-link>
          </li>
        </ul>
      </nav>
      <!--todo 未登录状态下显示登陆/注册-->
      <!--todo 点击显示用户操作菜单（个人中心，登出）-->
      <a class="userInfo" href="javascript:">
        <span>{{userName}}</span>
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
  computed:{
    ...mapState(['userName'])
  }
}
</script>

<style scoped lang="less">
@nav-height: 60px;
header {
  background-color: #fff;
  position: relative;
  z-index: 9;
}

nav {
  float: left;

  & li {
    float: left;
    a {
      display: block;
      height: @nav-height;
      line-height: @nav-height;
      border: 1px solid red;
      padding: 0 10px;
      background-color: #fff;
    }
  }
}

.userInfo {
  float: right;
  padding-right: 10px;
  margin-right: 15px;

  span {
    line-height: @nav-height;
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
