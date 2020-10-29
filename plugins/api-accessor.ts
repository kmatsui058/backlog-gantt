import { Plugin } from '@nuxt/types'
import { Configuration } from '@/api'
import { authStore } from '~/store'
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
export const $apiConfig: Configuration = { baseOptions: {} }

const accessor: Plugin = (_, inject) => {
  if (authStore.getAccessToken) {
    $apiConfig.baseOptions.Authorization = `Bearer ${authStore.getAccessToken}`
  }
  $apiConfig.basePath = authStore.getBacklogDomain
  inject('apiConfig', $apiConfig)
}

export default accessor
