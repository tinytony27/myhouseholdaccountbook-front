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
  <div class=" h-full bg-gray-50">
    <!-- <div class="h-10 w-full leading-10 bg-blue-100">
      買い物
    </div> -->
    <!-- <div class="h-10 w-full bg-gray-100">
      <font-awesome-icon icon="fa-solid fa-filter" />
    </div> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div class="relative h-full w-full pt-1 pb-28 overflow-y-scroll">
      <!-- <div v-if="store.getters.getItemNum === 0" class="">メモなし</div> -->
      <!-- <div v-if="deleteModalFlag" class="fixed top-0 left-0 flex items-center justify-center h-full w-full z-30 bg-modal">
        <div class="relative h-24 w-72 border-2 rounded-xl border-gray-400 overflow-hidden bg-gray-50">
          <div class="w-full text-center my-4 font-bold">
            {{ itemInput }}を削除しますか？
          </div>
          <div class="absolute h-10 w-full bottom-0 flex bg-white">
            <div class="w-1/2 leading-10 border-t border-r border-gray-400" @click="closeModal">
              キャンセル
            </div>
            <div class="w-1/2 leading-10 border-t border-l border-gray-400" @click="deleteItem">
              削除
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="editModalFlag" class="fixed top-0 left-0 flex items-center justify-center h-full w-full z-30 bg-modal">
        <div class="relative h-36 w-72 border-2 rounded-xl border-gray-400 overflow-hidden bg-gray-50">
          <!-- <div class="absolute top-2 right-2 h-6 w-6" >
            <font-awesome-icon icon="fa-regular fa-circle-xmark" class="h-full w-full" />
          </div> -->
          <div class="w-full text-center my-4 font-bold">
            <span v-if="editItemID < 0">リストに追加</span>
            <span v-else>アイテムを編集</span>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-48">
              <input type="text" class="w-full px-1 rounded border border-black" v-model="itemInput"/>
            </div>
          </div>
          <!-- <div class="absolute h-10 w-full bottom-0 flex bg-white">
            <div class="w-1/2 leading-10 border-t border-r border-gray-400" @click="closeModal">
              キャンセル
            </div>
            <div class="w-1/2 leading-10 border-t border-l border-gray-400">
              <span class="w-full h-full" v-if="editItemID === 0" @click="createItem">
                追加
              </span>
              <span class="w-full h-full" v-else @click="updateItem">
                更新
              </span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="absolute h-14 w-14 z-20 right-4 bottom-16" @click="openCreateModal">
      <font-awesome-icon icon="fa-solid fa-circle-plus" class="h-full w-full rounded-full bg-white" />
    </div> -->
  </div>
</template>
