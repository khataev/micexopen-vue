export const state = () => ({
  today: null
})

export const mutations = {
  SET_TODAY(state, today) {
    state.today = today
  }
}
