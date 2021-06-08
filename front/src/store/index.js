import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BackEndUrl: "http://api.in-store.host"
  }
})
