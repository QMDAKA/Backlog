<template>
  <div id="app">
    <vue-headful title="DAKA's Log"></vue-headful>
    <router-view/>
  </div>
</template>

<script>
  import vueHeadful from 'vue-headful';
  export default {
    components: {vueHeadful},
    name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
