import ajax from "@/api/ajax";

// 服务器域名
const BASE_URL = 'http://localhost:8000'

export const getMessage = () => ajax(`${BASE_URL}/getMessage`)

// obj:{_id:'xxx'}
// Reply的删除也使用该方法
export const deleteMessage = (obj) => ajax(`${BASE_URL}/deleteMessage`, obj)

// obj:{_id:'xxx',doc:{title:'xxx',等要修改的数据}}
// Reply的修改也使用该方法
export const updateMessage = (obj) => ajax(`${BASE_URL}/updateMessage`, obj,"POST")

// obj:{title:'xxx',msg:'xxx',usr:'xxx',date:时间戳（去掉代表毫秒的后三位）}
export const addMessage = (obj) => ajax(`${BASE_URL}/addMessage`, obj,"POST")

export const getPicture = () => ajax(`${BASE_URL}/getPicture`)
