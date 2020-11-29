import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import auth from '~/store/auth'
import filter from '~/store/filter'
import gantt from '~/store/gantt'
// eslint-disable-next-line import/no-mutable-exports
let authStore: auth
// eslint-disable-next-line import/no-mutable-exports
let filterStore: filter
// eslint-disable-next-line import/no-mutable-exports
let ganttStore: gantt
function initialiseStores(store: Store<any>): void {
  authStore = getModule(auth, store)
  filterStore = getModule(filter, store)
  ganttStore = getModule(gantt, store)
}

export { initialiseStores, authStore, filterStore, ganttStore }
