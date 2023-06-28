<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';
import YearDataComp from '@/components/YearDataComp.vue';
import MonthDataComp from '@/components/MonthDataComp.vue';
import DayDataComp from '@/components/DayDataComp.vue';
// import TableComp from '@/components/TableComp.vue';
import { YEAR_DATA, MONTH_DATA, DAY_DATA } from '@/common/const';

const store = useStore();
const selectDataFlag = ref<number>(-1);
const checkYear = ref<number>(new Date().getFullYear());
const checkDate = new Date();
const selectedFilter = ref<number>(0);
const monthlyMatrixDataSet = ref({});
const monthlyGraphDataSet = ref([]);
const yearlyMatrixDataSet = ref({});
const yearlyGraphDataSet = ref([]);

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
      console.error(err);
    });
  // console.log('(END) Home Mounted.');
  
  const paramM = {
    month: dateFormat()
  };
  apiClient.post('/monthsbycategory/graph', paramM)
    .then( response => { return response.data; })
    .then( json => {
      monthlyGraphDataSet.value = json.details;
    })
    .catch((err) => {
      console.error(err);
    });
  apiClient.post('/monthsbycategory/matrix', paramM)
    .then( response => { return response.data; })
    .then( json => {
      monthlyMatrixDataSet.value = json;
    })
    .catch((err) => {
      console.error(err);
    });

  const paramY = {
    year: checkYear.value,
    filter: selectedFilter.value
  };
  apiClient.post('/yearsbyfilter/graph', paramY)
    .then( response => { return response.data; })
    .then( json => {
      yearlyGraphDataSet.value = json.details;
    })
    .catch((err) => {
      console.error(err);
    });
  apiClient.post('/yearsbyfilter/matrix', paramY)
    .then( response => { return response.data; })
    .then( json => {
      yearlyMatrixDataSet.value = json.details;
    })
    .catch((err) => {
      console.error(err);
    });
  
});

const setSelectDataFlag = (flag: number) => {
  selectDataFlag.value = flag;
  // console.log('change data');
};

const dateFormat = (): string => {
  const year = checkDate.getFullYear().toString();
  const month = (checkDate.getMonth() + 1).toString().padStart(2, '0');
  // console.log(year+'/'+month);
  return year+'-'+month;
};

const changeYear = (change: number) => {
  checkYear.value = checkYear.value + change;
  const nowDataFlag = selectDataFlag.value;
  selectDataFlag.value = -1;
  const param = {
    year: checkYear.value,
    filter: selectedFilter.value
  };
  apiClient.post('/yearsbyfilter/graph', param)
    .then( response => { return response.data; })
    .then( json => {
      yearlyGraphDataSet.value = json.details;
      selectDataFlag.value = nowDataFlag;
    })
    .catch((err) => {
      console.error(err);
    });
  apiClient.post('/yearsbyfilter/matrix', param)
    .then( response => { return response.data; })
    .then( json => {
      yearlyMatrixDataSet.value = json.details;
    })
    .catch((err) => {
      console.error(err);
    });
};

const changeFilter = () => {
  const nowDataFlag = selectDataFlag.value;
  selectDataFlag.value = -1;
  const param = {
    year: checkYear.value,
    filter: selectedFilter.value
  };
  apiClient.post('/yearsbyfilter/graph', param)
    .then( response => { return response.data; })
    .then( json => {
      yearlyGraphDataSet.value = json.details;
      selectDataFlag.value = nowDataFlag;
    })
    .catch((err) => {
      console.error(err);
    });
};

const changeMonth = (change: number) => {
  checkDate.setMonth(checkDate.getMonth() + change);
  const nowDataFlag = selectDataFlag.value;
  selectDataFlag.value = -1;
  const param = {
    month: dateFormat()
  };
  apiClient.post('/monthsbycategory/graph', param)
    .then( response => { return response.data; })
    .then( json => {
      monthlyGraphDataSet.value = json.details;
      selectDataFlag.value = nowDataFlag;
    })
    .catch((err) => {
      console.info(err);
    });
  apiClient.post('/monthsbycategory/matrix', param)
    .then( response => { return response.data; })
    .then( json => {
      monthlyMatrixDataSet.value = json;
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
      <div v-if="selectDataFlag === YEAR_DATA">
        <div class="relative">
          <div class="w-64 mx-auto border rounded bg-white">
            <button class="w-10" @click="changeYear(-1)">
              <span class="font-bold">&lt;</span>
            </button>
            <span class="px-14">{{checkYear}}年</span>
            <button class="w-10" @click="changeYear(1)">
              <span class="font-bold">&gt;</span>
            </button>
          </div>
          <form class="sm:absolute sm:top-0 sm:left-5 sm:my-0 mt-1">
            <label class="pr-2">フィルタ</label>
            <select class="w-20" @change="changeFilter" v-model="selectedFilter">
              <option :value="0">合計</option>
              <option v-for="elem in store.state.categoryList" :key="elem.categoryID" :value="elem.categoryID">{{ elem.categoryName }}</option>
            </select>
          </form>
        </div>
        <YearDataComp :matrixDataSet="yearlyMatrixDataSet" :graphDataSet="yearlyGraphDataSet" :selectedFilter="selectedFilter" />
      </div>

      <div v-if="selectDataFlag === MONTH_DATA">
        <div class="w-64 mx-auto border rounded bg-white">
          <button class="w-10" @click="changeMonth(-1)">
            <span class="font-bold">&lt;</span>
          </button>
          <span class="px-10">{{checkDate.getFullYear()}}年 {{checkDate.getMonth() + 1}}月</span>
          <button class="w-10" @click="changeMonth(1)">
            <span class="font-bold">&gt;</span>
          </button>
        </div>
        <MonthDataComp :matrixDataSet="monthlyMatrixDataSet" :graphDataSet="monthlyGraphDataSet" />
      </div>

      <!-- <DayDataComp v-if="selectDataFlag === DAY_DATA" /> -->
    </div>
  </div>
</template>
