<template>
  <div class="MsgBoard">
    <MsgBox v-if="requestState === 'success'" :openMask="openMask"></MsgBox>
    <div class="failed" v-if="requestState === 'failed'">获取数据失败！</div>
    <div class="loading" v-if="requestState === 'waiting'">加载中...</div>
    <UserMask :closeMask="closeMask" v-if="isMaskShowing">
      <div class="slot-box">
        <h3>{{ selectedMsg.title }}</h3>
        <div class="otherInfo iconfont">
          <span>&#xe682;&nbsp;{{ selectedMsg.user }}</span>
          <span>&#xe680;&nbsp;{{ handleFormatData(selectedMsg.date) }}</span>
        </div>
        <div class="msg" v-html="handleMsg(selectedMsg.msg)"></div>
        <ul class="reply">
          <li v-for="(reply,index) in selectedMsg.reply" :key="index">
            <div class="otherInfo iconfont">
              <span>&#xe682;&nbsp;{{ reply.user }}</span>
              <span>&#xe680;&nbsp;{{ handleFormatData(reply.date) }}</span>
            </div>
            <div class="msg" v-html="handleMsg(reply.msg)"></div>
          </li>
        </ul>
      </div>
    </UserMask>
  </div>
</template>

<script>
import {formatDate} from "@/assets/js"
import MsgBox from "@/pages/MsgBoard/MsgBox"
import UserMask from "@/components/UserMask/UserMask";
import mixin_UserMask from "@/assets/mixin/UserMask"
import {mapActions, mapState} from 'vuex'

export default {
  name: "MsgBoard",
  data() {
    return {
      requestState: 'waiting'
    }
  },
  components: {
    MsgBox, UserMask
  },
  mixins: [mixin_UserMask],
  computed: {
    ...mapState(['selectedMsg']),
  },
  methods: {
    ...mapActions(['getMessage']),
    handleFormatData(date) {
      return formatDate(date)
    },
    handleMsg(msg) {
      return msg.replace(/(\n|\r|\\n)+/g, '<br>')
    }
  },
  created() {
    this.getMessage().then(() => {
      this.requestState = 'success'
    }).catch(err => {
      this.requestState = 'failed'
      console.log(err)
    })
  }
}
</script>

<style scoped lang="less">
.MsgBoard {
  overflow: hidden;
  background-color: #fff;
}

.slot-box {
  line-height: 22px;
  padding: 10px 10px 0;

  h3 {
    font-size: 16px;
    font-weight: 700;
  }
  .otherInfo {
    font-size: 12px;
    color: @tint-font-color;
    span {
      margin-right: 8px;
    }
  }
  .msg {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .reply li {
    padding-top: 5px;
    border-top: 1px solid @tint-border-color;
  }
}
</style>
