import { Plugin } from '@nuxt/types'
import Vue from 'vue'
const errorHandler: Plugin = () => {
  window.addEventListener('error', (err) => {
    const test = confirm(
      '致命的なエラーが発生しました。ローカルストレージを消去して再度試しますか？'
    )
    if (test) localStorage.clear()
    console.log(err)
    location.reload()
  })
  Vue.config.errorHandler = (err): void => {
    const test = confirm(
      '致命的なエラーが発生しました。ローカルストレージを消去して再度試しますか？'
    )
    if (test) localStorage.clear()
    console.log(err)
    location.reload()
  }
}

export default errorHandler
