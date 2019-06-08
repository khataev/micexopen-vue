<template>
  <div>
    <!-- <b-row>
      <p>
        Необходимость в данном ресурсе у автора перестала существовать. Если
        среди посетителей есть те, кому он полезен или очень необходим - прошу
        написать в личку. Для поддержания работоспособности ресурса необходимо
        всего лишь 200р на хостинг в месяц. При отсутствии таковых сервис будет
        погашен 01.04.2019
      </p>
    </b-row> -->
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
// TODO: Yandex metrica
import StaticPositionsTab from '~/components/StaticPositions.vue'
import DynamicPositionsTab from '~/components/DynamicPositions.vue'

// import app from './../plugins/scripts'
import { Moex } from './../plugins/moex'

const moex = new Moex()

export default {
  components: {
    StaticPositionsTab,
    DynamicPositionsTab
  },
  data() {
    return {
      selectPlaceholder: ' Загрузка...',
      errorText: null,
      startDate: moex.getPreviousTradingDay(),
      // Feature items dropdown
      featuresListRaw: [],
      selectedFeature: null,
      openPositions: null
    }
  },
  watch: {
    selectedFeature: function(val) {
      console.log('SELECTED', this.selectedFeature)
    }
  },
  mounted() {
    // const date1 = moex.getPreviousTradingDay().toISOString()
    self = this // TODO: try avoid context hoisting with arrow function
    const onComplete = function(openPositions) {
      self.openPositions = openPositions

      for (const key in openPositions) {
        if (typeof openPositions[key] === 'function') continue

        // console.log(app.openPositions[key].toJSON());
        self.featuresListRaw.push({
          code: key,
          // text: openPositions[key].toJSON().name
          label: openPositions[key].name
        })
      }
      self.selectedFeature = self.featuresListRaw.filter(
        feature => feature.code === 'Si_F'
      )[0]
    }
    moex.loadMoexCsv(this.startDate.format('YYYYMMDD')).then(onComplete)
    // scripts.loadData(scripts.getPreviousTradingDay(), null)
  },
  methods: {
    onError: function(value) {
      this.errorText = value
    }
  }
}
</script>

<style>
/* TODO: scoped */
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
