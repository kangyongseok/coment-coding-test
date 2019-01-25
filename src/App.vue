<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import ViewCategoryList from './components/ViewCategoryList.vue'
export default {
  name: 'app',
  components: {ViewCategoryList},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
body {
    width:100%;
    height:100%;
    background: #f1f1f1;
}
</style>
