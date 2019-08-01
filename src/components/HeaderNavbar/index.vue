<template>
  <mt-header fixed :title="pageTitle" class="title">
    <router-link slot="left" to="">
      <!-- <mt-button class="default-back" icon="back" @click.native="routerGoBack"/> -->
      <mt-button @click.native="routerGoBack">
        <img src="@/assets/images/back.png" class="back" height="15" width="15" slot="icon">
      </mt-button>
      <mt-button @click.native="gotoNative">
        <img src="@/assets/images/closed.png" class="close" height="18" width="18" slot="icon">
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
      console.log(this.$root.$router.currentRoute.path)
     
      // 已到栈顶，无法继续回退
      if(this.$router.currentRoute.path === '/') {
        this.gotoNative()
        return
      }else if(this.$router.currentRoute.path.match(/(^\/healthRecord\/)+/g)){
        // 当前组件调用如下指令不生效
        // this.$router.push({ path: '/home' })
        // 使用事件发送，让App.vue组件来处理
        this.$store.commit('Navigator_Back')
        return
      }

      this.$router.back()
    },

    gotoNative(){
      this.$root.actionToNative('gotoNative')
    }
  }

}
</script>

<style lang="scss" scoped>
  img.back {
    padding: 3px 6px 3px 0px;
  }

  img.close {
    padding: 3px 5px 3px 6px;
  }
  
</style>
