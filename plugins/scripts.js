'use strict'

// const _ = require('underscore')
const moment = require('moment')
// const Papa = require('papaparse')
// const s = require('underscore.string')
// const api = require('./apicalls')

const App = function() {
  // openPositions: null,
  // openPositionsDynamics: null,
  // // Массив обработанных дней в периоде - необходим для синхронизации асинхронных потоков загрузки csv с основным
  // workingPeriodSync: null,
  // // Коллбек после загрузки csv файла
  // onCsvComplete: function(results) {
  //   // загружаем данные из файла в объект OpenPositions
  //   app.openPositions = new app.OpenPositions()
  //   // _.each(results.data, function(elem) {
  //   //   app.openPositions.addPosition(elem)
  //   // })
  //   results.data.forEach(elem => app.openPositions.addPosition(elem))
  //   for (const key in app.openPositions) {
  //     if (typeof app.openPositions[key] !== 'function') {
  //       // console.log(app.openPositions[key].toJSON());
  //       app.featuresListRaw.push({
  //         id: key,
  //         text: app.openPositions[key].toJSON().name
  //       })
  //     }
  //   }
  // },
  // // Функция загрузки csv с открытыми позициями по инструментам
  // // date - дата в виде строки ГГГГММДД
  // // onComplete - коллбек по окончанию загрузки csv
  // // onRender - функция по обновлению интерфейса (если требуется)
  // loadMoexCsv: function(date, onComplete, onRender) {
  //   // const directUrl =
  //   //   'http://moex.com/ru/derivatives/open-positions-csv.aspx?d=' +
  //   //   date +
  //   //   '&t=1'
  //   const proxyUrl = 'http://vmnet.herokuapp.com/open_positions/' + date
  //   // const proxyAuxUrl = 'http://7thheaven.myds.me:3000/open_positions/' + date
  //   // const showError = function(message) {
  //   //   const sel = $('.error-area')
  //   //   sel.html(message)
  //   //   sel.show()
  //   // }
  //   Papa.parse(proxyUrl, {
  //     delimiter: ',',
  //     download: true,
  //     header: true,
  //     dynamicTyping: true,
  //     complete: function(results) {
  //       if (onComplete)
  //         if (results.data[0].errorcode === 500) {
  //           // TODO:
  //           // showError(
  //           //   'Сервер ММВБ перегружен. Пожалуйста повторите свою попытку позднее'
  //           // )
  //         } else {
  //           onComplete(results)
  //         }
  //       if (onRender) onRender()
  //     },
  //     error: function(err, file, inputElem, reason) {
  //       console.log(err)
  //       // TODO:
  //       // showError(
  //       //   'Произошла ошибка при доступе к сервису ММВБ. Я изучаю данный момент. А пока попробуйте перезагрузить страницу или зайдите позднее'
  //       // )
  //     }
  //   })
  // },
  // // Функция аккумулирования загруженных на дату открытых позиций в хэш-массиве
  // accumulateCsv: function(results) {
  //   app.onCsvComplete(results)
  //   // структурированные данные из объекта на дату добавляем в хэш-массив
  //   if (results.data[0].moment !== '') {
  //     app.openPositionsDynamics[results.data[0].moment] = app.openPositions
  //     app.renderDynamicDataPortion(app.openPositions)
  //     // отметим день, который обработали
  //     app.workingPeriodSync.pop()
  //     // if (app.workingPeriodSync.length == 0)
  //     //     app.renderDynamics();
  //   }
  // },
  // // Функция загрузки курса валюты на дату
  // loadUsdRate: function(momentFrom, momentTo) {
  //   const resultCallback = function(result) {
  //     app.renderRates(result)
  //   }
  //   const resultSpotCallback = function(result) {
  //     app.renderSpotRates(result)
  //   }
  //   app.clearRatesError()
  //   // TODO:
  //   // charts.ChartMan.drawCurrencyRatesChart()
  //   api.getUSDRatesJSON(
  //     momentFrom,
  //     momentTo,
  //     resultCallback,
  //     app.renderRatesError
  //   )
  //   api.getSpotUSDRatesJSON(
  //     momentFrom,
  //     momentTo,
  //     resultSpotCallback,
  //     app.renderRatesError
  //   )
  // },
  // // Функция отрисовки для "динамики"
  // renderDynamicDataPortion: function(openPositions) {
  //   const key = app.controls.dropdown.val()
  //   const data = app.transformPositionsData(openPositions[key])
  //   // TODO
  //   // charts.ChartMan.updatePeriodChartWithDataPortion(
  //   //   openPositions[key].get('moment'),
  //   //   data
  //   // )
  // },
  // // функция для отрисовки данных Курса ЦБ
  // // TODO: отрефакторить - убрать параметр с данными?
  // renderRates: function(data) {
  //   // TODO:
  //   // charts.ChartMan.updateRatesChartWithDataset(data, 0)
  // },
  // // для второго набора данных (от ММВБ)
  // renderSpotRates: function(data) {
  //   // TODO:
  //   // charts.ChartMan.updateRatesChartWithDataset(data, 1)
  // },
  // // // Очистка области с ошибками загрузки курса доллара
  // // clearRatesError: function() {
  // //   $('.rates-error-border').hide()
  // // },
  // // // Отображение ошибки загрузки курса доллара
  // // renderRatesError: function() {
  // //   $('.rates-error-border').show()
  // // },
  // controls: {},
  // // // Инициация DatePicker с указанным именем, указанной датой (moment)
  // // initDatePicker: function(pickerId, defaultMoment) {
  // //   $(pickerId).datepicker({
  // //     format: 'dd.mm.yyyy',
  // //     weekStart: 1,
  // //     todayBtn: 'linked',
  // //     autoclose: true,
  // //     todayHighlight: true,
  // //     daysOfWeekDisabled: '0,6',
  // //     language: 'ru'
  // //     // TODO: Разобраться, как проинициализировать датапикер пограничной датой (endDate)
  // //     // ,endDate: '04.11.2016'
  // //     // ,endDate: app.getPreviousTradingDay().format('DD.MM.YYYY')
  // //   })
  // //   $(pickerId).datepicker('setDate', defaultMoment.toDate())
  // //   $(pickerId).datepicker('update')
  // // },
  // // // инициализация интерфейса
  // // initView: function() {
  // //   app.controls.dropdown = $('.select-features-list').select2({
  // //     placeholder: 'Выберите инструмент',
  // //     data: app.featuresListRaw
  // //   })
  // //   $('.select-features-list')
  // //     .val('Si_F')
  // //     .trigger('change')
  // //   app.initDatePicker('#datepicker', app.getPreviousTradingDay())
  // //   // app.initDatePicker('#datepickerFrom', app.getFirstDayOfMonth());
  // //   app.initDatePicker('#datepickerFrom', app.getPreviousTradingDay())
  // //   app.initDatePicker('#datepickerTo', app.getPreviousTradingDay())
  // // },
  // // Загрузка данных на дату и отображение на странице
  // loadData: function(moment, renderFunction) {
  //   app.loadMoexCsv(
  //     moment.format('YYYYMMDD'),
  //     app.onCsvComplete,
  //     renderFunction
  //   )
  // },
  // // Загрузка данных за период и отображение на странице
  // loadDataPeriod: function(momentFrom, momentTo) {
  //   const currentMoment = moment(momentFrom)
  //   app.openPositionsDynamics = {}
  //   // Отрисовываем пустой график
  //   // TODO:
  //   // charts.ChartMan.drawOpenPositionsDynamicsChart()
  //   // charts.ChartMan.drawOpenPositionsDynamicsChart2()
  //   // Заполнение массива для синхронизации потоков
  //   app.workingPeriodSync = []
  //   const currentMomentDup = moment(momentFrom)
  //   while (
  //     currentMomentDup.isBefore(momentTo, 'day') ||
  //     currentMomentDup.isSame(momentTo, 'day')
  //   ) {
  //     if (currentMomentDup.day() > 0 && currentMomentDup.day() < 7) {
  //       app.workingPeriodSync.push(currentMomentDup.format('YYYYMMDD'))
  //     }
  //     currentMomentDup.add(1, 'day')
  //   }
  //   // загрузка данных с ММВБ по открытым позициям за период
  //   while (
  //     currentMoment.isBefore(momentTo, 'day') ||
  //     currentMoment.isSame(momentTo, 'day')
  //   ) {
  //     if (currentMoment.day() > 0 && currentMoment.day() < 6) {
  //       app.loadMoexCsv(
  //         currentMoment.format('YYYYMMDD'),
  //         app.accumulateCsv,
  //         null /* app.renderDynamics */
  //       )
  //     }
  //     currentMoment.add(1, 'day')
  //   }
  //   // загрузка курсов USD за период
  //   // TODO: разнести загрузку и отображение
  //   app.loadUsdRate(momentFrom, momentTo)
  // },
  // // Transforms FeatureOpenPositions into table's row like data
  // transformPositionsData: function(positionsModel) {
  //   const fizShort = positionsModel
  //     .get('fiz')
  //     .get('short')
  //     .toJSON()
  //   const fizLong = positionsModel
  //     .get('fiz')
  //     .get('long')
  //     .toJSON()
  //   const jurShort = positionsModel
  //     .get('jur')
  //     .get('short')
  //     .toJSON()
  //   const jurLong = positionsModel
  //     .get('jur')
  //     .get('long')
  //     .toJSON()
  //   // const total = positionsModel.get('total').toJSON()
  //   const data = {}
  //   function makeRow(fizLong, fizShort, jurLong, jurShort) {
  //     return {
  //       fizLong: fizLong,
  //       fizShort: fizShort,
  //       jurLong: jurLong,
  //       jurShort: jurShort,
  //       total: fizLong + fizShort + jurLong + jurShort
  //     }
  //   }
  //   data.position = makeRow(
  //     fizLong.position,
  //     fizShort.position,
  //     jurLong.position,
  //     jurShort.position
  //   )
  //   data.change_prev_week_abs = makeRow(
  //     fizLong.change_prev_week_abs,
  //     fizShort.change_prev_week_abs,
  //     jurLong.change_prev_week_abs,
  //     jurShort.change_prev_week_abs
  //   )
  //   data.change_prev_week_perc = makeRow(
  //     fizLong.change_prev_week_perc,
  //     fizShort.change_prev_week_perc,
  //     jurLong.change_prev_week_perc,
  //     jurShort.change_prev_week_perc
  //   )
  //   data.clients = makeRow(
  //     fizLong.clients,
  //     fizShort.clients,
  //     jurLong.clients,
  //     jurShort.clients
  //   )
  //   return data
  // },
  // this.getForHoliday = function(mnt) {
  //   if (mnt.isSame('2016-11-06', 'day')) return moment('2016-11-03')
  //   if (mnt.isSame('2016-11-07', 'day')) return moment('2016-11-03')
  //   if (mnt.isSame('2017-01-03', 'day')) return moment('2016-12-30')
  //   if (mnt.isSame('2017-02-24', 'day')) return moment('2017-02-22')
  //   if (mnt.isSame('2017-03-09', 'day')) return moment('2017-03-07')
  //   if (mnt.isSame('2017-05-02', 'day')) return moment('2017-04-28')
  //   if (mnt.isSame('2017-05-09', 'day')) return moment('2017-05-05')
  //   if (mnt.isSame('2017-05-10', 'day')) return moment('2017-05-05')
  //   if (mnt.isSame('2017-06-13', 'day')) return moment('2017-06-09')
  //   if (mnt.isSame('2017-11-07', 'day')) return moment('2017-11-03')
  //   return undefined
  // }
  // this.getPreviousTradingDay = function() {
  //   let day
  //   switch (moment().day()) {
  //     case 0:
  //       day = moment().subtract(2, 'days')
  //       break
  //     case 1:
  //       day = moment().subtract(3, 'days')
  //       break
  //     default:
  //       day = moment().subtract(1, 'days')
  //       break
  //   }
  //   const forHoliday = this.getForHoliday(moment())
  //   return forHoliday === undefined ? day : forHoliday
  // }
  this.getFirstDayOfMonth = function() {
    // TODO: Доработать
    return moment().set('date', 4)
  }
}

// // --------------
// // Models
// // --------------

// // Dropdown
// app.FeatureListItem = Backbone.Model.extend({
//   defaults: {
//     value: '',
//     name: ''
//   }
// })

// // Short or Long positions
// app.DirectionPositions = Backbone.Model.extend({
//   defaults: {
//     change_prev_week_abs: 0,
//     change_prev_week_perc: 0,
//     clients: 0,
//     position: 0
//   }
// })

// app.ClientsPositions = Backbone.Model.extend({
//   defaults: {
//     filled: false,
//     long: new app.DirectionPositions(),
//     short: new app.DirectionPositions()
//   },

//   initialize: function(attributes, options) {
//     if (options) {
//       // console.log(options.change_prev_week_short_abs);
//       this.set(
//         'short',
//         new app.DirectionPositions({
//           change_prev_week_abs: options.change_prev_week_short_abs,
//           change_prev_week_perc: options.change_prev_week_short_perc,
//           clients: options.clients_in_lshort,
//           position: options.short_position
//         })
//       )
//       this.set(
//         'long',
//         new app.DirectionPositions({
//           change_prev_week_abs: options.change_prev_week_long_abs,
//           change_prev_week_perc: options.change_prev_week_long_perc,
//           clients: options.clients_in_long,
//           position: options.long_position
//         })
//       )
//       this.set('filled', true)
//     }
//   }
// })

// // Table
// app.FeatureOpenPositions = Backbone.Model.extend({
//   defaults: {
//     isin: '',
//     name: '',
//     moment: Date.now(),
//     fiz: new app.ClientsPositions(),
//     jur: new app.ClientsPositions(),
//     total: new app.DirectionPositions()
//   }
// })

// // --------------
// // Collections
// // --------------

// // Dropdown
// app.FeaturesList = Backbone.Collection.extend({})
// app.featuresList = new app.FeaturesList()

// app.featuresListRaw = []

// // --------------
// // Views
// // --------------

// // Dropdown
// app.FeatureListItemView = Backbone.View.extend({
//   //    model: new app.FeatureListItem(),
//   tagName: 'option',
//   initialize: function() {
//     this.template = _.template($('.feature-item-template-select').html())
//   },
//   render: function() {
//     this.$el.html(this.template(this.model.toJSON()))
//     return this
//   }
// })

// app.FeaturesListView = Backbone.View.extend({
//   model: app.featuresList,
//   el: $('.select-features-list'),
//   initialize: function() {
//     const self = this
//   },
//   render: function() {
//     const self = this
//     this.$el.html('')
//     _.each(this.model.toArray(), function(feature) {
//       const newEl = new app.FeatureListItemView({
//         model: feature
//       }).render().$el
//       self.$el.append(newEl)
//     })
//     return this
//   }
// })

// // Table
// app.OpenPositionView = Backbone.View.extend({
//   el: $('.position-details-table'),
//   initialize: function() {
//     this.template = _.template($('.position-details').html())
//   },
//   render: function() {
//     const data = app.transformPositionsData(this.model)

//     const mdata = _.extend({ pos: data }, app.viewHelpers)
//     this.$el.children('tbody').empty()
//     // this.$el.children('tbody').html(this.template({pos: data}));
//     this.$el.children('tbody').html(this.template(mdata))

//     const clickHandler = function(event) {
//       const row_data = event.data.pos[$(this).data('name')]
//       charts.ChartMan.drawChart2(row_data)
//     }

//     // Binds handler on table's row click
//     $('.position-details-table tbody tr').on(
//       'click',
//       { pos: data },
//       clickHandler
//     )
//     return this
//   }
// })

// // Helpers for View
// App.viewHelpers = {
//   numberFormat: function(number) {
//     return s.numberFormat(number, 0, ',', ' ')
//   },
//   numberFormat2: function(number) {
//     return s.numberFormat(number, 2, ',', ' ')
//   },
//   numberFormatPerc: function(number) {
//     return s.numberFormat(number * 100, 2, ',', ' ')
//   }
// }

// // Application
// app.AppView = Backbone.View.extend({
//   el: $('.container'),
//   initialize: function() {
//     // this.showStaticBtn = this.$('#show-static-btn');
//     // this.showDynamicBtn = this.$('#show-dynamic-btn')
//   },
//   events: {
//     'click #show-static-btn': 'showOpenPositions',
//     'click #show-dynamics-btn': 'showPositionsDynamic'
//   },
//   // обработчик клика по кнопке Показать на дату
//   showOpenPositions: function(e) {
//     $('.error-area').html()
//     $('.error-area').hide()

//     const onRender = function() {
//       const key = app.controls.dropdown.val()

//       new app.OpenPositionView({
//         model: app.openPositions[key]
//       }).render()

//       const data = app.transformPositionsData(app.openPositions[key])

//       // ChartMan.drawChart(app.openPositions[key]);
//       charts.ChartMan.drawChart2(data.position)
//     }

//     app.loadData(moment($('#datepicker').val(), 'DD.MM.YYYY'), onRender)
//   },

//   // обработчик клика по кнопке Показать за период
//   showPositionsDynamic: function(e) {
//     app.loadDataPeriod(
//       moment($('#datepickerFrom').val(), 'DD.MM.YYYY'),
//       moment($('#datepickerTo').val(), 'DD.MM.YYYY')
//     )
//   }
// })

// $(document).ready(
//   // TODO: Load data on page load
//   function() {
//     $('.select-features-list').select2({
//       placeholder: ' Загрузка...',
//       data: app.featuresListRaw
//     })
//     app.loadData(app.getPreviousTradingDay(), app.initView)
//   }
// )

const app = new App()

export default app
