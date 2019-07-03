<template>
  <div>
    <div class="list">
      <div class="item" @click="pushPage(0)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconjiankangceliang"/>
        </svg>
        <h2>健康测量</h2>
        <p>随时查看指标趋势</p>
      </div>
      <div class="item">
        <div class="item_div borderBottom1" @click="pushPage(1)">
          <div>
            <h2>每日健康</h2>
            <p>每日三分钟<br >健康生活一辈子</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconmeirijiankang"/>
          </svg>
        </div>
        <div class="item_div" @click="pushPage(2)">
          <div>
            <h2>生命周期健康</h2>
            <p>了解您和家人当前<br >生命周期健康建议</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshengmingzhouqi"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListOne',
  methods: {
    pushPage(index) {
      var pageRoutes = {
        0: '/healthRecord',
        1: '/dailyHealth',
        2: '/Suggest'
      }

      this.$router.push({ path: pageRoutes[index] })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .list
    display:flex
    height:px2rem(350)
    box-sizing:border-box
    background-color:#fff
    margin:px2rem(18) auto
    .item
      flex:1
      border:1px solid #eee
      border-left:none
    .item svg
        width:px2rem(118px)
        padding-top:px2rem(50)
        height:px2rem(145px)
     .item .item_div
        display:flex
        width:100%
        box-sizing:border-box
        height:px2rem(350/2)
        padding-left:px2rem(20)
        padding-right:px2rem(20)
        &>svg
          width:px2rem(89)
          height:auto
          text-align:right
        &>div
          flex:1
          text-align:left
    .item h2
        font-size:px2rem(34px)
        color:#113260
        line-height:px2rem(30)
        margin-bottom:px2rem(16)
        margin-top:px2rem(32px)
    .item p
        font-size:px2rem(24px)
        color:#7b95b8
        line-height:px2rem(34px)
     .borderBottom1
      border-bottom:1px solid #eee
</style>
