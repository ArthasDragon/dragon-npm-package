export default {
  state: { count: 100 },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  },
  actions: {},
  getters: {}
}
