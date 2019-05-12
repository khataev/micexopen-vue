<template>
  <section class="container">
    <b-row>
      <p>
        Необходимость в данном ресурсе у автора перестала существовать. Если
        среди посетителей есть те, кому он полезен или очень необходим - прошу
        написать в личку. Для поддержания работоспособности ресурса необходимо
        всего лишь 200р на хостинг в месяц. При отсутствии таковых сервис будет
        погашен 01.04.2019
      </p>
    </b-row>
    <!-- Комбобокс с инструментами -->
    <b-row>
      <div class="col-xs-12 col-sm-12 col-md-12">
        <select class="select-features-list" style="width: 100%"> </select>
      </div>
    </b-row>
    <!-- Табы -->
    <div class="row tabs-area">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#static">Открытые позиции на дату</a>
        </li>
        <li>
          <a
            data-toggle="tab"
            href="#dynamic"
            onclick="yaCounter40656204.reachGoal('dynamics-tab'); return true;"
            >Динамика открытых позиций</a
          >
        </li>
      </ul>
    </div>
    <b-row class="tab-content">
      <div class="error-area"></div>
      <b-row id="static" class="tab-pane fade in active">
        <!-- Таблица с информацией об открытых позициях -->
        <div class="row table-row">
          <div class="col-xs-7 col-sm-9 col-md-9 text-right text-header">
            Дата:
          </div>
          <div class="col-xs-3 col-sm-2 col-md-2">
            <input id="datepicker" type="text" class="form-control" />
          </div>
          <div class="col-xs-1 col-sm-1 col-md-1">
            <button id="show-static-btn" class="btn btn-info" type="submit">
              Показать
            </button>
          </div>
        </div>
        <b-row>
          <div class="col-xs-12 col-sm-12 col-md-12 table-row">
            <b-table bordered hover position-details-table>
              <thead>
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
              </thead>
              <tr>
                <th scope="row">Количество договоров (контрактов), шт.</th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <th scope="row">
                  Относительное изменение количества договоров (контрактов) по
                  отношению к предыдущему дню, в %
                </th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <th scope="row">Количество лиц, имеющих открытые позиции</th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <th scope="row">
                  Изменение количества договоров (контрактов) по отношению к
                  предыдущему дню, шт.
                </th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </b-table>
          </div>
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
      </b-row>
      <div id="dynamic" class="tab-pane fade">
        <div class="row table-row">
          <div class="col-xs-6 col-sm-6 col-md-6 text-right text-header">
            Интервал c:
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2">
            <input id="datepickerFrom" type="text" class="form-control" />
          </div>
          <div class="col-xs-1 col-sm-1 col-md-1 text-center text-header">
            по:
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2">
            <input id="datepickerTo" type="text" class="form-control" />
          </div>
          <div class="col-xs-1 col-sm-1 col-md-1">
            <button
              id="show-dynamics-btn"
              class="btn btn-info"
              type="submit"
              onclick="yaCounter40656204.reachGoal('show-dynamics-btn'); return true;"
            >
              Показать
            </button>
          </div>
        </div>
        <!-- Область с диаграммами -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 chart-area">
            <canvas id="openPositionsDynamicsChart" height="120"></canvas>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 chart-area">
            <canvas id="openPositionsDynamicsChart2" height="120"></canvas>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 chart-area">
            <div class="rates-error-border">
              <h3 class="rates-error text-center">
                Здесь должен быть график курса доллара. К сожалению, сервис в
                данный момент недоступен, либо произошла ошибка и я работаю над
                ее устранением
              </h3>
            </div>
            <canvas id="currencyRatesChart" height="120"></canvas>
          </div>
        </div>
      </div>
    </b-row>
  </section>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
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
