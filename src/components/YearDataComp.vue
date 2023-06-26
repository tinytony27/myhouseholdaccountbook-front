<script setup lang="ts">
import { useStore } from 'vuex';
import { BAR_LABEL, BAR_BACKGROUND_COLOR, BAR_BORDER_COLOR } from '@/common/const';
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
  BarElement
} from 'chart.js';

// 今回はRadar-chartを作成するので、import。
import { Bar } from 'vue-chartjs';

const store = useStore();

// ここでChartJSでこれらを使います〜と登録してあげます。
ChartJS.register(CategoryScale, LinearScale ,PointElement ,RadialLinearScale, BarElement, Filler, Title, Tooltip, Legend);

// ここではchartに使うdataを登録していきます。
const data:ChartData<'bar'> = {
  labels: BAR_LABEL.slice(0, 12),
  datasets: [{
    // label: 'My First Dataset',
    data: store.getters.getTotalList,
    backgroundColor: BAR_BACKGROUND_COLOR.slice(0, 12),
    borderColor: BAR_BORDER_COLOR.slice(0, 12),
    borderWidth: 1
  }]
};

// ここではchartに使うoptionsを登録していきます。
const options:ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  }
};
</script>

<template>
  <div>aaaaaa</div>
  <div>
    <Bar :data="data" :options="options" class="h-80"/>
  </div>
</template>

<style>
</style>