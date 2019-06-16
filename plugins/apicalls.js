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
    // TODO: async/await??
    this.getSpotUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get('/api/rates/usd_tom', {
        params: {
          start_date: startMoment.format('YYYYMMDD'),
          end_date: endMoment.format('YYYYMMDD')
        }
      })
    }

    // TODO: cache it
    // this.getHolidays = async function(year) {
    //   const desiredType = 'National holiday'
    //   try {
    //     console.log('getHolidays base url: ', config.env.BASE_URL)
    //     const response = await axios.get('/api/holidays', {
    //       baseUrl: config.env.BASE_URL,
    //       params: {
    //         year: year
    //       }
    //     })
    //     return response.data.response.holidays
    //       .filter(holiday => holiday.type.includes(desiredType))
    //       .map(holiday => holiday.date.iso)
    //   } catch (error) {
    //     console.log('getHolidays error:', error.message)
    //     return []
    //   }
    // }
  }
}

export default new Api()
