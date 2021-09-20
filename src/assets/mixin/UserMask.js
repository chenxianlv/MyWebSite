export default  {
  methods: {
    closeMask() {
      this.isMaskShowing = false
    },
    openMask(handler,...arg){
      this.isMaskShowing = true
      handler(...arg)
    }
  },
  data() {
    return {
      isMaskShowing: false
    }
  }
}
