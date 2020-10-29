import { Plugin } from '@nuxt/types'
import { $apiConfig } from '@/plugins/api-accessor'
import { authStore } from '~/store'

const initializer: Plugin = async ({ route, app }) => {
  if (!authStore.getBacklogDomain) return
  console.log(authStore.getBacklogDomain)
  $apiConfig.basePath = authStore.getBacklogDomain

  if (authStore.getAccessToken) {
    $apiConfig.accessToken = authStore.getAccessToken
    await authStore.fetchSelf()
  } else {
    const code = typeof route.query.code === 'string' ? route.query.code : null
    if (code) {
      authStore.setCode(code)
      await authStore.fetchToken()
      if (app.$router) app.$router.push({ query: { code: undefined } })
    }
  }
}

export default initializer
