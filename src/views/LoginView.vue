<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/common/http';
import router from '@/router';

const userID = ref<string>('');
const password = ref<string>('');
const loginErrorFlag = ref<boolean>(false);

const login = () => {
  const data = {
    userID: userID.value,
    password: password.value
  };
  // console.log(apiClient.post);
  apiClient.post('/login', data)
    .then( response => { return response.data; })
    .then( json => {
      // console.log(json);
      if(json.result === 'SUCCESS'){
        store.commit('setAuth', json.auth);
        router.push('/');
      }
      else{
        loginErrorFlag.value = true;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const store = useStore();
</script>

<template>
  <div class="relative h-screen w-full z-30 bg-green-100">
    <div class="absolute top-0 bottom-0 left-0 right-0 m-auto h-44 w-80 py-7 px-2 rounded border bg-gray-50">
      <div class="w-full">
        <label class="inline-block w-24 mr-4 font-semibold">ユーザID</label>
        <input type="text" v-model="userID" class="w-40 border px-1" />
      </div>
      <div class="w-full mt-4 mb-5">
        <label class="inline-block w-24 mr-4 font-semibold">パスワード</label>
        <input type="password" v-model="password" class="w-40 border px-1" />
      </div>
      <button class="h-8 w-48 border rounded font-semibold bg-blue-100" @click="login">ログイン</button>
      <div v-if="loginErrorFlag" class="text-sm text-red-400">ユーザIDまたはパスワードが違います</div>
    </div>
  </div>
</template>
