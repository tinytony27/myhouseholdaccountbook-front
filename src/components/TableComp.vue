<script setup lang="ts">
import { TABLE_HEAD } from '@/common/const';
import { useStore } from 'vuex';

const store = useStore();

defineProps(['childNumber', 'dataSet']);
</script>

<template>
  <div class="overflow-y-scroll">
    <table class="h-full w-full bg-white">
      <thead class="">
        <tr class="">
          <th class="border border-black bg-blue-200" :class="head[1]" v-for="(head, i) in TABLE_HEAD[childNumber]" :key="'head'+i">{{ head[0] }}</th>
        </tr>
      </thead>
      <tbody class="">
        <tr class="" v-for="(data, i) in dataSet" :key="i">
          <td class="border border-black" v-for="(dataIndex, j) in TABLE_HEAD[childNumber]" :key="j">{{ data[dataIndex[2]] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>