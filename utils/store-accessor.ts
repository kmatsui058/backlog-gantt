import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import auth from '~/store/auth'
import filter from '~/store/filter'
import date from '~/store/date'
// eslint-disable-next-line import/no-mutable-exports
let authStore: auth
// eslint-disable-next-line import/no-mutable-exports
let filterStore: filter
// eslint-disable-next-line import/no-mutable-exports
let dateStore: date
function initialiseStores(store: Store<any>): void {
  authStore = getModule(auth, store)
  filterStore = getModule(filter, store)
  dateStore = getModule(date, store)
}

export { initialiseStores, authStore, filterStore, dateStore }
