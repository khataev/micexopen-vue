'use strict'

const moment = require('moment')
const Papa = require('papaparse')

const DirectionPositions = function({
  changePrevWeekAbs = 0,
  changePrevWeekPerc = 0,
  clients = 0,
  position = 0
} = {}) {
  this.changePrevWeekAbs = changePrevWeekAbs || 0
  this.changePrevWeekPerc = changePrevWeekPerc || 0
  this.clients = clients || 0
  this.position = position || 0
}

const ClientsPositions = function(options) {
  this.filled = false
  this.long = new DirectionPositions()
  this.short = new DirectionPositions()

  if (options) {
    // console.log(options.change_prev_week_short_abs);
    this.short = new DirectionPositions({
      changePrevWeekAbs: options.change_prev_week_short_abs,
      changePrevWeekPerc: options.change_prev_week_short_perc,
      clients: options.clients_in_short,
      position: options.short_position
    })

    this.long = new DirectionPositions({
      changePrevWeekAbs: options.change_prev_week_long_abs,
      changePrevWeekPerc: options.change_prev_week_long_perc,
      clients: options.clients_in_long,
      position: options.long_position
    })

    this.filled = true
  }
}

// Table
const FeatureOpenPositions = function({
  isin = '',
  name = '',
  moment = Date.now(),
  fiz = new ClientsPositions(),
  jur = new ClientsPositions(),
  total = new DirectionPositions()
} = {}) {
  this.isin = isin
  this.name = name
  this.moment = moment
  this.fiz = fiz
  this.jur = jur
  this.total = total
}

// Открытые позиции на дату
export const OpenPositions = function() {
  // // Наименование инструмента
  this.getFeatureName = function(name, contractType) {
    if (contractType === 'C') name = name.replace('Опцион', 'Опцион "колл"')
    if (contractType === 'P') name = name.replace('Опцион', 'Опцион "пут"')
    return name
  }
  this.addPosition = function(position) {
    const isinkey = `${position.isin}_${position.contract_type}`
    if (this[isinkey] == null) {
      this[isinkey] = new FeatureOpenPositions({
        isin: position.isin,
        name: this.getFeatureName(position.name, position.contract_type),
        moment: position.moment
      })
    }
    if (position.iz_fiz === 1) {
      this[isinkey].fiz = new ClientsPositions(position)
    } else {
      this[isinkey].jur = new ClientsPositions(position)
    }
    if (this[isinkey].fiz.filled && this[isinkey].jur.filled) {
      const fiz = this[isinkey].fiz
      const jur = this[isinkey].jur
      const fizLong = fiz.long // HINT: earlier we cloned, not just assigned
      const jurLong = jur.long
      const fizShort = fiz.short
      const jurShort = jur.short
      // semi manual export of data to console
      // if (isinkey === 'GOLD_F') {
      //   // debugger
      //   const str = `${position.moment},${fizLong.position},${
      //     fizShort.position
      //   },${jurLong.position},${jurShort.position}`
      //   console.log(str)
      // }
      this[isinkey].total = new DirectionPositions({
        changePrevWeekAbs:
          fizLong.changePrevWeekAbs +
          fizShort.changePrevWeekAbs +
          jurLong.changePrevWeekAbs +
          jurShort.changePrevWeekAbs,
        changePrevWeekPerc:
          fizLong.changePrevWeekPerc +
          fizShort.changePrevWeekPerc +
          jurLong.changePrevWeekPerc +
          jurShort.changePrevWeekPerc,
        clients:
          fizLong.clients +
          fizShort.clients +
          jurLong.clients +
          jurShort.clients,
        position:
          fizLong.position +
          fizShort.position +
          jurLong.position +
          jurShort.position
      })
    }
  }
}

export const Moex = function() {
  this.defaultDateFormat = 'YYYYMMDD'

  // Функция загрузки csv с открытыми позициями по инструментам
  // date - дата в виде строки ГГГГММДД
  // Возвращает Promise
  this.loadMoexCsv = function(date) {
    const moexUrl = `/api/open_positions/${date}`

    return new Promise((resolve, reject) => {
      Papa.parse(moexUrl, {
        delimiter: ',',
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          // загружаем данные из файла в объект OpenPositions
          const openPositions = new OpenPositions()
          results.data.forEach(row => {
            openPositions.addPosition(row)
          })
          resolve(openPositions)
        },
        error: function(error, file, inputElem, reason) {
          console.log(error.message)
          reject(
            new Error(
              'Произошла ошибка при доступе к сервису ММВБ. Я изучаю данный момент. А пока попробуйте перезагрузить страницу или зайдите позднее'
            )
          )
        }
      })
    })
  }

  // Загрузка данных за период и отображение на странице
  this.loadDataPeriod = function(
    momentFrom,
    momentTo,
    eachChunkProcessCallback,
    errorCallback
  ) {
    const currentMoment = moment(momentFrom)

    // загрузка данных с ММВБ по открытым позициям за период
    while (
      currentMoment.isBefore(momentTo, 'day') ||
      currentMoment.isSame(momentTo, 'day')
    ) {
      if (currentMoment.day() > 0 && currentMoment.day() < 6) {
        this.loadMoexCsv(currentMoment.format(this.defaultDateFormat))
          .then(eachChunkProcessCallback)
          .catch(errorCallback)
      }
      currentMoment.add(1, 'day')
    }
  }

  this.getPreviousTradingDay = function(date = moment(), holidays) {
    const fromEnv = moment(process.env.PREVIOUS_TRADING_DAY)
    if (process.env.PREVIOUS_TRADING_DAY && fromEnv.isValid()) return fromEnv

    let result
    switch (date.day()) {
      case 0:
        result = date.subtract(2, 'days')
        break
      case 1:
        result = date.subtract(3, 'days')
        break
      default:
        result = date.subtract(1, 'days')
        break
    }

    return holidays.includes(date.format('YYYY-MM-DD'))
      ? this.getPreviousTradingDay(result, holidays)
      : result
  }

  this.getPreviousTradingDayString = function(date = moment(), holidays) {
    const day = this.getPreviousTradingDay(date, holidays)
    return day.format(this.defaultDateFormat)
  }

  this.makeTransformedRow = function(
    code,
    name,
    fizLong,
    fizShort,
    jurLong,
    jurShort
  ) {
    return {
      code: code,
      name: name,
      fizLong: fizLong,
      fizShort: fizShort,
      jurLong: jurLong,
      jurShort: jurShort,
      total: fizLong + fizShort + jurLong + jurShort
    }
  }
}
// // module.exports = new Moex()
// const moex = new Moex()
// export OpenPositions
// export moex

export default ({ app }, inject) => {
  inject('getMoex', () => {
    return Moex
  })
}
