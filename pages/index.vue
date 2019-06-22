<template>
  <div>
    <!--<b-row>
      <p>
        // TODO: Info messages for users
      </p>
    </b-row>-->
    <!-- Комбобокс с инструментами -->
    <b-row>
      <b-col xs="12" sm="12" md="12">
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
      </b-col>
    </b-row>

    <!-- Область для показа ошибки -->
    <div class="error-area">{{ errorText }}</div>

    <!-- Табы -->
    <b-tabs content-class="mt-3" class="tabs-area">
      <b-tab title="Открытые позиции на дату">
        <!-- :open-positions="openPositions" -->
        <StaticPositionsTab
          :feature="selectedFeature"
          :start-date="startDate"
          :show-button-enabled="!!selectedFeature"
          @error="onError"
        />
      </b-tab>

      <b-tab title="Динамика открытых позиций">
        <DynamicPositionsTab
          :feature="selectedFeature"
          :from-date="startDate"
          :to-date="startDate"
          :show-button-enabled="!!selectedFeature"
          @error="onError"
        />
      </b-tab>
    </b-tabs>
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
      openPositions: null
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
    } catch (error) {
      // TODO: show error
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
    onError(error) {
      this.errorText = error && error.message
    }
  }
}
</script>

<style>
/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  body {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 8px;
  }
  .text-header {
    margin-top: 7px;
    font-size: 10px;
    font-weight: bold;
  }
}

/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  body {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 10px;
  }
  .text-header {
    margin-top: 7px;
    font-size: 10px;
    font-weight: bold;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  body {
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 14px;
  }

  .text-header {
    margin-top: 7px;
    font-size: 16px;
    font-weight: bold;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  body {
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 14px;
  }

  .text-header {
    margin-top: 7px;
    font-size: 16px;
    font-weight: bold;
  }
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
  margin-top: 20px;
  width: 100%;
}

/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} 

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
} */
</style>
