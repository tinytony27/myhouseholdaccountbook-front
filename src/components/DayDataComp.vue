<script setup lang="ts">
// @types/chart.jsの型付けを使用するためにimportしてます。
import type { ChartData, ChartOptions } from 'chart.js';

// それぞれの部品をインポートしていきます。
// まだ種類があると思いますが、とりあえず手当たり次第importしておきます。
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Filler,
  ArcElement
} from 'chart.js';

// 今回はRadar-chartを作成するので、import。
import { Doughnut } from 'vue-chartjs';

// ここでChartJSでこれらを使います〜と登録してあげます。
ChartJS.register(CategoryScale, LinearScale ,PointElement ,RadialLinearScale, ArcElement, Filler, Title, Tooltip, Legend);

// ここではchartに使うdataを登録していきます。
const data:ChartData<'doughnut'> = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 5
  }]
};

// ここではchartに使うoptionsを登録していきます。
const options:ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false
};
</script>

<template>
  <Doughnut :data="data" :options="options" class="w-80 h-80"/>
</template>

<style>
</style>