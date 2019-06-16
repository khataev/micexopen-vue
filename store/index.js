export const state = () => ({
  holidays: []
})

export const mutations = {
  setHolidays(state, holidays) {
    state.holidays = holidays
  }
}

export const getters = {
  holidaysLoaded(state) {
    return state.holidays.length > 0
  }
}

export const actions = {
  async setHolidays(context, year) {
    const desiredType = 'National holiday'
    try {
      const response = await this.$axios.$get('/api/holidays', {
        params: {
          year: year
        }
      })
      const holidays = response.response.holidays
        .filter(holiday => holiday.type.includes(desiredType))
        .map(holiday => holiday.date.iso)
      context.commit('setHolidays', holidays)
    } catch (error) {
      console.log('store getHolidays error:', error.message)
      context.commit('setHolidays', [])
    }
  }
}
