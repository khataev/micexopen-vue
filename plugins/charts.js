'use strict'

import moment from 'moment'

const charts = {
  longChartOptions(title) {
    return {
      title: {
        display: true,
        text: title
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'week'
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  },
  ratesChartOptions() {
    return {
      title: {
        display: true,
        text: 'Курс доллара'
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'week'
            }
          }
        ]
      }
    }
  },

  // Формирование данных для графика открытых позиций на дату
  getPieData: function(rawLong, rawShort) {
    const long = Math.abs(rawLong)
    const short = Math.abs(rawShort)
    const longPerc = Math.round((long / (long + short)) * 100)
    const shortPerc = Math.round((short / (long + short)) * 100)
    return {
      labels: [
        `Длинные позиции: ${longPerc} %`,
        `Короткие позиции: ${shortPerc} %`
      ],
      datasets: [
        {
          label: 'Физические лица',
          data: [long, short],
          backgroundColor: ['#4deb5a', '#eb5342'],
          hoverBackgroundColor: ['#28eb24', '#eb2d22']
        }
      ]
    }
  },

  // Изначальные данные для графика за период
  // TODO: можно ли перенести значение по умолчанию - сюда?
  // getDynamicData: function(dynamicDataset = {fizData: [], jurData: [], totalData: []}) {
  getDynamicData: function(dynamicDataset = {}) {
    return {
      datasets: [
        {
          label: 'Контракты физлиц',
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,235,230,0.1)',
          data: dynamicDataset.fizData || []
        },
        {
          label: 'Контракты юрлиц',
          borderColor: 'rgba(24,240,60,1)',
          backgroundColor: 'rgba(180,232,167,0.1)',
          data: dynamicDataset.jurData || []
        },
        {
          label: 'Контракты итого',
          borderColor: 'rgba(219,11,157,1)',
          backgroundColor: 'rgba(229,167,232,0.1)',
          data: dynamicDataset.totalData || []
        }
      ]
    }
  },

  // Изначальные данные для графика курса доллара
  // getRatesData: function (ratesDataset = {usdRates: [], spotUsdRates: []}) {
  getRatesData: function(ratesDataset = {}) {
    return {
      datasets: [
        {
          label: 'Курс USD ЦБ РФ',
          borderColor: 'rgba(219,11,94,1)',
          backgroundColor: 'rgba(229,167,232,0.1)',
          data: ratesDataset.usdRates || []
        },
        {
          label: 'Курс USDRUB_TOM (CLOSE)',
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,235,230,0.1)',
          data: ratesDataset.spotUsdRates || []
        }
      ]
    }
  },

  // Функция преобразования данных в виде обхекта вида "2016-01-11": 72.9299 в формат  charts.js {x: "2016-01-11":, y: 72.9299}
  // data - данные от API за период
  prepareRatesData: function(data) {
    const chartData = []
    if (data && data.rates) {
      for (const key in data.rates) {
        // TODO: Подумать над тем, как быть с нулем из-за несуществующего дня в данных от ММВБ (почему не возвращается последний торговый день?)
        if (data.rates[key] > 0) {
          chartData.push({
            x: key,
            y: data.rates[key]
          })
        }
      }
    }
    return chartData
  },

  // Получить максимальную дату из всех курсов
  getMinMaxDates: function(data) {
    const result = {}
    if (data && data.rates) {
      for (const key in data.rates) {
        if (!result.max || moment(result.max) < moment(key)) result.max = key
        if (!result.min || moment(result.min) > moment(key)) result.min = key
      }
    }
    return result
  }
}

export default charts
