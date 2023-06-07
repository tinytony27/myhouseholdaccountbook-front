<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';

const store = useStore();
const saveFlag = ref<boolean>(false);

onMounted(() => {
  apiClient.get('/category')
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json);
      store.dispatch('setCategory', json.category);
    })
    .catch((err) => {
      console.info(err);
    });
});

const addElem = (index: number) => {
  if(index === (store.state.inputList.length - 1)){
    if(!saveFlag.value){
      saveFlag.value = true;
    }
    store.commit('add');
  }
};
const onEnterDate = (index: number) => {
  const priceElem = document.getElementById('price'+index) as HTMLInputElement;
  priceElem.focus();
};
const onEnterPrice = (index: number) => {
  if (index < store.state.inputList.length - 1) {
    const dateElem = document.getElementById('date'+(index+1)) as HTMLInputElement;
    dateElem.focus();
  }
};

const focusOutDate = (index: number) => {
  console.log('blur date');
  const dateElem = document.getElementById('date'+index) as HTMLInputElement;
  const dateData = new Date(dateElem.value);
  const nowDate = new Date();
  // console.log(dateData);
  if(!Number.isNaN(dateData.getTime())){
    // let year = dateData.getFullYear().toString().padStart(4, '0');
    var count = ( dateElem.value.match( /\//g ) || [] ).length ;
    let year = ((count === 1) ? nowDate.getFullYear() : dateData.getFullYear()).toString().padStart(4, '0');
    const month = (dateData.getMonth() + 1).toString().padStart(2, '0');
    const day = dateData.getDate().toString().padStart(2, '0');
    dateElem.value = year + '/' + month + '/' + day;
  }
  else if(dateData.getTime() > nowDate.getTime()){
    console.log('future');
  }
  else{
    console.log('error');
    dateElem.value = '';
    dateElem.focus();
  }
};

const focusOutPrice = (index: number) => {
  console.log('blur');
};

const saveDetails = () => {
  if(!saveFlag.value) return;
  console.log('save');
};
</script>

<template>
  <div class="h-full bg-gray-50">
    <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <div v-for="(elem, index) in store.state.inputList" :key="index" class="w-full flex justify-center">
        <div class="h-20 mb-1 w-80 border bg-white">
          <div class="mt-2 mb-2">
            <label class="mr-10">
              <!-- <span></span> -->
              <input class="w-28 px-2 border" type="text" placeholder="MM / DD" :id="'date'+index" @keyup.enter="onEnterDate(index)" @blur="focusOutDate(index)" />
            </label>
            <label class="">
              <!-- <span></span> -->
              <input class="w-28 border" type="number" placeholder=" 金額 " :id="'price'+index" @keyup.enter="onEnterPrice(index)" @change="addElem(index)" @blur="focusOutPrice(index)" />
            </label>
          </div>
          <div>
            <label class="mr-5">
              <select class="w-20 border" name="pets" id="pet-select">
                <option v-for="elem in store.state.categoryList" :key="elem.categoryID" :value="elem.categoryID">{{ elem.categoryName }}</option>
              </select>
            </label>
            <label>
              <!-- <span></span> -->
              <input class="w-40 border" type="text" placeholder=" メモ(任意) "/>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-14 w-full h-10 rounded border-gray-300 border" :class="saveFlag ? 'bg-green-100' : 'bg-gray-100'" @click="saveDetails">
      <span class="w-full h-full leading-10">保存</span>
    </div>
  </div>
</template>
