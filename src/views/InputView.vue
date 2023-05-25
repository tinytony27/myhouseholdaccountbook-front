<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const editModalFlag = ref<boolean>(false);
const deleteModalFlag = ref<boolean>(false);
const processingFlag = ref<boolean>(false);
const processingTime = 300;
const itemInput = ref<string>('');
const editItemID = ref<number>(0);
</script>

<template>
  <div class="h-full bg-gray-50">
    <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <div v-for="(elem, index) in store.state.inputList" :key="index" class="w-full">
        <div class="bg-red-100 h-16 mb-1">
          <!-- <label>
            <span></span>
            <input type="text" placeholder=" MM / DD "/>
          </label>
          <label>
            <select name="pets" id="pet-select">
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
            </select>
          </label>
          <label>
            <span></span>
            <input type="number" placeholder="金額"/>
          </label> -->
        </div>
      </div>
    </div>
  </div>
</template>
