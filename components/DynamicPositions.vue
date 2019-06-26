<template>
  <div>
    <b-row class="table-row" no-gutters>
      <b-col cols="6" sm="6" md="6" class="text-right">
        <p class="text-header">Интервал c:</p>
      </b-col>
      <b-col cols="2" sm="2" md="2">
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
      <b-col cols="1" sm="1" md="1" class="text-center">
        <p class="text-header">по:</p>
      </b-col>
      <b-col cols="2" sm="2" md="2">
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
      <b-col cols="1" sm="1" md="1">
        <b-btn
          id="show-dynamics-btn"
          variant="info"
          type="submit"
          size="sm"
          onclick="yaCounter40656204.reachGoal('show-dynamics-btn'); return true;"
          @click="showPositionsDynamic"
          :disabled="!showButtonEnabled"
        >Показать</b-btn>
      </b-col>
    </b-row>
    <!-- Область с диаграммами -->
    <!-- Доля лонгов -->
    <b-row>
      <b-col cols="12" sm="12" md="12" class="chart-area">
        <line-chart
          :height="chartHeight"
          :chart-data="longPercChartData"
          :options="longChartOptions(longPercTitle)"
        ></line-chart>
      </b-col>
    </b-row>
    <!-- Количество лонгов -->
    <b-row>
      <b-col cols="12" sm="12" md="12" class="chart-area">
        <line-chart
          :height="chartHeight"
          :chart-data="longAbsChartData"
          :options="longChartOptions(longAbsTitle)"
        ></line-chart>
      </b-col>
    </b-row>
    <!-- Курс доллара -->
    <b-row>
      <div id="usd-rates-spinner" class="text-center">
        <b-spinner v-if="showUsdSpinner" variant="primary" class="align-middle"></b-spinner>
      </div>
      <div id="usd-rates-chart">
        <b-col cols="12" sm="12" md="12" class="chart-area">
          <line-chart
            :height="chartHeight"
            :title="longAbsTitle"
            :chart-data="ratesChartData"
            :options="ratesChartOptions()"
          ></line-chart>
        </b-col>
      </div>
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

// dummy headers, as we need only long data dynamics
const tableRowHeaders = {
  position: '',
  changePrevWeekAbs: '',
  changePrevWeekPerc: '',
  clients: ''
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

      showUsdSpinner: false,
      chartHeight: 165
    }
  },
  computed: {
    startMoment: function() {
      return moment(this.datePicker.fromValue)
    },
    endMoment: function() {
      return moment(this.datePicker.toValue)
    }
  },
  methods: {
    clearError: function() {
      this.$emit('clearError')
    },
    makeRow: moex.makeTransformedRow,
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
    // updateRateChartOptions: function() {},
    ratesProcessCallback: function(rates, spotRates) {
      this.ratesData.usdRates = charts.prepareRatesData(rates)
      this.ratesData.spotUsdRates = charts.prepareRatesData(spotRates)
      this.ratesChartData = charts.getRatesData(this.ratesData)
      // this.updateRateChartOptions()
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
    showPositionsDynamic: async function() {
      this.clearError()
      this.showUsdSpinner = true
      this.longPercData = initialDynamicDataSet()
      this.longAbsData = initialDynamicDataSet()
      this.ratesProcessCallback([], [])

      moex.loadDataPeriod(
        this.startMoment,
        this.endMoment,
        this.eachChunkProcessCallback,
        error => {
          this.$emit('error', error)
        }
      )

      try {
        const usdRates = await this.$axios.$get('/api/rates/usd', {
          params: {
            start_date: this.startMoment.format('YYYYMMDD'),
            end_date: this.endMoment.format('YYYYMMDD')
          }
        })

        console.log('usdRates', usdRates)

        const spotUsdRates = await this.$axios.$get('/api/rates/usd_tom', {
          params: {
            start_date: this.startMoment.format('YYYYMMDD'),
            end_date: this.endMoment.format('YYYYMMDD')
          }
        })

        console.log('spotUsdRates', spotUsdRates)

        this.ratesProcessCallback(usdRates, spotUsdRates)
      } catch (error) {
        this.$emit('error', error)
      }

      this.showUsdSpinner = false
    }
  }
}
</script>

<style scoped>
.tab-content {
  padding-top: 20px;
}
#usd-rates-spinner {
  position: absolute;
  width: 100%;
  border: 2px;
  line-height: 400px;
}
#usd-rates-chart {
  position: absolute;
  width: 100%;
}
</style>