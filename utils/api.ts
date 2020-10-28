import { DefaultApi, Configuration } from '@/api'
import { authStore } from './store-accessor'
// eslint-disable-next-line import/no-mutable-exports
let $api: DefaultApi
// eslint-disable-next-line import/no-mutable-exports
export const configuration: Configuration = {}
export function initializeApi(): void {
  $api = new DefaultApi(configuration, authStore.getBacklogDomain)
}

export { $api }
export * from '@/api'
