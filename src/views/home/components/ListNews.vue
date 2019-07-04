<template>
<div>
  <div class="title-box">
    <div class="newsTitle">健康资讯</div>
    <div class="fr" @click="refreshNews"><img class="refresh-icon" src="@/assets/images/home/refresh.png" />换一换</div>
  </div>
  <div class="news-box">
    <ul class="news-list">
      <li v-for="(item,index) in news">
        <img v-bind:src="item.img" >
        <div class="titles-box">
          <h2>不甜的水果含糖也高？---健康资讯健康资讯</h2>
          <p>小心，不甜的水果未必就少糖！！-------- 健康资讯</p>
          <p><font>美食</font><font>1290条评论</font></p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { getHomeNewsWithImg } from "@/api/dict"
export default {
  name: 'ListNews',
  data() {
    return {
      news:[{img:require("@/assets/images/healthEvaluate/food/milk1.png")},
            {img:require("@/assets/images/healthEvaluate/food/milk1.png")},
            {img:require("@/assets/images/healthEvaluate/food/milk1.png")},],
    }
  },
  mounted() {
    getHomeNewsWithImg(3).then(response => {
      this.news = response.data.ReturnData;
    })
  },
  methods: {
  	refreshNews(){

    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .title-box
      height px2rem(60)
      background #fff
      &>div.newsTitle{
        padding px2rem(15)
        float left
        font-size px2rem(28)
        font-weight bold
      }
      &>div.fr{
        padding-right px2rem(15)
        padding-top px2rem(15)
        font-size px2rem(22)
        float right
        color #7b95b8
      }
      &>div.fr .refresh-icon{
        width 0.4rem
        height 0.4rem
        padding-right 0.1rem
        padding-bottom 0.1rem
      }
       
  .news-box>ul
      &>li
        display flex
        height px2rem(180)
        border-top 1px solid #eee
        align-items center
        box-sizing:border-box
        img
          width px2rem(220)
          height px2rem(156)
          float left
          margin 0px px2rem(12)
        .titles-box
          display flex
          flex-direction column
          justify-content space-between
          align-items flex-start
          height px2rem(150)
          h2
            font-size px2rem(26px)
            font-weight 500
            color #113260
            white-space nowrap
            overflow hidden
            padding-right px2rem(15)
          p
            color:#7b95b8
            text-align left 
            line-height px2rem(28)
            font-size px2rem(22)
          p:last-child
            font-size px2rem(18)
            :first-child
              margin-right px2rem(40)
      
</style>