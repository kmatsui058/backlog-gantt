import VuexPersistence from 'vuex-persist'
import { Plugin } from '@nuxt/types'
const vuexPersit: Plugin = ({ store }) => {
  new VuexPersistence({
    /* your options */
  }).plugin(store)
}
export default vuexPersit
