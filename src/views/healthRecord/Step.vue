<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近步数</h2>
      <ul>
        <li>
          <p>{{ stepReocrd.Step }}<span>步</span></p>
        </li>
        <li>
          <p class="blood-status">{{ stepReocrd.Result }}</p>
        </li>
      </ul>
    </div>
    <div class="trendMap">
      <h2 class="lately_title">步数趋势</h2>
      <line-chart v-if="flag" :items="items" :check-time="stepReocrd.StepsTimeList" :last-time="stepReocrd.StepTime" :y-min="min" :y-max="max" :y-interval="interval"/>
    </div>
    <div class="health_btn">
      <router-link :to="{name:'StepManual'}">手动输入</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getStepReocrd } from '@/api/dailyMonitor'
export default {
  name: 'BloodPressure',
  components: { LineChart },
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '步数', data: [] }],
      min: 20,
      max: 140,
      interval: 20, // 间隔
      flag: false,
      stepReocrd: {
        'StepsList': [],
        'StepsTimeList': [],
        'Step': null,
        'StepTime': null,
        'Imei': null,
        'Result': null,
        'WeekTestCount': 0,
        'ExceptionCount': 0,
        'NormalCount': 0,
        'PersonID': 0
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$refs.healthHeight.style.height = this.h + 'px'
  },
  methods: {
    getData() {
      let that = this;
      that.listLoading = true;
      getStepReocrd().then(response => {
        let data = response.data;
        if(data.IsSuccess){
            that.stepReocrd = data.ReturnData;
            that.items[0].data = data.ReturnData.StepsList;
        }else{
           console.log('[ReturnMessage] ' + data.ReturnMessage);
        }
        that.flag = true;
        that.listLoading = false;
      }, error => {
        that.listLoading = false;
        console.log('[error] ' + error) // for debug
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .health_content
    background-color:#f5f5f5
    padding-top:px2rem(20)
    &>.lately
      height:px2rem(250)
      border-top:1px solid #eee
      border-bottom:1px solid #eee
      box-sizing:border-box
      background:#fff
      margin:px2rem(20) auto
      margin-top:0
      color:#444
      &>ul
        display:flex
        margin:px2rem(60) auto
        justify-content :center
        width:80%
        margin-top:px2rem(76)
        &>li
          flex:1
          margin-left:8%
          text-align:center
          // 共用
          &>p.sugar
            font-size:px2rem(30)
            color:#00cbe9
            margin-top:px2rem(20)
          &>p
            font-size:px2rem(60)
          &>p>span
            font-size:px2rem(24)
            color:#999
  .lately_title
    font-size:px2rem(36)
    position:relative
    top:px2rem(20)
    &:before
      content:""
      background-color : #e2e2e3
      width:36%
      height:1px
      position:absolute
      left:0
      top:50%
    &:after
      content:""
      background-color : #e2e2e3
      width:36%
      height:1px
      position:absolute
      right:0
      top:50%
  .blood-status
    font-size:px2rem(40) !important
    margin-top:px2rem(20)
    color:red
  .trendMap
    background: #ffffff
    border-top:1px solid #eee
    border-bottom:1px solid #eee
    height:px2rem(620)
    &>div
      margin-top:px2rem(58) !important
  .health_btn
    font-size:px2rem(34)
    margin-top:px2rem(50)
    &>a
      color:#008dfd
      display:inline-block
      width:px2rem(232)
      height:px2rem(60)
      text-align:center
      line-height:px2rem(60)
      border-radius :120px
      border:1px solid #008dfd
      margin-left:5%
      margin-right:5%
</style>
