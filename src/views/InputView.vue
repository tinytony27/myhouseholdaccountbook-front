<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import TableComponent from '@/components/TableComp.vue';
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';
import { MONTH_TABLE_INPUT } from '@/common/const';
import router from '@/router';

const store = useStore();
const saveFlag = ref<boolean>(false);
const targetBeforeYear = ref<number>(0);
const targetBeforeMonth = ref<number>(0);
const targetYear = ref<number>(0);
const targetMonth = ref<number>(0);
const targetAfterYear = ref<number>(0);
const targetAfterMonth = ref<number>(0);
const detailsDataSet = ref<detailsDataSetType[]>([]);

onBeforeMount(() => {
  const nowDate = new Date();
  targetYear.value = nowDate.getFullYear();
  targetMonth.value = nowDate.getMonth() + 1;
  setYearMonth();
  console.log(apiClient.getUri());
  apiClient.get('/category')
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json);
      store.commit('setCategory', json.category);
      store.commit('initInputList');
    })
    .catch((err) => {
      console.error(err);
    });
  getMonthlyDetailData();
});

const getMonthlyDetailData = () => {
  const paramM = {
    month: targetYear.value + '-' + String(targetMonth.value).padStart(2, '0')
    // month: '2023-07'
  };
  apiClient.post('/monthlydetails', paramM)
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json['details']);
      detailsDataSet.value = json['details'];
      // console.log(detailsDataSet.value);
    })
    .catch((err) => {
      console.error(err);
    });
};

const setYearMonth = () => {
  const beforeDate = new Date(targetYear.value, targetMonth.value - 2, 1);
  targetBeforeYear.value = beforeDate.getFullYear();
  targetBeforeMonth.value = beforeDate.getMonth() + 1;
  const nowDate = new Date();
  const afterDate = new Date(targetYear.value, targetMonth.value, 1);
  if(nowDate.getTime() > afterDate.getTime()){
    targetAfterYear.value = afterDate.getFullYear();
    targetAfterMonth.value = afterDate.getMonth() + 1;
  }
  else{
    targetAfterYear.value = 0;
    targetAfterMonth.value = 0;
  }
};

const beforeMonth = () => {
  console.log('before');
  targetYear.value = targetBeforeYear.value;
  targetMonth.value = targetBeforeMonth.value;
  setYearMonth();
  getMonthlyDetailData();
};

const afterMonth = () => {
  targetYear.value = targetAfterYear.value;
  targetMonth.value = targetAfterMonth.value;
  setYearMonth();
  getMonthlyDetailData();
};

const onEnterDate = () => {
  const priceElem = document.getElementById('price') as HTMLInputElement;
  priceElem.focus();
};
const onEnterPrice = () => {
  const memoElem = document.getElementById('memo') as HTMLInputElement;
  memoElem.focus();
};

const focusOutDate = () => {
  const dateElem = document.getElementById('date') as HTMLInputElement;
  if(dateElem === null) return;
  const dayData = dateElem.value.padStart(2, '0');
  const tmpDateData = targetYear.value + '/' + String(targetMonth.value).padStart(2, '0') + '/' + dayData;
  const dateData = new Date(tmpDateData);
  const nowDate = new Date();
  const oldDate = new Date('2020-01-01');
  if(!Number.isNaN(dateData.getTime()) && dateData.getTime() > oldDate.getTime()){
    if(dateData.getTime() > nowDate.getTime()){
      dateElem.focus();
      dateElem.value = '';
      dateElem.setCustomValidity("未来の日付は入力できません.");
      dateElem.reportValidity();
      return;
    }
    dateElem.setCustomValidity('');
    const inputData: detailInputType = store.state.inputModel;
    inputData.detailDate = tmpDateData; // TODO store内で登録するように修正必要
    inputData.detailDay = dayData;
    dateElem.value = dayData;
  }
  else{
    dateElem.focus();
    dateElem.setCustomValidity("無効な日付です.");
    dateElem.reportValidity();
    dateElem.value = '';
  }
};

// const focusOutPrice = (index: number) => {
//   console.log('blur');
// };

const saveDetail = () => {
  console.log(store.state.inputModel);
  // if(!saveFlag.value) return;
  const data: detailsType = {
    detailsID: store.state.inputModel.detailsID,
    categoryID: store.state.inputModel.categoryID,
    detailDate: store.state.inputModel.detailDate,
    price: store.state.inputModel.price,
    memo: store.state.inputModel.memo,
    createdUserID: store.state.inputModel.createdUserID
  };
  apiClient.post('/setdetail', data)
    .then( response => {
      console.info(response);
      // router.push('/');
      getMonthlyDetailData();
      store.commit('initInputList');
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<template>
  <div class="px-10 bg-gray-50">
    <!-- <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <div v-for="(elem, index) in store.state.inputList" :key="index" class="w-full flex justify-center">
        <div class="h-20 mb-1 w-80 border bg-white">
          <div class="mt-2 mb-2">
            <label class="mr-10">
              <input
                class="w-28 px-1 border"
                v-model="elem.detailDate"
                type="text"
                placeholder="MM / DD"
                :id="'date'+index"
                @keyup.enter="onEnterDate(index)"
                @blur="focusOutDate(index)"
                autocomplete="off"
              />
            </label>
            <label class="">
              <input
                class="w-28 px-1 border"
                v-model="elem.price"
                type="number"
                placeholder="金額"
                :id="'price'+index"
                @keyup.enter="onEnterPrice(index)"
                @change="addElem(index)"
              />
            </label>
          </div>
          <div>
            <label class="mr-5">
              <select class="w-20 border" v-model="elem.categoryID" name="pets" id="pet-select">
                <option v-for="elem in store.state.categoryList" :key="elem.categoryID" :value="elem.categoryID">{{ elem.categoryName }}</option>
              </select>
            </label>
            <label>
              <input
                class="w-40 px-1 border"
                type="text"
                placeholder="メモ(任意)"
                autocomplete="off"
              />
            </label>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="absolute bottom-14 w-full h-10 rounded border-gray-300 border" :class="saveFlag ? 'bg-green-100' : 'bg-gray-100'" @click="saveDetails">
      <span class="w-full h-full leading-10">保存</span>
    </div> -->
    
    <!-- ヘッダ 月選択 -->
    <div class="py-10 grid grid-cols-4">
      <button class="text-lg" @click="beforeMonth">
        <span class="px-2">＜</span>
        <span>{{ targetBeforeYear }}年</span>
        <span>{{ targetBeforeMonth }}月</span>
      </button>
      <div class="col-span-2 font-bold text-4xl">
        <span class="">{{ targetYear }}年</span>
        <span>{{ targetMonth }}月</span>
      </div>
      <button class="text-lg" @click="afterMonth" :disabled="targetAfterYear === 0">
        <span v-if="targetAfterYear > 0">{{ targetAfterYear }}年</span>
        <span v-if="targetAfterYear > 0">{{ targetAfterMonth }}月</span>
        <span v-if="targetAfterYear > 0" class="px-2">＞</span>
      </button>
    </div>
    
    <!-- ボディ -->
    <div class="grid grid-cols-5">
      <!-- 左側 入力欄 -->
      <div class="col-span-2" v-if="store.state.inputModel !== null">
        <!-- 入力項目 -->
        <div class="h-80 px-10 pt-20">
          <div class="grid grid-cols-3 py-3">
            <label class="">
              日付：
            </label>
            <div>
              <div class="float-left">
                <span>{{ targetYear }}/</span>
                <span>{{ String(targetMonth).padStart(2, '0') }}/</span>
              </div>
              <input
                class="float-left w-10 px-1 col-span-2 border"
                v-model="store.state.inputModel.detailDay"
                type="text"
                placeholder="DD"
                id="date"
                @keyup.enter="onEnterDate"
                @blur="focusOutDate"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 py-3">
            <label class="">
              費目：
            </label>
            <select class="w-28 col-span-2 border" v-model="store.state.inputModel.categoryID" id="category">
              <option v-for="elem in store.state.categoryList" :key="elem.categoryID" :value="elem.categoryID">{{ elem.categoryName }}</option>
            </select>
          </div>
          <div class="grid grid-cols-3 py-3">
            <label class="">
              金額：
            </label>
            <input
              class="w-28 px-1 col-span-2 border"
              v-model="store.state.inputModel.price"
              type="number"
              placeholder="金額"
              id="price"
              @keyup.enter="onEnterPrice"
            />
          </div>
          <div class="grid grid-cols-3 py-3">
            <label class="">
              メモ：
            </label>
            <input
              class="w-full px-1 col-span-2 border"
              v-model="store.state.inputModel.memo"
              type="text"
              placeholder="メモ(任意)"
              id="memo"
              @keyup.enter="saveDetail"
              autocomplete="off"
            />
          </div>
        </div>
        <!-- 保存ボタン -->
        <div class="w-full">
          <button class="h-8 w-52 rounded-md font-bold bg-green-200" @click="saveDetail">
            記録する
          </button>
        </div>
      </div>

      <!-- 右側 月の記録済み出費一覧 -->
      <div class="col-span-3">
        <!-- <TableComponent
          :child-number="MONTH_TABLE_INPUT"
          :data-set="[['2023/12/12',1,1],[2,2,2],[1,1,1],[2,2,2],[1,1,1],[2,2,2],[1,1,1],[2,2,2],[1,1,1],[2,2,2],[1,1,1],[2,2,2],[1,1,1],[3,3,3,3]]"
        /> -->
        <div class="p-5">
          <span class="text-lg">記録済み一覧</span>
        </div>
        <TableComponent
          :child-number="MONTH_TABLE_INPUT"
          :data-set="detailsDataSet"
        />
      </div>
    </div>
  </div>
</template>
