export default {
  CHANGE_SELECTED_IMG(state, value) {
    state.selectedImg = value
  },
  CHANGE_SELECTED_MSG(state, value) {
    state.selectedMsg = state.msgInfos.find(e => e._id === value)
  },
  UPDATE_MSG(state, value) {
    state.msgInfos = value
  },
  UPDATE_PIC(state, value) {
    state.recommendImgs = value.recommend
    state.imgInfos = value.result
  }
}
