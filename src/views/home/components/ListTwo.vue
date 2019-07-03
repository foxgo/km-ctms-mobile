<template>
  <div>
    <div class="list">
      <div class="item">
        <div class="item_div borderBottom1" @click="pushPage(3)">
          <div>
            <h2>健康评估</h2>
            <p>了解自身健康<br >问题</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjiankangpinggu"/>
          </svg>
        </div>
        <div class="item_div" @click="pushPage(4)">
          <div>
            <h2>中医体质</h2>
            <p>常见健康问题<br >自助排查</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconzhongyitizhi"/>
          </svg>
        </div>
      </div>
      <div class="item">
        <div class="item_div borderBottom1" @click="pushPage(5)">
          <div>
            <h2>部位自诊</h2>
            <p>常见健康问题<br >自助排查</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconbuweizizhen"/>
          </svg>
        </div>
        <div class="item_div" @click="pushPage(6)">
          <div>
            <h2>疾病地理</h2>
            <p>了解居住地的常见<br >病预防</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjibingdili"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListTwo',
  methods: {
    pushPage(index) {
      var pageRoutes = {
        3: '/healthEvaluate',
        4: '/selfBodyCheck',
        5: '/TCMphysique',
        6: '/deseaseGeography'
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
      &>svg
        width:px2rem(118px)
        padding-top:px2rem(50)
        height:px2rem(145px)
      &> .item_div
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
