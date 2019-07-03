<template>
  <div>
    <div class="list">
      <div class="item">
        <div class="item_div borderBottom1" @click="pushPage(1)">
          <div>
            <h2>健康评估</h2>
            <p>健康状况&nbsp;保健建议</p>
          </div>
          <img class="listImg" src="@/assets/images/home/assess.png" />
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjiankangpinggu"/>
          </svg> -->
        </div>
      </div>
      <div class="item">
        <div class="item_div borderBottom1" @click="pushPage(2)">
          <div>
            <h2>在线问诊</h2>
            <p>专业医生&nbsp;在线看诊</p>
          </div>
          <img class="listImg" src="@/assets/images/home/treatment.png" />
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconbuweizizhen"/>
          </svg> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthOne',
  methods: {
    pushPage(index) {
      var pageRoutes = {
        1: '/healthEvaluate',
        2: '/TCMphysique',
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
    height:px2rem(175)
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
        align-items:center
        &>svg
          width:px2rem(89)
          height:auto
          text-align:right
        &>div
          flex:1
          text-align:left
          justify-content :center
          &>h2
            margin-top :0px
            margin-bottom :px2rem(10)
        &>img.listImg{
				  width: 1.2rem;
				  height: 1.2rem;
				  padding-right: 0.2rem;
        }
    .item h2
      font-size:px2rem(28)
      font-weight :bold
      color:#113260
      line-height:px2rem(30)
      margin-bottom:px2rem(16)
      margin-top:px2rem(32)
    .item p
      font-size:px2rem(24)
      color:#7b95b8
      line-height:px2rem(34)
    .borderBottom1
      border-bottom:1px solid #eee
</style>
