<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
// import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const onEnterKeyUpDate = (index:  number) => {
  const priceElem = document.getElementById('price'+index) as HTMLInputElement;
  priceElem.focus();
};
const onEnterKeyUpPrice = (index:  number) => {
  if (index < store.state.inputList.length - 1) {
    const dateElem = document.getElementById('date'+(index+1)) as HTMLInputElement;
    dateElem.focus();
  }
};
</script>

<template>
  <div class="h-full bg-gray-50">
    <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <div v-for="(elem, index) in store.state.inputList" :key="index" class="w-full">
        <div class="bg-red-100 h-16 mb-1">
          <label>
            <span></span>
            <input type="text" placeholder=" MM / DD " :id="'date'+index" @keyup.enter="onEnterKeyUpDate(index)"/>
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
            <input type="number" placeholder="金額" :id="'price'+index" @keyup.enter="onEnterKeyUpPrice(index)" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
