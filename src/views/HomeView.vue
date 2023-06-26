<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';
import YearDataComp from '@/components/YearDataComp.vue';
import MonthDataComp from '@/components/MonthDataComp.vue';
import DayDataComp from '@/components/DayDataComp.vue';
import TableComp from '@/components/TableComp.vue';
import { YEAR_DATA, MONTH_DATA, DAY_DATA } from '@/common/const';

const store = useStore();
const checkDate = new Date();
const selectDataFlag = ref<number>(-1);
const matrixDataSet = ref({});

onMounted(() => {
  setTimeout(() => setSelectDataFlag(MONTH_DATA), 100);
  // console.log('Home Mounted.');
  apiClient.get('/category')
    .then( response => { return response.data; })
    .then( json => {
      store.commit('setCategory', json.category);
      // console.log('set category.');
    })
    .catch((err) => {
      console.info(err);
    });
    // console.log('(END) Home Mounted.');
  apiClient.get('/getstatistics')
    .then( response => { return response.data; })
    .then( json => {
      store.dispatch('setStatisticsData', json.details);
    })
    .catch((err) => {
      console.info(err);
    });
  const param = {month: dateFormat()};
  apiClient.post('/monthsbycategory/graph', param)
    .then( response => { return response.data; })
    .then( json => {
      store.commit('setMonthData', json.details);
      // console.log('set MonthData.');
    })
    .catch((err) => {
      console.info(err);
    });
  apiClient.post('/monthsbycategory/matrix', param)
    .then( response => { return response.data; })
    .then( json => {
      matrixDataSet.value = json;
    })
    .catch((err) => {
      console.info(err);
    });
});

const dateFormat = (): string => {
  const year = checkDate.getFullYear().toString();
  const month = (checkDate.getMonth() + 1).toString().padStart(2, '0');
  // console.log(year+'/'+month);
  return year+'-'+month;
};

const setSelectDataFlag = (flag: number) => {
  selectDataFlag.value = flag;
  // console.log('change data');
};

const changeMonth = (change: number) => {
  checkDate.setMonth(checkDate.getMonth() + change);

  const nowDataFlag = selectDataFlag.value;
  selectDataFlag.value = -1;
  const param = {month: dateFormat()};
  apiClient.post('/monthsbycategory/graph', param)
    .then( response => { return response.data; })
    .then( json => {
      store.commit('setMonthData', json.details);
      selectDataFlag.value = nowDataFlag;
    })
    .catch((err) => {
      console.info(err);
    });
  apiClient.post('/monthsbycategory/matrix', param)
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json);
      matrixDataSet.value = json;
    })
    .catch((err) => {
      console.info(err);
    });
};
</script>

<template>
  <div class=" h-full bg-gray-50">
    <!-- <div v-for="(data, index) in store.state.statisticsData" :key="index">
      {{ data.month }} : {{ data.total }}
    </div> -->
    <!-- <div class="h-10 w-full leading-10 bg-blue-100">
      買い物
    </div> -->
    <!-- <div class="h-10 w-full bg-gray-100">
      <font-awesome-icon icon="fa-solid fa-filter" />
    </div> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div class="w-full">
      <div class="flex w-72 mx-auto my-2">
        <div class="w-24 rounded border" :class="(selectDataFlag === YEAR_DATA) ? 'bg-green-100' : 'bg-white'">
          <button class="w-full" @click="setSelectDataFlag(YEAR_DATA)">年別</button>
        </div>
        <div class="w-24 rounded border" :class="(selectDataFlag === MONTH_DATA) ? 'bg-green-100' : 'bg-white'">
          <button class="w-full" @click="setSelectDataFlag(MONTH_DATA)">月別</button>
        </div>
        <div class="w-24 rounded border" :class="(selectDataFlag === DAY_DATA) ? 'bg-green-100' : 'bg-white'">
          <button class="w-full" @click="setSelectDataFlag(DAY_DATA)">日別</button>
        </div>
      </div>
    </div>
    <div>
      <YearDataComp v-if="selectDataFlag === YEAR_DATA" />
      <div v-if="selectDataFlag === MONTH_DATA">
        <div class="w-64 mx-auto border rounded">
          <button class="w-10" @click="changeMonth(-1)">
            <span class="font-bold">&lt;</span>
          </button>
          <span class="px-10">{{checkDate.getFullYear()}}年 {{checkDate.getMonth() + 1}}月</span>
          <button class="w-10" @click="changeMonth(1)">
            <span class="font-bold">&gt;</span>
          </button>
        </div>
        <MonthDataComp :dataSet="matrixDataSet" />
      </div>
      <!-- <DayDataComp v-if="selectDataFlag === DAY_DATA" /> -->
    </div>
    <!-- <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <TableComp :childNumber="selectDataFlag" :dataSet="matrixDataSet" />
    </div> -->
  </div>
</template>
