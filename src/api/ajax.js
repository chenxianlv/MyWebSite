import axios from 'axios'
import qs from 'qs'
export default function ajax(url, data={}, type="GET") {
  return new Promise((resolve,reject) => {
    let promise
    if (type === "GET") {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += '?' + dataStr
      }
      promise = axios.get(url)
    }else if (type === "POST") {
      promise = axios.post(url, qs.stringify(data))
    }else {
      reject('WRONG TYPE')
    }
    promise.then(function (res) {
      resolve(res.data)
    }).catch(function (err) {
      reject(err)
    })
  })
}
