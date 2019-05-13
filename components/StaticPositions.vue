<template>
  <div>
    <!-- Таблица с информацией об открытых позициях -->
    <div class="row table-row">
      <b-col xs="7" sm="9" md="9" class="text-right text-header">
        Дата:
      </b-col>
      <b-col xs="3" sm="2" md="2">
        <!-- <input id="datepicker" type="text" class="form-control" /> -->
        <DatePicker
          :language="datePicker.language"
          :monday-first="datePicker.mondayFirst"
          :disabled-dates="datePicker.disabledDates"
          :highlighted="datePicker.highlightedDates"
          :format="datePicker.format"
        />
      </b-col>
      <b-col xs="2" sm="1" md="1">
        <b-btn id="show-static-btn" variant="info" type="submit">
          Показать
        </b-btn>
      </b-col>
    </div>
    <b-row>
      <b-col xs="12" sm="12" md="12" class="table-row">
        <b-table bordered hover position-details-table :items="tableItems">
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
        </b-table>
      </b-col>
    </b-row>
    <!-- Область с диаграммами -->
    <div class="row chart-row">
      <div class="col-xs-6 col-sm-6 col-md-6 chart-area">
        <canvas id="fizPositionChart"></canvas>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 chart-area">
        <canvas id="jurPositionChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
// import DateTimePicker from '~/components/DateTimePicker.vue'
import DatePicker from 'vuejs-datepicker'
import { ru } from 'vuejs-datepicker/dist/locale'

export default {
  components: {
    DatePicker
    // DateTimePicker
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
        format: 'dd.MM.yyyy'
      },
      tableItems: [
        {
          name: 'Количество договоров (контрактов), шт.',
          fiz_long: '-',
          fiz_short: '-',
          jur_long: '-',
          jur_short: '-',
          total: '-'
        },
        {
          name:
            'Относительное изменение количества договоров (контрактов) по отношению к предыдущему дню, в %',
          fiz_long: '-',
          fiz_short: '-',
          jur_long: '-',
          jur_short: '-',
          total: '-'
        },
        {
          name: 'Количество лиц, имеющих открытые позиции',
          fiz_long: '-',
          fiz_short: '-',
          jur_long: '-',
          jur_short: '-',
          total: '-'
        },
        {
          name:
            'Изменение количества договоров (контрактов) по отношению к предыдущему дню, шт.',
          fiz_long: '-',
          fiz_short: '-',
          jur_long: '-',
          jur_short: '-',
          total: '-'
        }
      ]
    }
  }
}
</script>

<style>
thead > tr:nth-child(3) {
  display: none;
}
</style>
