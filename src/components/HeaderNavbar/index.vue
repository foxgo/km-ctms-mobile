<template>
  <mt-header fixed :title="pageTitle" class="title">
    <router-link slot="left" to="">
      <mt-button icon="back" @click.native="routerGoBack"/>
    </router-link>
  </mt-header>
</template>

<script>
export default {
  name: 'HeaderNavbar',
  props: {
    pageTitle: {
      type: String,
      default() {
        return null
      }
    }
  },
  methods:{
    routerGoBack(){
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
  .title >>> .mint-header-title{font-size:18px;}
</style>
