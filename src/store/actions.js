import {getMessage, getPicture} from "@/api";

export default {
  changeSelectedImg(context, value){
    context.commit('CHANGE_SELECTED_IMG',value)
  },
  changeSelectedMsg(context,value){
    context.commit('CHANGE_SELECTED_MSG',value)
  },
  async getMessage(context) {
    return await new Promise((resolve, reject) => {
      getMessage().then((data) => {
        context.commit('UPDATE_MSG', data)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  async getPicture(context) {
    return await new Promise((resolve, reject) => {
      getPicture().then((data) => {
        data.result.forEach(e => {
          e.imgs.forEach(el => {
            el.url = require('@/upload/imgs/' + el.url)
          })
        })
        data.recommend.forEach(e => {
            e.url = require('@/upload/imgs/' + e.url)
        })
        context.commit('UPDATE_PIC', data)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
