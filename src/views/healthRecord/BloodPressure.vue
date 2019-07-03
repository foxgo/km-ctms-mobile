<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近血压</h2>
      <ul>
        <li>
          <h4>收缩压</h4>
          <p>{{ bloodPressureRecord.Systolic }}<span>mmol/L</span></p>
        </li>
        <li>
          <h4>舒张压</h4>
          <p>{{ bloodPressureRecord.Diastolic }}<span>mmol/L</span></p>
        </li>
        <li>
          <p :class="{color1:bloodPressureRecord.Result=='偏低',color2:bloodPressureRecord.Result=='正常',color3:bloodPressureRecord.Result=='正常高值',color4:bloodPressureRecord.Result=='轻度',color5:bloodPressureRecord.Result=='中度',color6:bloodPressureRecord.Result=='重度'}" class="blood-status">{{ bloodPressureRecord.Result }}</p>
        </li>
      </ul>
    </div>
    <div class="trendMap">
      <h2 class="lately_title">血压趋势</h2>
      <line-chart v-if="flag" :items="items" :check-time="bloodPressureRecord.CheckTimeList" :last-time="bloodPressureRecord.LastTestTime" :y-min="min" :y-max="max" :y-interval="interval"/>
    </div>
    <div class="health_btn">
      <router-link :to="{name:'BloodPressureManual'}">手动输入</router-link>
      <router-link :to="{name:'BloodPressureReport'}">查看报告</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getBloodPressureRecord } from '@/api/dailyMonitor'
export default {
  name: 'BloodPressure',
  components: { LineChart },
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '收缩压', data: [89, 90, 120, 90, 110, 89, 120, 89, 90, 90] }, { name: '舒张压', data: [119, 30, 80, 90, 100, 79, 80, 99, 120] }],
      // items: [{ name: '收缩压', data: [] }, { name: '舒张压', data: [] }],
      lastTime: '2017-10-19 10:23',
      flag: false,
      min: 60,
      max: 210,
      interval: 30, // 间隔
      // 数据
      bloodPressureRecord: {
        SystolicList: [],
        DiastolicList: [],
        CheckTimeList: [],
        Systolic: 150,
        Diastolic: 30,
        Pulse: 0,
        LastTestTime: null,
        Result: null,
        Imei: null,
        PersonID: 0,
        WeekTestCount: 0,
        ExceptionCount: 0,
        NormalCount: 0,
        ExamTime: null
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$refs.healthHeight.style.height = this.h + 'px'
    console.log(this.h)
  },
  methods: {
    getData() {
      this.listLoading = true
      getBloodPressureRecord().then(response => {
        this.bloodPressureRecord = response.data
        this.items[0].data = this.bloodPressureRecord.SystolicList
        this.items[1].data = this.bloodPressureRecord.DiastolicList
        this.flag = true
        this.listLoading = false
      }, error => {
        this.listLoading = false
        console.log('[error] ' + error) // for debug
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .health_content
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
          width:95%
          &>li
             flex:1
             margin-left:8%
             text-align:left
             &>h4
               font-size:px2rem(26)
               margin-bottom:px2rem(20)
             &>p
               font-size:px2rem(60)
               &>span
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
  .color1 {
    color: #50f3f3;
  }
  .color2 {
    color: #00cbe9;
  }
  .color3 {
    color: #fe8b31;
  }
  .color4 {
    color: #ffc635;
  }
  .color5 {
    color: #fe8b31;
  }
  .color6 {
    color: #ff3b3b;
  }
</style>
