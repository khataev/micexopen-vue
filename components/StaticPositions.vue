<template>
  <div>
    <!-- Таблица с информацией об открытых позициях -->
    <div class="row table-row">
      <b-col xs="7" sm="9" md="9" class="text-right text-header">
        Дата:
      </b-col>
      <b-col xs="3" sm="2" md="2">
        <input id="datepicker" type="text" class="form-control" />
      </b-col>
      <b-col xs="2" sm="1" md="1">
        <b-btn id="show-static-btn" variant="info" type="submit">
          Показать
        </b-btn>
      </b-col>
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
  </div>
</template>
