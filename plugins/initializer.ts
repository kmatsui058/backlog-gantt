import { Plugin } from '@nuxt/types'
import { $apiConfig } from '@/plugins/api-accessor'
import { authStore } from '~/store'

const initializer: Plugin = async ({ route, app }) => {
  if (!authStore.getBacklogDomain) {
    authStore.setLoading(false)
    return
  }
  console.log(authStore.getBacklogDomain)
  $apiConfig.basePath = authStore.getBacklogDomain
  const code = typeof route.query.code === 'string' ? route.query.code : null

  if (authStore.getAccessToken) {
    $apiConfig.accessToken = authStore.getAccessToken
    await authStore.fetchSelf()
  } else if (code) {
    if (code) {
      authStore.setCode(code)
      await authStore.fetchToken()
      if (app.$router) app.$router.push({ query: { code: undefined } })
    }
  }
  authStore.setLoading(false)
}

export default initializer
