<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';

onMounted(() => {
  apiClient.get('/getcategory')
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json);
      store.commit('setCategory', json.category);
    })
    .catch((err) => {
      console.info(err);
    });
  apiClient.get('/getstatistics')
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json.details);
      store.dispatch('setStatisticsData', json.details);
    })
    .catch((err) => {
      console.info(err);
    });
});

const store = useStore();
const editModalFlag = ref<boolean>(false);
const deleteModalFlag = ref<boolean>(false);
const processingFlag = ref<boolean>(false);
const processingTime = 300;
const itemInput = ref<string>('');
const editItemID = ref<number>(0);
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
    <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <table>
        <thead>
          <tr>
            <th>年/月</th>
            <th>合計</th>
            <th v-for="cate in store.state.categoryList" :key="cate.categoryID">{{ cate.categoryName }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in store.state.statisticsData" :key="data.month">
            <td>{{ data.month }}</td>
            <td>{{ data.total }}</td>
            <td v-for="cate in store.state.categoryList" :key="cate.categoryID">{{ data[cate.categoryName] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="absolute h-14 w-14 z-20 right-4 bottom-16" @click="openCreateModal">
      <font-awesome-icon icon="fa-solid fa-circle-plus" class="h-full w-full rounded-full bg-white" />
    </div> -->
  </div>
</template>
