import Axios, { AxiosError } from 'axios'
import { authStore } from './store-accessor'

export default async function onRejected(
  err: AxiosError
): Promise<any | undefined> {
  if (err.response) {
    const status = err.response.status
    switch (status) {
      case 401: {
        await authStore.refresh()
        const config = err.config
        if (config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authStore.getAccessToken}`
        }
        console.log({ config })
        return Axios.request(config)
      }
      case 500:
        alert('サーバー側で異常が発生しました')
        break
    }
  } else {
  }
  return Promise.reject(err)
}
