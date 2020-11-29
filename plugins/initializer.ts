import { Plugin } from '@nuxt/types'
import { $apiConfig } from '@/plugins/api-accessor'
import { authStore, filterStore, ganttStore } from '~/store'
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
    if (!authStore.getSelf) {
      await authStore.fetchSelf()
    }
    if (filterStore.getProjects.length === 0) {
      await filterStore.fetchProjects()
    }
  } else if (code) {
    if (code) {
      authStore.setCode(code)
      await authStore.fetchToken()
      if (app.$router) app.$router.push({ query: { code: undefined } })
      if (filterStore.getProjects.length === 0) {
        await filterStore.fetchProjects()
      }
    }
  }
  await ganttStore.fetchGantt()

  authStore.setLoading(false)
}

export default initializer
