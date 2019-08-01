<template>
<div>
  <div class="title-box">
    <div class="newsTitle">健康资讯</div>
    <div class="fr" @click="refreshNews">
      <img class="refresh-icon" 
            src="@/assets/images/home/refresh.png" 
            v-bind:class="[enableAnimation?'rotateAnimation':'']"
       />
      换一换
    </div>
  </div>
  <div class="news-box">
    <ul class="news-list">
      <li v-for="(item,index) in news" @click="itemClicked(item.ID, item.Title)">
        <img v-bind:src="item.MainImage" >
        <div class="titles-box">
          <h2>{{item.Title}}</h2>
          <p><font>{{item.CategoryName}}</font><font>{{item.ReadingQuantity}}次浏览</font></p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { getHomeNewsWithImg, getHomeNewsDetail } from "@/api/km360App"
import { error } from 'util'
import axios from "axios"
import { setTimeout } from 'timers';

export default {
  name: 'ListNews',
  data() {
    return {
      news:[],
      enableAnimation : false,
    }
  },
  mounted() {
    getHomeNewsWithImg(3).then(response => {
      this.news = response.data.Data;
    })
  },
  methods: {
  	refreshNews(){
      // 开启转圈动画
      this.enableAnimation = true
      // 发起请求
      getHomeNewsWithImg(3).then(response => {
        this.news = response.data.Data;
        // 关闭转圈动画
        setTimeout(()=>{
          this.enableAnimation = false
        },1000);
      })
    },

    itemClicked(newsID, title){
      // window.location.href = "https://www.baidu.com"
      /* 总是获取空数据 不知道原因
      getHomeNewsDetail(newsID).then(response => {
        // window.location.href = response.data.Data.SourceUrl
        console.log(JSON.stringify(response.data.Data.SourceUrl))
      }).catch(error => {
        alert(error)
      })
      */

      axios(process.env.BASE_API_APP + "/api/News/GetNewsDetail?id=" + newsID).then((response) => {
          return response.data;
      }).then((data) => {
          const url = data.Data.SourceUrl
          this.$root.actionToNative('gotoOuterSiteURL', title, url)
      }).catch(() => {
          console.log("请求出错");
      });
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
        margin-right 0.1rem
        margin-bottom 0.1rem
      }

      .rotateAnimation{
        -webkit-animation:refreshAnimation .8s linear infinite forwards;

        @-webkit-keyframes refreshAnimation {
          0%{-webkit-transform:rotate(0deg);}
          50%{-webkit-transform:rotate(180deg);}
          100%{-webkit-transform:rotate(360deg);}
        }
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
          height px2rem(150)
          float left
          margin 0px px2rem(15)
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
            word-wrap break-word
            overflow hidden
            text-align left 
            line-height px2rem(32px)
            padding-right px2rem(15)
            padding-top px2rem(5)
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