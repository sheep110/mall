<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from 'components/content/maintarbar/MainTarBar'

export default {
  name: 'App',
  components: {
    MainTarBar
  }
}
</script>

<style>
@import url('assets/css/base.css');
</style>
