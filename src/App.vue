<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
</script>

<template>
  <!-- <header class="fixed flex left-0 top-0 h-14 w-full z-20 text-center leading-8 bg-blue-200">
    <router-link to="/" class="mr-2">
      <div>
        <div>
          <font-awesome-icon icon="fa-solid fa-house" />
        </div>
        <div>ホーム</div>
      </div>
    </router-link>
    <router-link to="/input">
      <div>
        <div>
          <font-awesome-icon icon="fa-solid fa-receipt" />
        </div>
        <div>入力</div>
      </div>
    </router-link>
    <router-link to="/input">
      <div>
        <div>
          <font-awesome-icon icon="fa-solid fa-receipt" />
        </div>
        <div>記録</div>
      </div>
    </router-link>
  </header> -->
  <div class="fixed h-full w-full grid grid-cols-6">
    <!-- サイドメニュー -->
    <nav class="p-10 bg-blue-100">
      <div class="p-1 pb-5 border-b border-black">
        <router-link to="/mypage">
          <div class="text-xl">
            <span class="inline-block w-10">
              <font-awesome-icon icon="fa-solid fa-circle-user" />
            </span>
            <span class="inline-block w-20">{{ store.state.auth.userName }}</span>
          </div>
        </router-link>
      </div>
      <div class="p-1 pt-5">
        <router-link to="/input">
          <div class="py-1 text-xl">
            <span class="inline-block w-10">
              <font-awesome-icon icon="fa-solid fa-receipt" />
              <!-- <font-awesome-icon icon="fa-regular fa-pen-to-square" /> -->
            </span>
            <span class="inline-block w-16">記録</span>
          </div>
        </router-link>
        <router-link to="/">
          <div class="py-1 text-xl">
            <span class="inline-block w-10">
              <!-- <font-awesome-icon icon="fa-solid fa-receipt" /> -->
              <font-awesome-icon icon="fa-solid fa-chart-column" />
            </span>
            <span class="inline-block w-16">統計</span>
          </div>
        </router-link>
      </div>
    </nav>

    <!-- メインページ -->
    <router-view class="col-span-5"/>
  </div>
  <!-- <nav class="fixed flex left-0 bottom-0 h-14 w-full z-20 bg-blue-200"> -->
    <!-- <router-link to="/" class="mr-2">
      <div>
        <div>
          <font-awesome-icon icon="fa-solid fa-house" />
        </div>
        <div>ホーム</div>
      </div>
    </router-link>
    <router-link to="/input">
      <div>
        <div>
          <font-awesome-icon icon="fa-solid fa-receipt" />
        </div>
        <div>入力</div>
      </div>
    </router-link> -->
  <!-- </nav> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
