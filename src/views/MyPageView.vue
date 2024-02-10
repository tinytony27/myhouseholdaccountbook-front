<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';
import router from '@/router';

const store = useStore();

const oldPassword = ref<string>('');
const newPassword = ref<string>('');
const newPassword2 = ref<string>('');
const updateFlag = ref<boolean>(false);

const savePassword = () => {
  const data = {
    userID: store.state.auth.userID,
    oldPassword: oldPassword.value,
    newPassword: newPassword.value
  };
  // console.log(apiClient.post);
  apiClient.post('/updatePassword', data)
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json);
      oldPassword.value = '';
      newPassword.value = '';
      newPassword2.value = '';
      updateFlag.value = false;
      if(json.result === 'SUCCESS'){
        // 
      }
      else{
        const oldPasswordElem = document.getElementById('oldPassword') as HTMLInputElement;
        if(oldPasswordElem === null) return;
        oldPasswordElem.focus();
        oldPasswordElem.setCustomValidity("旧パスワードに誤りがあります.");
        oldPasswordElem.reportValidity();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const onNewPassword = () => {
  const newPasswordElem = document.getElementById('newPassword') as HTMLInputElement;
  const newPassword2Elem = document.getElementById('newPassword2') as HTMLInputElement;
  if(newPasswordElem === null || newPassword2Elem === null) return;
  updateFlag.value = (newPasswordElem.value === newPassword2Elem.value);
  newPassword2Elem.setCustomValidity('');
  newPassword2Elem.reportValidity();
};
const onEnterNewPassword = () => {
  const newPasswordElem = document.getElementById('newPassword') as HTMLInputElement;
  const newPassword2Elem = document.getElementById('newPassword2') as HTMLInputElement;
  if((newPasswordElem === null || newPassword2Elem === null) || newPassword2.value === '') return;
  if(newPasswordElem.value !== newPassword2Elem.value){
    newPassword2.value = '';
    newPassword2Elem.setCustomValidity("新規パスワードが一致しません.");
    newPassword2Elem.reportValidity();
    updateFlag.value = false;
    return;
  }
  newPassword2Elem.setCustomValidity('');
  newPassword2Elem.reportValidity();
  updateFlag.value = true;
};
const focusOutNewPassword = () => {
  const newPasswordElem = document.getElementById('newPassword') as HTMLInputElement;
  const newPassword2Elem = document.getElementById('newPassword2') as HTMLInputElement;
  console.log(newPassword2.value);
  if((newPasswordElem === null || newPassword2Elem === null) || newPassword2.value === '') return;
  if(newPasswordElem.value !== newPassword2Elem.value){
    newPassword2.value = '';
    newPassword2Elem.setCustomValidity("新規パスワードが一致しません.");
    newPassword2Elem.reportValidity();
    updateFlag.value = false;
    return;
  }
  newPassword2Elem.setCustomValidity('');
  newPassword2Elem.reportValidity();
}

const logout = () => {
  store.commit('clearAuth');
  router.push('/');
};

</script>

<template>
  <div class="px-10 bg-gray-50">
    <!-- ページタイトル -->
    <div class="w-full py-10">
      <span class="font-bold text-4xl">ユーザ情報</span>
    </div>
    <!-- ユーザ情報 -->
    <div class="px-72 grid grid-cols-3">
      <div class="">
        <div class="py-2 border">ユーザ名</div>
        <div class="py-2 border">ユーザID</div>
        <div class="py-4 h-60 border">パスワード変更</div>
      </div>
      <div class="col-span-2">
        <div class="py-2 border">{{ store.state.auth.userName }}</div>
        <div class="py-2 border">{{ store.state.auth.userID }}</div>
        <div class="py-4 h-60 border">
          <div class="mb-5">
            <input
              class="w-56 px-1 border"
              id="oldPassword"
              type="text"
              v-model="oldPassword"
              placeholder="旧パスワード"
            />
          </div>
          <div class="mb-5">
            <input
              class="w-56 px-1 border"
              id="newPassword"
              type="password"
              v-model="newPassword"
              placeholder="新規パスワード"
            />
          </div>
          <div class="mb-5">
            <input
              class="w-56 px-1 border"
              id="newPassword2"
              type="password"
              v-model="newPassword2"
              @keyup="onNewPassword"
              @keyup.enter="onEnterNewPassword"
              @blur="focusOutNewPassword"
              placeholder="新規パスワード（確認）"
            />
          </div>
          <div class="">
            <button
              class="w-32 border rounded"
              :class="updateFlag ? 'bg-green-200' : 'bg-gray-200'"
              @click="savePassword"
              :disabled="!updateFlag"
            >
              変更
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ログアウト -->
    <div class="py-10">
      <button class="w-40 border rounded bg-blue-200" @click="logout">ログアウト</button>
    </div>
  </div>
</template>
