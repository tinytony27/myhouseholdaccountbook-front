<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const editModalFlag = ref<boolean>(false);
const deleteModalFlag = ref<boolean>(false);
const processingFlag = ref<boolean>(false);
const processingTime = 300;
const itemInput = ref<string>('');
const editItemID = ref<number>(0);

// const inputs = ref([]);
// onMounted(() => {
//   for(let i = 0; i < store.state.inputList.length; i++){
//     const tmp = '' as never;
//     inputs.value.push(tmp);
//   }
// });
const test1 = ref();
const onEnterKeyUp = () => {
  console.log('pushed!');
  test1.value.focus();
  // console.log(inputs.value[0]);
  // if (index < inputs.value.length - 1) {
  //   inputs.value[index + 1].focus();
  // }
};
</script>

<template>
  <div class="h-full bg-gray-50">
    <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <input @keydown.enter="onEnterKeyUp()" autofocus />
      <input ref="test" @keydown.enter="onEnterKeyUp()" />
      <div v-for="(elem, index) in store.state.inputList" :key="index" class="w-full">
        <div class="bg-red-100 h-16 mb-1">
          <label>
            <span></span>
            <input type="text" placeholder=" MM / DD " ref="test1" @keyup.enter="onEnterKeyUp()"/>
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
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
