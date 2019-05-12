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
        <select class="select-features-list" style="width: 100%"> </select>
      </b-col>
    </b-row>
    <!-- Табы -->
    <div class="error-area"></div>
    <b-tabs content-class="mt-3" class="tabs-area">
      <b-tab title="Открытые позиции на дату">
        <StaticPositionsTab />
      </b-tab>

      <b-tab title="Динамика открытых позиций">
        <DynamicPositionsTab />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import StaticPositionsTab from '~/components/StaticPositions.vue'
import DynamicPositionsTab from '~/components/DynamicPositions.vue'

export default {
  components: {
    StaticPositionsTab,
    DynamicPositionsTab
  }
}
</script>

<style>
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
