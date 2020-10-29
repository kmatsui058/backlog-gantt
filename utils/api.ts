import { DefaultApi, Configuration } from '@/api'
import { authStore } from './store-accessor'
// eslint-disable-next-line import/no-mutable-exports
let $api: DefaultApi
// eslint-disable-next-line import/no-mutable-exports
export const configuration: Configuration = {
  baseOptions: {
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
}
export function initializeApi(): void {
  if (authStore.getAccessToken) {
    configuration.baseOptions.Authorization = `Bearer ${authStore.getAccessToken}`
  }
  configuration.basePath = authStore.getBacklogDomain
  $api = new DefaultApi(configuration)
}

export { $api }
export * from '@/api'
