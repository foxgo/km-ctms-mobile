<template>
  <div class="banner" v-on:mouseover="stop()" v-on:mouseout="move()">
    <div class="slideshow">
      <ul>
        <li v-for="(item, index) in itemArray" v-show="index===mark" @click="getUrl(index)" :key="index">
          <a href="#">
            <img class="banner-img" :src='item.CarouselUrl'>
          </a>
        </li>
      </ul>
    </div>
    <div class="bar">
      <span v-for="(item, index) in itemArray" :class="{ 'active':index===mark }"
      @click="change(index)" :key="index"></span>
    </div>
  </div>
</template>
 
<script>
import { getCarouselList } from '@/api/km360App'
export default {
	name: 'banner',
  data () {
    return {
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      itemArray: []
    }
  },
  mounted() {
    getCarouselList().then(response => {
      this.itemArray = response.data.Data
      this.play()
    })
  },
  methods: {
    autoPlay () {
      this.mark++;
      if (this.mark === this.itemArray.length) {
        this.mark = 0
      }
    },
    play () {
      this.timer = setInterval(this.autoPlay, 2500)
    },
    getUrl (i) {
      const url = this.itemArray[i].LinkAddress
      const obj = {
          'action': 'gotoShoppingMall',
          'title': this.itemArray[i].CarouselTitle || '产品详情',
          'gooID': this.itemArray[i].ID
      }
      alert(JSON.stringify(obj))
      // this.$router.push({path:'/htmlPanel', query:{url}})
    },
    change (i) {
      this.mark = i
    },
    stop () {
      clearInterval(this.timer)
    },
    move () {
      this.timer = setInterval(this.autoPlay, 2500)
    }
  },
  
}
</script>


<style scoped lang="stylus">
@import '~@/assets/styles/varibles.styl'
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .banner {
    height: px2rem(320);
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .banner-img {
  	width:100%;
    height: px2rem(320);
  }
  .slideshow {
    height: px2rem(320);
  }
  li {
    position: absolute;
  }
  .bar {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 0 auto;
    z-index: 0;
    text-align: center;
  }
  .bar span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid;
    background: white;
    display: inline-block;
    margin-right: 10px;
  }
  .active {
    background: red !important;
  }
  
.image-enter-active {
    transform: translateX(0);
    transition: all 1.5s ease;
  }
  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
  }
  .image-enter {
    transform: translateX(100%);
  }
  .image-leave {
    transform: translateX(0);
  }
</style>
