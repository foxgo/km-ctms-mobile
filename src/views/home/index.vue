<template>
  <div class="home">
    <banner />
    <health-record />
    <health-one />
    <health-two />
    <health-three />
    <list-news />
  </div>
</template>

<script>
import Banner from './components/Banner'
import HealthRecord from './components/HealthRecord'
import HealthOne from './components/HealthOne'
import HealthTwo from './components/HealthTwo'
import HealthThree from './components/HealthThree'
import ListNews from './components/ListNews'

export default {
  name: 'Home',
  components: {
    Banner,HealthRecord, HealthOne,HealthTwo,HealthThree,ListNews
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.state.app.pageTitle = '全程健康管理';
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{background:#fafafa}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
