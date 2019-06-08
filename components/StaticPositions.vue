<template>
  <div>
    <!-- Таблица с информацией об открытых позициях -->
    <b-row class="table-row">
      <b-col xs="7" sm="9" md="9" class="text-right text-header">
        Дата:
      </b-col>
      <b-col xs="3" sm="2" md="2">
        <!-- <input id="datepicker" type="text" class="form-control" /> -->
        <DatePicker
          v-model="datePicker.value"
          :language="datePicker.language"
          :monday-first="datePicker.mondayFirst"
          :disabled-dates="datePicker.disabledDates"
          :highlighted="datePicker.highlightedDates"
          :format="datePicker.format"
        />
      </b-col>
      <b-col xs="2" sm="1" md="1">
        <b-btn
          id="show-static-btn"
          variant="info"
          type="submit"
          :disabled="!showButtonEnabled"
          @click="showOpenPositions"
        >
          Показать
        </b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" sm="12" md="12" class="table-row">
        <b-table
          bordered
          hover
          position-details-table
          primary-key="code"
          :items="tableItems"
          :fields="tableFields"
          :busy="tableBusy"
          @row-clicked="onRowClicked"
        >
          <template name="table-colgroup ">
            <col />
            <colgroup span="2"></colgroup>
            <colgroup span="2"></colgroup>
            <colgroup></colgroup>
          </template>
          <template slot="thead-top">
            <tr>
              <td rowspan="2"></td>
              <th colspan="2" scope="colgroup">Физические лица</th>
              <th colspan="2" scope="colgroup">Юридические лица</th>
              <th rowspan="2" scope="colgroup">
                Совокупный объем открытых позиций
              </th>
            </tr>
            <tr>
              <th scope="col">Длинные позиции</th>
              <th scope="col">Короткие позиции</th>
              <th scope="col">Длинные позиции</th>
              <th scope="col">Короткие позиции</th>
            </tr>
          </template>

          <!--
            // const fmt = '0,0'
      const fmt = code === 'changePrevWeekPerc' ? '0.00' : '0,0'
      const multi = code === 'changePrevWeekPerc' ? 100 : 1
      numeral(fizLong)
          .multiply(multi)
          .format(fmt),
           -->
          <!-- <template slot="fizLong" slot-scope="{ data }"
            >{{ data }}
          </template> -->
        </b-table>
      </b-col>
    </b-row>
    <!-- Область с диаграммами -->
    <b-row class="chart-row">
      <b-col xs="6" sm="6" md="6" class="chart-area">
        <!-- <canvas id="fizPositionChart"></canvas> -->
        <pie-chart
          v-if="showChart"
          :title="fizChartTitle"
          :chart-data="fizChartData"
        ></pie-chart>
      </b-col>
      <b-col xs="6" sm="6" md="6" class="chart-area">
        <!-- <canvas id="jurPositionChart"></canvas> -->
        <pie-chart
          v-if="showChart"
          :title="jurChartTitle"
          :chart-data="jurChartData"
        ></pie-chart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import { ru } from 'vuejs-datepicker/dist/locale'

import PieChart from './PieChart'
import charts from './../plugins/charts' // TODO: do we need it?
import { Moex } from './../plugins/moex'

// import { DateTime } from 'luxon'

const numeral = require('numeral')
const moment = require('moment')
const moex = new Moex()

const tableRowHeaders = {
  position: 'Количество договоров (контрактов), шт.',
  changePrevWeekAbs:
    'Изменение количества договоров (контрактов) по отношению к предыдущему дню, шт.',
  changePrevWeekPerc:
    'Относительное изменение количества договоров (контрактов) по отношению к предыдущему дню, в %',
  clients: 'Количество лиц, имеющих открытые позиции'
}

// const moex = require('./../plugins/moex.js')

// const date = new Date(2016, 8, 16)

// const date1 = app.getPreviousTradingDay().toDate()
// const date2 = moment('2016-09-16').toDate()
// const date3 = DateTime.local(2016, 9, 16).toJSDate()

// TODO: why moment.toDate() is not a date
// console.log(typeof date)
// console.log(typeof date2)
// console.log(typeof date3)

// console.log(date instanceof Date)
// console.log(date2 instanceof Date)
// console.log(date3 instanceof Date)

// console.log('----------------------')

export default {
  components: {
    DatePicker,
    PieChart
  },
  props: {
    feature: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // moment
    startDate: {
      type: Object,
      default: function() {
        return moment()
      }
    },
    // openPositions: {
    //   type: Object,
    //   default: function() {
    //     return null
    //   }
    // },
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
        value: this.startDate.toISOString()
        // value: app.getPreviousTradingDay().toDate(),
        // selectedValue: ''
      },
      // TODO: union in one object?
      // tableRowHeadersPosition: 'Количество договоров (контрактов), шт.',
      // tableRowHeadersChangePrevWeekAbs:
      //   'Изменение количества договоров (контрактов) по отношению к предыдущему дню, шт.',
      // tableRowHeadersChangePrevWeekPerc:
      //   'Относительное изменение количества договоров (контрактов) по отношению к предыдущему дню, в %',
      // tableRowHeadersClients: 'Количество лиц, имеющих открытые позиции',
      // --
      // tableRowHeaders: {
      //   position: 'Количество договоров (контрактов), шт.',
      //   changePrevWeekAbs:
      //     'Изменение количества договоров (контрактов) по отношению к предыдущему дню, шт.',
      //   changePrevWeekPerc:
      //     'Относительное изменение количества договоров (контрактов) по отношению к предыдущему дню, в %',
      //   clients: 'Количество лиц, имеющих открытые позиции'
      // },
      tableFields: [
        { key: 'name' },
        { key: 'fizLong', tdClass: 'rightCell' },
        { key: 'fizShort', tdClass: 'rightCell' },
        { key: 'jurLong', tdClass: 'rightCell' },
        { key: 'jurShort', tdClass: 'rightCell' },
        { key: 'total', tdClass: 'rightCell' }
      ],
      tableItems: [
        {
          code: 'position',
          name: tableRowHeaders.position,
          fizLong: '-',
          fizShort: '-',
          jurLong: '-',
          jurShort: '-',
          total: '-'
        },
        {
          code: 'changePrevWeekAbs',
          name: tableRowHeaders.changePrevWeekAbs,
          fizLong: '-',
          fizShort: '-',
          jurLong: '-',
          jurShort: '-',
          total: '-'
        },
        {
          code: 'changePrevWeekPerc',
          name: tableRowHeaders.changePrevWeekPerc,
          fizLong: '-',
          fizShort: '-',
          jurLong: '-',
          jurShort: '-',
          total: '-'
        },
        {
          code: 'clients',
          name: tableRowHeaders.clients,
          fizLong: '-',
          fizShort: '-',
          jurLong: '-',
          jurShort: '-',
          total: '-'
        }
      ],
      fizChartTitle: 'Физические лица, %',
      fizChartData: {},
      jurChartTitle: 'Юридические лица, %',
      JurChartData: {},
      showChart: false,
      tableBusy: false
      // innerOpenPositions: this.openPositions
    }
  },
  computed: {
    datePickerValue() {
      return this.datePicker.value
    }
  },
  watch: {
    // openPositions: function(val) {
    //   this.innerOpenPositions = val
    // },
    datePickerValue: function(val) {
      console.log('datePickerValue', val)

      // moex
      // .loadMoexCsv(moment(val).format('YYYYMMDD'))
      // .then(openPositions => {
      //   this.innerOpenPositions = openPositions
      //   // this.showOpenPositions()
      // })
    }
  },
  mounted() {
    console.log('AXIOS', this.$axios)
    this.setNumeralSettings()
    // TODO: why moment.toDate() is not a date
    // console.log(typeof date)
    // console.log(typeof date2)
    // console.log(typeof date3)
    // console.log(date instanceof Date)
    // console.log(date2 instanceof Date)
    // console.log(date3 instanceof Date)
    // console.log(this.validateDateInput(date))
    // console.log(this.validateDateInput(date2))
    // console.log(this.validateDateInput(date3))
  },
  methods: {
    updateChartData: function(code) {
      const position = this.tableItems.filter(item => item.code === code)[0]
      this.fizChartData = charts.getPieData(position.fizLong, position.fizShort)
      this.jurChartData = charts.getPieData(position.jurLong, position.jurShort)
      this.showChart = true
    },
    onRowClicked: function(selectedItem) {
      this.updateChartData(selectedItem.code)
    },
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

      this.tableItems = []
      this.tableItems.push(
        this.makeRow(
          'position',
          tableRowHeaders.position,
          fizLong.position,
          fizShort.position,
          jurLong.position,
          jurShort.position
        )
      )
      this.tableItems.push(
        this.makeRow(
          'changePrevWeekAbs',
          tableRowHeaders.changePrevWeekAbs,
          fizLong.changePrevWeekAbs,
          fizShort.changePrevWeekAbs,
          jurLong.changePrevWeekAbs,
          jurShort.changePrevWeekAbs
        )
      )
      this.tableItems.push(
        this.makeRow(
          'changePrevWeekPerc',
          tableRowHeaders.changePrevWeekPerc,
          fizLong.changePrevWeekPerc,
          fizShort.changePrevWeekPerc,
          jurLong.changePrevWeekPerc,
          jurShort.changePrevWeekPerc
        )
      )
      this.tableItems.push(
        this.makeRow(
          'clients',
          tableRowHeaders.clients,
          fizLong.clients,
          fizShort.clients,
          jurLong.clients,
          jurShort.clients
        )
      )
    },
    populateTableItems: function(data) {
      this.tableItems = []
    },
    showOpenPositions: function() {
      // console.log(1, this.innerOpenPositions)
      // if (!this.innerOpenPositions) return
      // console.log(2, this.fizChartTitle)
      // console.log(this.feature.code)

      this.tableBusy = true
      const self = this
      moex
        // .loadMoexCsv(this.startDate.format('YYYYMMDD'))
        .loadMoexCsv(moment(this.datePickerValue).format('YYYYMMDD'))
        .then(openPositions => {
          self.transformPositionsData(openPositions[self.feature.code])
          self.tableBusy = false
          self.updateChartData('position')
        })

      // this.transformPositionsData(this.innerOpenPositions[this.feature.code])
      // this.updateChartData('position')
    },
    setNumeralSettings: function() {
      const locale = {
        delimiters: {
          thousands: ' ',
          decimal: ','
        }
      }

      if (numeral.locales.ru === undefined) {
        numeral.register('locale', 'ru', locale)
        numeral.locale('ru')
      }
    }
    // validateDateInput: function(val) {
    //   return (
    //     val === null ||
    //     val instanceof Date ||
    //     typeof val === 'string' ||
    //     typeof val === 'number'
    //   )
    // }
  }
}

// this.$emit('filter-params-updated', this.getFilterParams())
</script>

<style>
thead > tr:nth-child(3) {
  display: none;
}
.table td.rightCell {
  text-align: right;
}
</style>
