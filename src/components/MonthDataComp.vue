<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { DOUGHNUT_BACKGROUND_COLOR, MONTH_DATA, TABLE_HEAD } from '@/common/const';
// import apiClient from '@/common/http';

const props = defineProps(['matrixDataSet', 'graphDataSet']);
const store = useStore();
// let totalData: number[] = [];

ChartJS.register(ArcElement, Tooltip, Legend);
const data:ChartData<'doughnut'> = {
  labels: store.getters.getCategoryNameList,
  datasets: [{
    data: props['graphDataSet'],
    backgroundColor: DOUGHNUT_BACKGROUND_COLOR,
    hoverOffset: 5
  }]
};
const options:ChartOptions<'doughnut'> = {
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
  <div class="relative my-1">
    <div class="w-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span class="w-12 font-bold text-lg">合計：</span>
      <span class="w-20 font-bold text-lg">{{ Number(matrixDataSet.total).toLocaleString() }}</span>
    </div>
    <div class="">
      <Doughnut :data="data" :options="options" class="w-72 h-72" />
    </div>
  </div>
  <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
    <div class="w-full">
      <table class="mx-auto">
        <thead class="">
          <tr>
            <th class="w-32 border">カテゴリ</th>
            <th class="w-32 border">金額</th>
            <th class="w-20 border">割合</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataList, i) in matrixDataSet.details" :key="i">
            <td class="border">{{ dataList.category }}</td>
            <td class="border">{{ Number(dataList.total).toLocaleString() }}円</td>
            <td class="border">{{ dataList.rate }}％</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>