<template>
  <div class="box">
    <ul class="msgBox">
      <li class="hover-float" v-for="(msgInfo,index) in msgInfos" :key="index">
        <a :id="msgInfo._id" href="javascript:" @click="clickHandler">
          <h3>{{ msgInfo.title }}</h3>
          <div class="msg">{{ msgInfo.msg }}</div>
        </a>
        <div class="user iconfont">
          <span>&#xe682;&nbsp;{{ msgInfo.user }}</span>
          <span>&#xe680;&nbsp;{{ handleFormatData(msgInfo.date) }}</span>
          <span>&#xe6ba;&nbsp;{{ msgInfo.reply.length }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
import {formatDate} from "@/assets/js";

export default {
  name: "MsgBox",
  props: ['openMask'],
  computed: {
    ...mapState(['msgInfos'])
  },
  methods: {
    ...mapActions(['changeSelectedMsg']),
    handleFormatData() {
      return formatDate(...arguments)
    },
    clickHandler(e) {
      this.openMask(this.changeSelectedMsg, e.currentTarget.id)
    }
  },
}
</script>

<style scoped lang="less">
.box {
  margin: 15px;
}

.msgBox {
  li {
    margin-bottom: 15px;
    padding: 10px 15px;
    border: solid 1px @tint-border-color;
    border-radius: @common-border-radius;
    line-height: 22px;

    h3 {
      font-weight: 700;
    }

    .msg {
      margin-top: 4px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .user {
      margin-top: 4px;
      font-size: 12px;
      color: @tint-font-color;

      span {
        margin-right: 8px;
      }
    }
  }
}
</style>
