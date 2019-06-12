const axios = require('axios')

class Api {
  constructor() {
    // API for CBRF USD rates
    this.getUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get(process.env.USD_RATES_URL, {
        params: {
          start_date: startMoment.format('YYYYMMDD'),
          end_date: endMoment.format('YYYYMMDD')
        }
      })
      // .then(onComplete)
      // .catch(onFail)
    }

    // API for MOEX USDRUB_TOM
    this.getSpotUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get(process.env.USD_TOM_RATES_URL, {
        params: {
          start_date: startMoment.format('YYYYMMDD'),
          end_date: endMoment.format('YYYYMMDD')
        }
      })
      // .then(onComplete)
      // .catch(onFail)
      // $.getJSON(this.getSpotUSDRatesUrl(startMoment, endMoment), function(data) {
      //   onComplete(data)
      // }).fail(onFail)
    }

    // TODO: move to back api and cache it
    this.getHolidays = async function(year) {
      const desiredType = 'National holiday'
      const response = await axios.get(process.env.CALENDARIFIC_URL, {
        params: {
          api_key: process.env.CALENDARIFIC_API_KEY,
          country: 'RU',
          year: year
        }
      })

      return response.data.response.holidays
        .filter(holiday => holiday.type.includes(desiredType))
        .map(holiday => holiday.date.iso)

      // .then(onComplete)
      // .catch(onFail)
      // $.getJSON(this.getSpotUSDRatesUrl(startMoment, endMoment), function(data) {
      //   onComplete(data)
      // }).fail(onFail)
    }
  }
}

export default new Api()
