<template>
  <div>
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
            Здесь должен быть график курса доллара. К сожалению, сервис в данный
            момент недоступен, либо произошла ошибка и я работаю над ее
            устранением
          </h3>
        </div>
        <canvas id="currencyRatesChart" height="120"></canvas>
      </div>
    </div>
  </div>
</template>
