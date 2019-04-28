import Vue from 'vue'
import Vuex from 'vuex'
import { example } from './modules'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    example
  },
  getters,
  mutations,
  actions
})

export default store
