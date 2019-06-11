<template>
  <div>
    <b-row class="table-row">
      <b-col xs="6" sm="6" md="6" class="text-right text-header">
        Интервал c:
      </b-col>
      <b-col xs="2" sm="2" md="2">
        <!-- <input id="datepickerFrom" type="text" class="form-control" /> -->
        <DatePicker
          id="datepickerFrom"
          v-model="datePicker.fromValue"
          :language="datePicker.language"
          :monday-first="datePicker.mondayFirst"
          :disabled-dates="datePicker.disabledDates"
          :highlighted="datePicker.highlightedDates"
          :format="datePicker.format"
        />
      </b-col>
      <b-col xs="1" sm="1" md="1" class="text-center text-header">
        по:
      </b-col>
      <b-col xs="2" sm="2" md="2">
        <!-- <input id="datepickerTo" type="text" class="form-control" /> -->
        <DatePicker
          id="datepickerTo"
          v-model="datePicker.toValue"
          :language="datePicker.language"
          :monday-first="datePicker.mondayFirst"
          :disabled-dates="datePicker.disabledDates"
          :highlighted="datePicker.highlightedDates"
          :format="datePicker.format"
        />
      </b-col>
      <b-col xs="1" sm="1" md="1">
        <button
          id="show-dynamics-btn"
          class="btn btn-info"
          type="submit"
          onclick="yaCounter40656204.reachGoal('show-dynamics-btn'); return true;"
          @click="showPositionsDynamic"
        >
          Показать
        </button>
      </b-col>
    </b-row>
    <!-- Область с диаграммами -->
    <b-row>
      <b-col xs="12" sm="12" md="12" class="chart-area">
        <!-- <canvas id="openPositionsDynamicsChart" height="120"></canvas> -->
        <line-chart
          v-if="showChart"
          id="openPositionsDynamicsChart"
          :height="chartHeight"
          :chart-data="longPercChartData"
          :options="longChartOptions(longPercTitle)"
        ></line-chart>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" sm="12" md="12" class="chart-area">
        <!-- <canvas id="openPositionsDynamicsChart2" height="120"></canvas> -->
        <!-- TODO: rename id -->
        <line-chart
          v-if="showChart"
          id="openPositionsDynamicsChart2"
          :height="chartHeight"
          :chart-data="longAbsChartData"
          :options="longChartOptions(longAbsTitle)"
        ></line-chart>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" sm="12" md="12" class="chart-area">
        <div class="rates-error-border">
          <!-- TODO: return error handling -->
          <!-- <h3 class="rates-error text-center">
            Здесь должен быть график курса доллара. К сожалению, сервис в данный
            момент недоступен, либо произошла ошибка и я работаю над ее
            устранением
          </h3> -->
        </div>
        <!-- <canvas id="currencyRatesChart" height="120"></canvas> -->
        <line-chart
          v-if="showChart"
          id="currencyRatesChart"
          :height="chartHeight"
          :title="longAbsTitle"
          :chart-data="ratesChartData"
          :options="ratesChartOptions()"
        ></line-chart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import { ru } from 'vuejs-datepicker/dist/locale'
import { Moex } from './../plugins/moex'

import LineChart from './LineChart'
import charts from './../plugins/charts'

const moment = require('moment')
const moex = new Moex()
const _ = require('underscore')

const initialDynamicDataSet = function() {
  const dataSet = {}
  Object.assign(dataSet, { fizData: [], jurData: [], totalData: [] })

  return dataSet
}

const initialRatesDataSet = function() {
  const dataSet = {}
  Object.assign(dataSet, { usdRates: [], spotUsdRates: [] })

  return dataSet
}

// TODO: eliminate duplication
const tableRowHeaders = {
  position: 'Количество договоров (контрактов), шт.',
  changePrevWeekAbs:
    'Изменение количества договоров (контрактов) по отношению к предыдущему дню, шт.',
  changePrevWeekPerc:
    'Относительное изменение количества договоров (контрактов) по отношению к предыдущему дню, в %',
  clients: 'Количество лиц, имеющих открытые позиции'
}

export default {
  components: { DatePicker, LineChart },
  props: {
    feature: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // moment
    fromDate: {
      type: Object,
      default: function() {
        return moment()
      }
    },
    // moment
    toDate: {
      type: Object,
      default: function() {
        return moment()
      }
    },
    openPositions: {
      type: Object,
      default: function() {
        return null
      }
    },
    showButtonEnabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      datePicker: {
        language: ru,
        disabledDates: {
          days: [6, 0]
        },
        highlightedDates: {
          dates: [new Date()],
          // customPredictor: function(date) {
          //   const today = new Date()

          //   return (
          //     date &&
          //     today.year === date.year &&
          //     today.month === date.month &&
          //     today.day === date.day
          //   )
          // },
          includeDisabled: true
        },
        mondayFirst: true,
        format: 'dd.MM.yyyy',
        fromValue: this.fromDate.toISOString(),
        toValue: this.toDate.toISOString()
      },
      // Initial data sets
      longPercData: initialDynamicDataSet(),
      longAbsData: initialDynamicDataSet(),
      ratesData: initialRatesDataSet(),
      // Chart titles
      longPercTitle: 'Доля лонгов в общем количестве КОНТРАКТОВ, %',
      longAbsTitle: 'Количество лонговых контрактов, шт.',
      // Charts options
      longChartOptions: charts.longChartOptions,
      ratesChartOptions: charts.ratesChartOptions,
      // ChartData objects
      longPercChartData: charts.getDynamicData({}),
      longAbsChartData: charts.getDynamicData({}),
      ratesChartData: charts.getRatesData({}),

      showChart: true,
      chartHeight: 165
    }
  },
  computed: {
    // TODO: do we need computed props?
    datePickerFromValue() {
      return this.datePicker.fromValue
    },
    datePickerToValue() {
      return this.datePicker.toValue
    }
  },
  methods: {
    // TODO: eliminate duplication with Static positions component
    makeRow: function(code, name, fizLong, fizShort, jurLong, jurShort) {
      return {
        code: code,
        name: name,
        fizLong: fizLong,
        fizShort: fizShort,
        jurLong: jurLong,
        jurShort: jurShort,
        total: fizLong + fizShort + jurLong + jurShort
      }
    },
    transformPositionsData: function(positionsModel) {
      if (!positionsModel) return

      const fizShort = positionsModel.fiz.short
      const fizLong = positionsModel.fiz.long
      const jurShort = positionsModel.jur.short
      const jurLong = positionsModel.jur.long

      const returnValue = {}
      const tempArr = []

      tempArr.push(
        this.makeRow(
          'position',
          tableRowHeaders.position,
          fizLong.position,
          fizShort.position,
          jurLong.position,
          jurShort.position
        )
      )
      tempArr.push(
        this.makeRow(
          'changePrevWeekAbs',
          tableRowHeaders.changePrevWeekAbs,
          fizLong.changePrevWeekAbs,
          fizShort.changePrevWeekAbs,
          jurLong.changePrevWeekAbs,
          jurShort.changePrevWeekAbs
        )
      )
      tempArr.push(
        this.makeRow(
          'changePrevWeekPerc',
          tableRowHeaders.changePrevWeekPerc,
          fizLong.changePrevWeekPerc,
          fizShort.changePrevWeekPerc,
          jurLong.changePrevWeekPerc,
          jurShort.changePrevWeekPerc
        )
      )
      tempArr.push(
        this.makeRow(
          'clients',
          tableRowHeaders.clients,
          fizLong.clients,
          fizShort.clients,
          jurLong.clients,
          jurShort.clients
        )
      )

      tempArr.forEach(el => (returnValue[el.code] = el))

      return returnValue
    },
    eachChunkProcessCallback: function(openPositions) {
      if (!this.feature.code) return

      const data = this.transformPositionsData(openPositions[this.feature.code])
      if (!openPositions[this.feature.code]) return

      this.updatePeriodChartWithDataPortion(
        openPositions[this.feature.code].moment,
        data
      )
    },
    updateRateChartOptions: function() {},
    ratesProcessCallback: function(rates, spotRates) {
      this.ratesData.usdRates = charts.prepareRatesData(rates)
      this.ratesData.spotUsdRates = charts.prepareRatesData(spotRates)
      this.ratesChartData = charts.getRatesData(this.ratesData)
      this.updateRateChartOptions()
    },
    // Функция отображения на графике динамики открытых позиций новой порции данных (открытые позиции за новый день)
    updatePeriodChartWithDataPortion: function(moment, openPositions) {
      // Рассчитываем данные
      // ОТНОСИТЕЛЬНЫЕ КОНТРАКТЫ
      const fizLongPerc =
        (openPositions.position.fizLong /
          (openPositions.position.fizLong + openPositions.position.fizShort)) *
        100
      const jurLongPerc =
        (openPositions.position.jurLong /
          (openPositions.position.jurLong + openPositions.position.jurShort)) *
        100
      const totalLongPerc =
        ((openPositions.position.fizLong + openPositions.position.jurLong) /
          (openPositions.position.fizLong +
            openPositions.position.fizShort +
            openPositions.position.jurLong +
            openPositions.position.jurShort)) *
        100

      // АБСОЛЮТНЫЕ ЛОНГОВЫЕ КОНТРАКТЫ
      const fizLong = openPositions.clients.fizLong
      const jurLong = openPositions.clients.jurLong
      const totalLong =
        openPositions.clients.fizLong + openPositions.clients.jurLong

      // Добавляем данные в соответствующие массивы
      // ОТНОСИТЕЛЬНЫЕ КОНТРАКТЫ
      this.longPercData.fizData.push({
        x: moment,
        y: fizLongPerc
      })

      this.longPercData.jurData.push({
        x: moment,
        y: jurLongPerc
      })

      this.longPercData.totalData.push({
        x: moment,
        y: totalLongPerc
      })

      // // АБСОЛЮТНЫЕ КОНТРАКТЫ
      this.longAbsData.fizData.push({
        x: moment,
        y: fizLong
      })

      this.longAbsData.jurData.push({
        x: moment,
        y: jurLong
      })

      this.longAbsData.totalData.push({
        x: moment,
        y: totalLong
      })

      // Которые затем пересортировываем
      // TODO: move to common function
      // ОТНОСИТЕЛЬНЫЕ КОНТРАКТЫ
      this.longPercData.fizData = _.sortBy(this.longPercData.fizData, 'x')
      this.longPercData.jurData = _.sortBy(this.longPercData.jurData, 'x')
      this.longPercData.totalData = _.sortBy(this.longPercData.totalData, 'x')

      // // АБСОЛЮТНЫЕ КОНТРАКТЫ
      this.longAbsData.fizData = _.sortBy(this.longAbsData.fizData, 'x')
      this.longAbsData.jurData = _.sortBy(this.longAbsData.jurData, 'x')
      this.longAbsData.totalData = _.sortBy(this.longAbsData.totalData, 'x')

      // Обновляем график
      this.longPercChartData = charts.getDynamicData(this.longPercData)
      this.longAbsChartData = charts.getDynamicData(this.longAbsData)
    },
    // TODO: do we need chart options update logic?
    updateRatesChartWithDataset: function(data, type) {
      // Обновляем график
      if (this.currencyRatesChart) {
        periodBoundaries = charts.getMinMaxDates(data)

        this.ratesDatasets[type].data = charts.prepareRatesData(data)

        if (this.currencyRatesChart) {
          this.currencyRatesChart.options.scales.xAxes[0].time.min =
            periodBoundaries.min
          this.currencyRatesChart.options.scales.xAxes[0].time.max =
            periodBoundaries.max

          this.currencyRatesChart.update()
        }
      }
    },
    showPositionsDynamic: function() {
      this.longPercData = initialDynamicDataSet()
      this.longAbsData = initialDynamicDataSet()
      this.ratesData = initialRatesDataSet()

      moex.loadDataPeriod(
        moment(this.datePickerFromValue),
        moment(this.datePickerToValue),
        this.eachChunkProcessCallback,
        this.ratesProcessCallback,
        error => {
          this.$emit('error', error)
        }
      )
    }
  }
}
</script>
