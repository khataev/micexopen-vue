// import axios from '@nuxtjs/axios'
// const axios = require('@nuxtjs/axios')
const axios = require('axios')

class Api {
  constructor() {
    // Путь к API для получения курса доллара
    this.usdRatesUrl = 'http://vmnet.herokuapp.com/api/v1/rates/usd.json'
    this.usdRatesAuxUrl = 'http://7thheaven.myds.me:3000/api/v1/rates/usd.json'
    this.usdRatesTestUrl = 'http://192.168.1.100:3000/api/v1/rates/usd.json'
    // Формирование полного URL для получения курса доллара за период времени
    this.getUSDRatesUrl = function(startMoment, endMoment) {
      return (
        this.usdRatesUrl +
        '?start_date=' +
        startMoment.format('YYYYMMDD') +
        '&end_date=' +
        endMoment.format('YYYYMMDD')
        // + '&callback=?'
      )
    }

    this.getUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get(this.getUSDRatesUrl(startMoment, endMoment))
      // .then(onComplete)
      // .catch(onFail)
    }
    // Путь к API для получения курса USDRUB_TOM С ММВБ
    this.usdtomRatesUrl =
      'http://vmnet.herokuapp.com/api/v1/spot_rates/usdrub_tom.json'
    // this.usdtomRatesAuxUrl =
    //   'http://7thheaven.myds.me:3000/api/v1/spot_rates/usdrub_tom.json'
    // this.usdtomRatesTestUrl =
    //   'http://192.168.1.100:3000/api/v1/spot_rates/usdrub_tom.json'
    // Формирование полного URL для получения курса доллара за период времени
    this.getSpotUSDRatesUrl = function(startMoment, endMoment) {
      return (
        this.usdtomRatesUrl +
        '?start_date=' +
        startMoment.format('YYYYMMDD') +
        '&end_date=' +
        endMoment.format('YYYYMMDD')
        // + '&callback=?'
      )
    }
    this.getSpotUSDRatesJSON = function(startMoment, endMoment) {
      return axios.get(this.getSpotUSDRatesUrl(startMoment, endMoment))
      // .then(onComplete)
      // .catch(onFail)
      // $.getJSON(this.getSpotUSDRatesUrl(startMoment, endMoment), function(data) {
      //   onComplete(data)
      // }).fail(onFail)
    }
  }
}

export default new Api()
