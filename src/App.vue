<template>
  <div id="app">
    <header-navbar :page-title="this.$store.getters.pageTitle"/>
    <router-view/>
  </div>
</template>

<script>
import HeaderNavbar from '@/components/HeaderNavbar'
export default {
  name: 'App',
  components: { HeaderNavbar }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0
}
@media screen and (min-width: 1024px){
  #app{
    max-width:640px;
    margin-left:auto;
    margin-right:auto;
  }

}
.app-main{margin-top:40px;}
</style>
