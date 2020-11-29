import VuexPersistence from 'vuex-persist'
import { Plugin } from '@nuxt/types'

const vuexPersist: Plugin = ({ store }) => {
  new VuexPersistence({
    /* your options */
  }).plugin(store)
}

export default vuexPersist
