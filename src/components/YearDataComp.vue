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

const props = defineProps(['matrixDataSet', 'graphDataSet', 'selectedFilter']);
const store = useStore();

// ここでChartJSでこれらを使います〜と登録してあげます。
ChartJS.register(CategoryScale, LinearScale ,PointElement ,RadialLinearScale, BarElement, Filler, Title, Tooltip, Legend);

// ここではchartに使うdataを登録していきます。
const data:ChartData<'bar'> = {
  labels: BAR_LABEL.slice(0, 12),
  datasets: [{
    // label: 'My First Dataset',
    data: props['graphDataSet'],
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
  <div class="m-1">
    <div class="">
      <Bar :data="data" :options="options" class="h-80"/>
    </div>
  </div>
  <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
    <div class="w-full">
      <table class="mx-auto">
        <thead>
          <tr>
            <th class="w-24 border">年/月</th>
            <th class="w-28 border">合計</th>
            <th class="w-28 border" :class="(selectedFilter === cate.categoryID) ? 'bg-red-100' : ''" v-for="cate in store.state.categoryList" :key="cate.categoryID">{{ cate.categoryName }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in matrixDataSet" :key="data.month">
            <td class="border">{{ data.month }}</td>
            <td class="border">{{ Number(data.total).toLocaleString() }}円</td>
            <td class="border" :class="(selectedFilter === cate.categoryID) ? 'bg-red-100' : ''" v-for="cate in store.state.categoryList" :key="cate.categoryID">{{ Number(data[cate.categoryName]).toLocaleString() }}円</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>