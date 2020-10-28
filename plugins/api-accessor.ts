import { Plugin } from '@nuxt/types'
import { DefaultApi } from '@/api'
import { $api, initializeApi } from '~/utils/api'

declare module 'vue/types/vue' {
  interface Vue {
    $api: DefaultApi
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: DefaultApi
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: DefaultApi
  }
}

const accessor: Plugin = (_, inject) => {
  initializeApi()
  inject('api', $api)
}

export default accessor
