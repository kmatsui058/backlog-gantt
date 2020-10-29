import { Plugin } from '@nuxt/types'
import { authStore } from '~/store'
import { configuration } from '~/utils/api'

const initializer: Plugin = async ({ route, app }) => {
  if (!authStore.getBacklogDomain) return
  console.log(authStore.getBacklogDomain)
  configuration.basePath = authStore.getBacklogDomain

  if (authStore.getAccessToken) {
    configuration.baseOptions.Authorization = `Bearer ${authStore.getAccessToken}`
    console.log({ configuration })
    await authStore.fetchSelf()
  } else {
    const code = typeof route.query.code === 'string' ? route.query.code : null
    if (code) {
      authStore.setCode(code)
      await authStore.fetchToken()
      app.$router.push({ query: { code: undefined } })
    }
  }
}

export default initializer
