<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';
import router from '@/router';

const userID = ref<string>('');
const password = ref<string>('');
const loginErrorFlag = ref<boolean>(false);

const login = () => {
  // console.log(userID);
  // console.log(password);
  const data = {
    userID: userID.value,
    password: password.value
  };
  apiClient.post('/login', data)
    .then( response => {
      // console.log(response);
      if(response.data.result === 'SUCCESS'){
        store.commit('setAuth', response.data.auth);
        router.push('/');
      }
      else{
        console.log('fail');
        loginErrorFlag.value = true;
      }
    })
    .catch((err) => {
      console.info(err);
    });
};

const store = useStore();
</script>

<template>
  <div class="relative h-screen w-full z-30 bg-white">
    <div class="absolute top-0 bottom-0 left-0 right-0 m-auto h-44 w-96 p-7 rounded border bg-gray-50">
      <div class="w-full">
        <label class="inline-block w-24 mr-8 font-semibold">ユーザID</label>
        <input type="text" v-model="userID" class="border px-1" />
      </div>
      <div class="w-full mt-4 mb-5">
        <label class="inline-block w-24 mr-8 font-semibold">パスワード</label>
        <input type="password" v-model="password" class="border px-1" />
      </div>
      <button class="h-8 w-48 border rounded font-semibold bg-blue-100" @click="login">ログイン</button>
      <div v-if="loginErrorFlag" class="text-sm text-red-400">ユーザIDまたはパスワードが違います</div>
    </div>
  </div>
</template>
