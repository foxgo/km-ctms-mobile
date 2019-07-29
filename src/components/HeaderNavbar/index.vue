<template>
  <mt-header fixed :title="pageTitle" class="title">
    <router-link slot="left" to="">
      <mt-button icon="back" @click.native="routerGoBack"/>
      <mt-button @click.native="gotoNative">
        <img src="@/assets/images/healthEvaluate/close_ion.png" height="16" width="16" slot="icon">
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
@import '../../assets/styles/varibles';
  .mint-header.title {
    font-size: 17px;
  }

  .mint-header.title.is-fixed {
    @include respond-to(iPhone_X_Xs iPhone_XsMax iPhone_XR){
      padding-top: 60px;
      padding-bottom: 20px;
    }
    @include respond-to(iPhone5 iPhone6_7_8 iPhone6P_7P_8P){
      padding-top: 44px;
      padding-bottom: 20px;
    }
  }
</style>
