<template>
  <div>
    <b-row class="top-row" v-if="showUserMessage">
      <b-col>
        <p class="text-center">
          <b-alert variant="success" show>
            🎉🎉🎉 Произошло долгожданное обновление сайта (немного подробностей
            <b-link v-b-modal.instructionsModal>тут</b-link>)&nbsp;🎉🎉🎉
          </b-alert>
        </p>
      </b-col>
    </b-row>
    <!-- Комбобокс с инструментами -->
    <b-row>
      <v-select
        v-model="selectedFeature"
        class="select-features-list"
        :options="featuresListRaw"
        :clearable="true"
        :searchable="true"
        :filterable="true"
        :close-on-select="true"
        :placeholder="selectPlaceholder"
      />
    </b-row>

    <!-- Область для показа ошибки -->
    <b-row class="error-area">{{ errorText }}</b-row>

    <!-- Табы -->
    <b-row>
      <b-col>
        <b-tabs class="tabs-area">
          <b-tab title="Открытые позиции на дату">
            <!-- :open-positions="openPositions" -->
            <StaticPositionsTab
              :feature="selectedFeature"
              :start-date="startDate"
              :show-button-enabled="!!selectedFeature"
              @error="onError"
              @clearError="onClearError"
            />
          </b-tab>

          <b-tab title="Динамика открытых позиций">
            <DynamicPositionsTab
              :feature="selectedFeature"
              :from-date="startDate"
              :to-date="startDate"
              :show-button-enabled="!!selectedFeature"
              @error="onError"
              @clearError="onClearError"
            />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import StaticPositionsTab from '~/components/StaticPositions.vue'
import DynamicPositionsTab from '~/components/DynamicPositions.vue'

const moment = require('moment')

// import app from './../plugins/scripts'
import { Moex } from './../plugins/moex'

const moex = new Moex()

// TODO: Yandex metrica - check
const scriptString =
  '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};' +
  'm[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})' +
  "(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');" +
  "ym(40656204, 'init', {" +
  'clickmap:true,' +
  'trackLinks:true,' +
  'accurateTrackBounce:true,' +
  'webvisor:true' +
  '});'

export default {
  head: {
    script: [{ innerHTML: scriptString, type: 'text/javascript' }],
    __dangerouslyDisableSanitizers: ['script']
  },
  components: {
    StaticPositionsTab,
    DynamicPositionsTab
  },
  data() {
    return {
      selectPlaceholder: ' Загрузка...',
      errorText: null,
      // Feature items dropdown
      featuresListRaw: [],
      selectedFeature: null,
      openPositions: null,
      showUserMessage: moment().isSameOrBefore('2019-06-30')
    }
  },
  async asyncData(context) {
    // TODO: move Today to store
    const today = moment()
    let holidays

    try {
      holidays = await context.$axios.$get('/api/holidays', {
        params: {
          year: today.year()
        }
      })
      console.log('holidays', holidays)
    } catch (error) {
      console.log('error fetching holidays', error)
      holidays = []
    }

    return {
      previousTradingDayString: moex.getPreviousTradingDayString(
        today,
        holidays
      )
    }
  },
  computed: {
    startDate() {
      return moment(this.previousTradingDayString)
    }
  },
  mounted() {
    moex
      .loadMoexCsv(this.startDate.format(moex.defaultDateFormat))
      .then(this.onMoexComplete)
      .catch(this.onError)
  },
  methods: {
    onMoexComplete(openPositions) {
      this.openPositions = openPositions

      for (const key in openPositions) {
        if (typeof openPositions[key] === 'function') continue

        this.featuresListRaw.push({
          code: key,
          label: openPositions[key].name
        })
      }
      this.selectedFeature = this.featuresListRaw.filter(
        feature => feature.code === process.env.INITIAL_FEATURE_CODE
      )[0]
    },
    onError(_error) {
      // this.errorText = error && error.message
      this.errorText =
        'Произошла ошибка доступа к одному из сервисов, попробуйте еще раз'
    },
    onClearError() {
      this.errorText = ''
    }
  }
}
</script>

<style scoped>
.top-row {
  margin-top: 10px;
  margin-bottom: -20px;
}
.tabs-area {
  margin-top: 20px;
}

.error-area {
  color: red;
}

.table-row {
  margin-top: 20px;
}

.select-features-list {
  width: 97%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
}
</style>
