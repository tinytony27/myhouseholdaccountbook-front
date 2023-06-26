<script setup lang="ts">
import { TABLE_HEAD } from '@/common/const';
import { useStore } from 'vuex';

const store = useStore();

defineProps(['childNumber', 'dataSet']);
</script>

<template>
  <div class="">
    <table>
      <thead>
        <tr>
          <th v-for="head in TABLE_HEAD[childNumber]" :key="head">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dataList, i) in dataSet" :key="i">
          <td v-for="(data, j) in dataList" :key="j">{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>