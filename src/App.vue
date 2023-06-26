<script setup lang="ts">

</script>

<template>
  <header class="fixed left-0 top-0 h-14 w-full z-20 py-1 text-center leading-8 bg-blue-200">
  </header>
  <router-view class="fixed left-0 top-0 w-full pt-14 pb-14"/>
  <nav class="fixed flex left-0 bottom-0 h-14 w-full z-20 bg-blue-200">
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
  </nav>
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
