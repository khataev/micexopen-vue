'use strict'

import api from './apicalls'

const moment = require('moment')
const Papa = require('papaparse')

// const _ = require('underscore')

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
    // debugger
    const isinkey = position.isin + '_' + position.contract_type
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
  // Функция загрузки csv с открытыми позициями по инструментам
  // date - дата в виде строки ГГГГММДД
  // onComplete - коллбек по окончанию загрузки csv
  // onRender - функция по обновлению интерфейса (если требуется)
  this.loadMoexCsv = function(date) {
    // TODO: to config as in orders-monitor
    const directUrl = `http://moex.com/ru/derivatives/open-positions-csv.aspx?d=${date}&t=1`
    const proxyUrl = `http://vmnet.herokuapp.com/open_positions/${date}`
    const proxyAuxUrl = `http://7thheaven.myds.me:3000/open_positions/${date}`

    // self = this
    return new Promise((resolve, reject) => {
      Papa.parse(proxyUrl, {
        delimiter: ',',
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          console.log('complete')
          // загружаем данные из файла в объект OpenPositions
          const openPositions = new OpenPositions()
          results.data.forEach(row => {
            openPositions.addPosition(row)
          })

          // self.onCsvComplete(results)
          // if (results.data[0].errorcode == 500)
          //   reject(
          //     new Error(
          //       'Сервер ММВБ перегружен. Пожалуйста повторите свою попытку позднее'
          //     )
          //   )
          // else
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

  this.openPositionsDynamics = null
  // TODO: кажется, не используется нигде
  // Массив обработанных дней в периоде - необходим для синхронизации асинхронных потоков загрузки csv с основным
  this.workingPeriodSync = null

  // Функция аккумулирования загруженных на дату открытых позиций в хэш-массиве
  this.accumulateCsv = function(openPositions) {
    const defElementCode = 'Si_F' // TODO: find more elegant way
    // структурированные данные из объекта на дату добавляем в хэш-массив
    // TODO: why moment could be nil?
    const moment =
      openPositions[defElementCode] && openPositions[defElementCode].moment
    if (!moment || moment === '') return
    // this.openPositionsDynamics[openPositions.data[0].moment] = openPositions
    this.openPositionsDynamics[moment] = openPositions

    // TODO: render
    // app.renderDynamicDataPortion(app.openPositions)

    // отметим день, который обработали
    this.workingPeriodSync.pop()
    // if (app.workingPeriodSync.length == 0)
    //     app.renderDynamics();
  }

  // Загрузка данных за период и отображение на странице
  this.loadDataPeriod = function(
    momentFrom,
    momentTo,
    // TODO: how to get rid of this params?
    eachChunkProcessCallback,
    ratesProcessCallback,
    errorCallback
  ) {
    const currentMoment = moment(momentFrom)

    this.openPositionsDynamics = {}
    // Отрисовываем пустой график
    // charts.ChartMan.drawOpenPositionsDynamicsChart()
    // charts.ChartMan.drawOpenPositionsDynamicsChart2()

    const self = this
    // Заполнение массива для синхронизации потоков
    this.workingPeriodSync = []
    const currentMomentDup = moment(momentFrom)
    while (
      currentMomentDup.isBefore(momentTo, 'day') ||
      currentMomentDup.isSame(momentTo, 'day')
    ) {
      if (currentMomentDup.day() > 0 && currentMomentDup.day() < 7) {
        this.workingPeriodSync.push(currentMomentDup.format('YYYYMMDD'))
      }
      currentMomentDup.add(1, 'day')
    }

    // загрузка данных с ММВБ по открытым позициям за период
    while (
      currentMoment.isBefore(momentTo, 'day') ||
      currentMoment.isSame(momentTo, 'day')
    ) {
      if (currentMoment.day() > 0 && currentMoment.day() < 6) {
        this.loadMoexCsv(currentMoment.format('YYYYMMDD'))
          .then(openPositions => {
            self.accumulateCsv(openPositions)

            return openPositions
          })
          .then(eachChunkProcessCallback)
      }
      currentMoment.add(1, 'day')
    }

    // загрузка курсов USD за период
    // TODO: разнести загрузку и отображение
    // this.loadUsdRates(momentFrom, momentTo)
    api
      .getUSDRatesJSON(momentFrom, momentTo)
      .then(usdRates => {
        api
          .getSpotUSDRatesJSON(momentFrom, momentTo)
          .then(spotUsdRates => {
            ratesProcessCallback(usdRates.data, spotUsdRates.data)
          })
          .catch(errorCallback)
      })
      .catch(errorCallback)
  }

  this.getForHoliday = function(mnt) {
    if (mnt.isSame('2016-11-06', 'day')) return moment('2016-11-03')
    if (mnt.isSame('2016-11-07', 'day')) return moment('2016-11-03')
    if (mnt.isSame('2017-01-03', 'day')) return moment('2016-12-30')
    if (mnt.isSame('2017-02-24', 'day')) return moment('2017-02-22')
    if (mnt.isSame('2017-03-09', 'day')) return moment('2017-03-07')
    if (mnt.isSame('2017-05-02', 'day')) return moment('2017-04-28')
    if (mnt.isSame('2017-05-09', 'day')) return moment('2017-05-05')
    if (mnt.isSame('2017-05-10', 'day')) return moment('2017-05-05')
    if (mnt.isSame('2017-06-13', 'day')) return moment('2017-06-09')
    if (mnt.isSame('2017-11-07', 'day')) return moment('2017-11-03')
    return undefined
  }
  this.getPreviousTradingDay = function() {
    let day
    switch (moment().day()) {
      case 0:
        day = moment().subtract(2, 'days')
        break
      case 1:
        day = moment().subtract(3, 'days')
        break
      default:
        day = moment().subtract(1, 'days')
        break
    }
    const forHoliday = this.getForHoliday(moment())
    return forHoliday === undefined ? day : forHoliday
  }
}
// // module.exports = new Moex()
// const moex = new Moex()
// export OpenPositions
// export moex
