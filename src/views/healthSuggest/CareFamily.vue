<template>
  <div class="manual_bg">
    <h1>看看您的家人当前生命周期需要哪些预防保健？</h1>
    <ul>
      <li>
        <div class="text-tit"><span>*</span>性别</div>
        <select-code :slot-data="sex" class="text-input"/>
        <div class="company"><i class="iconfont">&#xe64a;</i></div>
      </li>
      <li>
        <div class="text-tit"><span>*</span>年龄</div>
        <select-code :slot-data="age" class="text-input"/>
        <div class="company"><i class="iconfont">&#xe64a;</i></div>
      </li>
    </ul>
    <input type="submit" class="manual-btn" value="查看结果" >
  </div>
</template>

<script>
import SelectCode from '@/components/SelectCode'
export default {
  name: 'CareFamily',
  components: { SelectCode },
  data() {
    return {
      sex: [{
        values: ['男', '女']
      }],
      age: [{
        values: ['0岁', '1岁', '2岁', '3岁', '4岁']
      }]
    }
  },
  mounted() {
    // 修改导航标题
    this.$store.state.app.pageTitle = '关爱家人'
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .manual_bg>h1
     font-size:px2rem(34)
     padding:px2rem(40) 0
     font-weight:bold
  .manual_bg
    &>ul
      background: #ffffff
      border-top:1px solid #ebebeb
      &>li
        border-bottom:1px solid #ebebeb
        display:flex
        padding-left: 3%
        padding-right:3%
        height:px2rem(88)
        line-height:px2rem(88)
        &>div
          text-align:left
        &>div.text-tit
          font-size:px2rem(30)
          flex:1
          color:#333
          &>span
            color:#ff4925
        &>div.text-input
          width:70%
          &>input
            width:100%
            height: 100%
            font-size:px2rem(30)
            line-height:0
            text-align:right
        &>div.company
          text-align:right
          width:10%
          color: #999999
          font-size:px2rem(24)
  .manual-btn
      color:#fff
      width: 80%
      margin:30px auto
      height:px2rem(80)
      text-align:center
      line-height:px2rem(80)
      border-radius :120px
      border:1px solid #008dfd
      background:#008dfd
      font-size:px2rem(32)
</style>
