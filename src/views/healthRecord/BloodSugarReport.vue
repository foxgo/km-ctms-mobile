<template>
  <div class="health_content">
    <ul class="reportNav">
      <li v-for="(item , index) in tabNav" :key="index" :class="{active: showBoxId === index}" @click="changeBox(index)"><i>{{ item.text }}</i></li>
    </ul>
    <div class="report-box">
      <div class="report-value">
        <div>
          <i />
          <span>平均值</span>
          <span class="note">{{ bloodSugarReport.AverBloodSugar }}<i>mmol/L</i></span>
        </div>
        <div>
          <i />
          <span>模拟糖化</span>
          <span class="note1">{{ bloodSugarReport.Saccharification }}%</span>
        </div>
      </div>
      <div class="reportChart">
        <ring-chart v-if="value.length>0" :name="total" :value="value"/>
        <div class="reportContent">
          <ul>
            <li
              v-for="(item, index) in bloodSugarReport.ResultPercentList"
              :class="{ colorNormal : item.TypeName == '正常', color3 : item.TypeName == '偏高', color4 : item.TypeName == '偏低'}"
              :key="index"
            >
              <i/>
              <span>{{ item.TypeName }}</span>
              <span><i>{{ item.Count }}</i>次</span>
              <span>{{ item.Percentage }}%</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="report-column">
        <ul>
          <li>
            血糖值（mmol/L）
            <bar-chart v-if="barData[0].data.length>0" :name="name" :x-data="xData" :data="barData"/>
          </li>
          <li>
            平均值（mmol/L）
            <bar-chart v-if="averageData[0].data.length>0" :name="name" :x-data="average" :data="averageData"/>
          </li>
        </ul>
      </div>
    </div>
    <see-log v-if="flag" :value="bloodSugarReport.IndexDataList" :name="logName"/>
  </div>
</template>

<script>
import RingChart from './components/RingChart'
import BarChart from './components/BarChart'
import SeeLog from './components/SeeLog'
import { getBloodSugarReport } from '@/api/dailyMonitor'
export default {
  name: 'BloodPressureReport',
  components: { RingChart, BarChart, SeeLog },
  data() {
    return {
      flag: false,
      showBoxId: '0', // 切换框
      tabNav: {
        '0': {
          'text': '近一周'
        },
        '1': {
          'text': '近一月'
        },
        '2': {
          'text': '近三月'
        }
      },
      bloodSugarReport: {},
      total: null,
      value: [],
      logName: null,
      name: ['收缩压', '舒张压'],
      xData: ['最高值', '最低值'],
      barData: [{ name: '血糖值', data: [] }],
      average: ['空腹', '餐前', '餐后', '睡前'],
      averageData: [{ name: '平均值', data: [] }]
    }
  },
  mounted() {
    // 修改导航标题
    this.getReport(0)
    this.$store.state.app.pageTitle = '血压报告'
  },
  methods: {
    // 切换
    changeBox(i) {
      this.showBoxId = i
      this.getReport(i)
    },
    getReport(i) {
      let type = 'week'
      if (i == 0) {
        type = 'week'
      } else if (i == 1) {
        type = 'onemonth'
      } else if (i == 2) {
        type = 'threemonth'
      }
      this.flag = true
      this.listLoading = true
      getBloodSugarReport(type).then(response => {
        this.bloodSugarReport = response.data
        console.log(this.bloodSugarReport.Count)
        this.total = this.bloodSugarReport.Count + '次测量'
        for (var i in this.bloodSugarReport.ResultPercentList) {
          this.value[i] = this.bloodSugarReport.ResultPercentList[i].Percentage//  获取圆环name
        }
        this.barData[0].data = [this.bloodSugarReport.MaxBloodSugar, this.bloodSugarReport.MinBloodSugar]
        this.averageData[0].data = [this.bloodSugarReport.AverFasting, this.bloodSugarReport.AverBeforeLunch, this.bloodSugarReport.AverAfterSleep, this.bloodSugarReport.AverAfterLunch]
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
  .reportNav
    display: flex
    height:px2rem(90)
    line-height:px2rem(90)
    background-color:#fff
    &>li
      flex: 1
      font-size:px2rem(32)
      border-bottom:1px solid #e2e2e3
    .active i
      border-bottom:px2rem(4) solid #008dfd  // 改变路由的状态
      color:#008dfd
      padding-bottom:px2rem(21)
  .report-box
      background:#fff
      border-top:1px solid #e2e2e3
      border-bottom:1px solid #e2e2e3
      margin:0 auto
      padding:px2rem(20)
      margin-top:px2rem(20)
      &>.reportChart
          display:flex
          margin:0 auto
          width:96%
          &>.reportContent
               margin-left:px2rem(90)
               margin-top:px2rem(55)
               width:px2rem(360)
               &>ul>li
                   display:block
                   border-bottom:1px solid #ebebeb
                   height:px2rem(48)
                   line-height:px2rem(48)
                   text-align: justify
                   color:#666
                   display:flex
                   &>i
                     width:px2rem(16)
                     height:px2rem(17)
                     display:inline-block
                     margin-top:px2rem(13)
                     margin-right:px2rem(20)
                   &>span
                     flex:1
                     font-size:px2rem(26)
                   &>span:nth-child(2)
                     display: inline-block
                   &>span:nth-child(3)
                     display: inline-block
                   &>span:nth-child(4)
                     text-align:right
                     display: inline-block
.report-column
    margin-top:px2rem(50)
    &>ul
      display:flex
      &>li
         flex:1
         font-size:px2rem(30)
         color: #000000
         text-align:left
      &>li:nth-child(1)
         padding-left:px2rem(36)
      &>li:nth-child(1)>div
         width:px2rem(240)
         text-align:left
      &>li>span
           display:inline-block
           width:50%
      &>li>span:before
          content:''
          width:px2rem(16)
          height:px2rem(16)
          border-radius :50%
          position:absolute
          top:10%
      &>li>span:nth-child(1):before
                background-color:#00cbe9
                left:17%
      &>li>span:nth-child(2):before
                background-color:#6ccc56
                right: 33%
  .report-value
      height:px2rem(60)
      line-height:px2rem(40)
      width: 96%
      margin:0 auto
      border-bottom:1px solid #ebebeb
      display:flex
      &>div
         flex:1
         font-size:px2rem(30)
         &>.note
           color: #00cbe9
           font-size:px2rem(36)
           padding-left:px2rem(30)
         &>.note1
           color:#333
           font-size:px2rem(36)
           padding-left:px2rem(30)
  .colorLow>i
       background-color:#50f3f3
  .colorLow>span:nth-child(3)>i
       color:#50f3f3
  .colorNormal>i
    background-color:#00cbe9
  .colorNormal>span:nth-child(3)>i
    color:#00cbe9
  .colorHigh>i
    background-color:#fe8b31
  .colorHigh>span:nth-child(3)>i
    color:#fe8b31
</style>
