export default {
  showImgDetails(context,value){
    context.commit('SHOW_IMG_DETAILS',value)
  },
  changeSelectedMsg(context,value){
    context.commit('CHANGE_SELECTED_MSG',value)
  }
}
