<template>
  <mt-header title="健康问卷" fixed>
    <router-link slot="left" to="/">
      <mt-button icon="back"/>
    </router-link>
    <!--<mt-button slot="right" icon="more"/>-->
  </mt-header>
</template>

<script>
export default {
  name: 'HeaderBar',
  data() {
    return {
      selected: 'person'
    }
  },
  watch: {
    $route(to, from) {
      this.getItemSelected()
    }
  },
  created() {
    this.getItemSelected()
  },
  methods: {
    getItemSelected() {
      // const matched = this.$route.matched.filter(item => item.name)
      // this.selected = matched[0].name
      this.selected = this.$route.name
    }
  }
}
</script>
