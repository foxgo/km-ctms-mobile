<template>
  <mt-header fixed :title="pageTitle" class="title">
    <router-link slot="left" to="">
      <mt-button class="default-back" icon="back" @click.native="routerGoBack"/>
      <mt-button @click.native="gotoNative">
        <img src="@/assets/images/home/closed.png" height="16" width="16" slot="icon">
      </mt-button>
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
  data() {
    return {
      
    }
  },
  methods:{
    routerGoBack(){
      console.log(this.$router.currentRoute.path)
     
      // 已到栈顶，无法继续回退
      if(this.$router.currentRoute.path === '/') {
        this.gotoNative()
        return
      }

      this.$router.back()
    },

    gotoNative(){
      alert(JSON.stringify({'action': 'gotoNative'}))
    }
  }

}
</script>

<style lang="scss" scoped>
  .default-back {
    padding: 4px 5px 4px 0;
  }

  .mint-button-icon img {
    padding: 0px 5px 3px 3px;
  }
</style>
