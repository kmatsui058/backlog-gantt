import { Plugin } from '@nuxt/types'
import { Configuration } from '@/api'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { authStore } from '~/store'
import onRejected from '~/utils/onRejected'
declare module 'vue/types/vue' {
  interface Vue {
    $apiConfig: Configuration
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $apiConfig: Configuration
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $apiConfig: Configuration
  }
}
export const $apiConfig: Configuration = {
  baseOptions: {},
}

const accessor: Plugin = (_, inject) => {
  Axios.interceptors.response.use(
    (r: AxiosResponse): AxiosResponse => {
      return r
    },
    async (err: AxiosError): Promise<AxiosError> => {
      const result = await onRejected(err)
      return result
    }
  )

  if (authStore.getAccessToken) {
    $apiConfig.baseOptions.Authorization = `Bearer ${authStore.getAccessToken}`
  }
  $apiConfig.basePath = authStore.getBacklogDomain
  inject('apiConfig', $apiConfig)
}

export default accessor
