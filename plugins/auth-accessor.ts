import { Plugin } from '@nuxt/types'
import { $api, initializeApi } from '~/utils/api'

const accessor: Plugin = (_, inject) => {
  initializeApi()
  inject('api', $api)
}

export default accessor
