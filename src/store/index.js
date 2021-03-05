import { createStore } from 'vuex'
import * as example1 from './example1'
import * as example2 from './example2'
import * as example3 from './example3'
import * as example4 from './example4'
import * as example6 from './example6'

export default createStore({
  modules: {
    example1: { ...example1, namespaced: true },
    example2: { ...example2, namespaced: true },
    example3: { ...example3, namespaced: true },
    example4: { ...example4, namespaced: true },
    example6: { ...example6, namespaced: true }
  }
})
