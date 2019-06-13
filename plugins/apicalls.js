const axios = require('axios')

class Api {
  constructor() {
    // API for CBRF USD rates
    this.getUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get('/api/rates/usd', {
        params: {
          start_date: startMoment.format('YYYYMMDD'),
          end_date: endMoment.format('YYYYMMDD')
        }
      })
    }

    // API for MOEX USDRUB_TOM
    this.getSpotUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get('/api/rates/usd_tom', {
        params: {
          start_date: startMoment.format('YYYYMMDD'),
          end_date: endMoment.format('YYYYMMDD')
        }
      })
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
    }
  }
}

export default new Api()
