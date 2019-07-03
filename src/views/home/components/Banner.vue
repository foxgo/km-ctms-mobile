<!--<template>
  <div class="banner">
    <img class="banner-img" src="@/assets/images/home/banner_01.png" >
  </div>
</template>-->

<template>
  <div class="banner" v-on:mouseover="stop()" v-on:mouseout="move()">
    <div class="slideshow">
      <ul>
        <li v-for="(img, index) in imgArray" v-show="index===mark" @click="getUrl(index)" :key="index">
          <a href="#">
            <img class="banner-img" :src='img'>
          </a>
        </li>
      </ul>
    </div>
    <div class="bar">
      <span v-for="(item, index) in imgArray" :class="{ 'active':index===mark }"
      @click="change(index)" :key="index"></span>
    </div>
  </div>
</template>
 
<script>
export default {
	name: 'banner',
  data () {
    return {
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      imgArray: [
        require('../../../assets/images/home/banner1.jpg'),
        require('../../../assets/images/home/banner2.jpg'),
        require('../../../assets/images/home/banner3.jpg'),
      ]
    }
  },
  methods: {
    autoPlay () {
      this.mark++;
      if (this.mark === 3) {
        this.mark = 0
      }
    },
    play () {
      this.timer = setInterval(this.autoPlay, 2500)
    },
    getUrl (i) {
      alert(i)
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
  created () {
    this.play()
  }
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
    z-index: 10;
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
