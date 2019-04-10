import Vue from 'vue'
import Vuex from 'vuex'
// 修改state时在console打印，便于调试
import createLogger from 'vuex/dist/logger'
import shopping from '@/store/module/shopping'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {}

const getters = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    shopping
  },
  plugins: debug ? [createLogger()] : []
})

