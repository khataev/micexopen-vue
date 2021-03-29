export const state = () => ({
  today: null,
  showUserMessage: false,
  userMessage: ''
})

export const actions = {
  // run in every SSR
  nuxtServerInit(store, context) {
    store.commit('SET_USER_MESSAGE', process.env.USER_MESSAGE)
    store.commit('SET_SHOW_USER_MESSAGE', process.env.SHOW_USER_MESSAGE)
  }
}

export const mutations = {
  SET_TODAY(state, today) {
    state.today = today
  },
  SET_USER_MESSAGE(state, userMessage) {
    state.userMessage = userMessage
  },
  SET_SHOW_USER_MESSAGE(state, showUserMessage) {
    state.showUserMessage = showUserMessage
  }
}
