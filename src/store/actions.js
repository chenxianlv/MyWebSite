import {getMessage} from "@/api";

export default {
  changeSelectedImg(context, value){
    context.commit('CHANGE_SELECTED_IMG',value)
  },
  changeSelectedMsg(context,value){
    context.commit('CHANGE_SELECTED_MSG',value)
  },
  getMessage(context){
    getMessage().then((data) => {
      console.log(data)
      context.commit('UPDATE_MSG',data)
    }).catch((err) => {
      console.log(err)
    })
  }
}
