export default {
  SHOW_IMG_DETAILS(state,value){
    state.selectedImg = value
  },
  CHANGE_SELECTED_MSG(state,value){
    state.selectedMsg = state.msgInfos.find(e=>e.id===Number(value))
  }
}
