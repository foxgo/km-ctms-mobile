<template>
  <div class="health_content normal-page-box">
    <ul class="reportNav">
      <li v-for="(item , index) in tabNav" :key="index" :class="{active: showBoxId === index}" @click="changeBox(index)"><i>{{ item.text }}</i></li>
    </ul>
    <div class="report-box">
      <div class="reportChart">
        <ring-chart v-if="value.length>0" :name="total" :value="value"/>
        <div class="reportContent">
          <ul>
            <li
              v-for="(item, index) in bloodPressureReport.ResultPercentList"
              :key="index"
              :class="{ colorNormal : item.TypeName == '正常', color2 : item.TypeName == '正常高值', color3 : item.TypeName == '轻度', color4 : item.TypeName == '中度', color5 : item.TypeName == '重度', color6 : item.TypeName == '偏低'}"
            ><i/><span>{{ item.TypeName }}</span><span>{{ item.Percentage }}%</span></li>
          </ul>
        </div>
      </div>
      <div class="report-column">
        <ul>
          <li>血压值（mmHg）</li>
          <li><span>收缩压</span><span>舒张压</span></li>
        </ul>
        <bar-chart v-if="barData[0].data.length>0" :name="name" :x-data="xData" :data="barData"/>
      </div>
    </div>
    <see-log v-if="flag" :value="bloodPressureReport.IndexDataList"/>
  </div>
</template>

<script>
import RingChart from './components/RingChart'
import BarChart from './components/BarChart'
import SeeLog from './components/SeeLog'
import { getBloodPressureReport } from '@/api/dailyMonitor'
export default {
  name: 'BloodPressureReport',
  components: { RingChart, BarChart, SeeLog },
  data() {
    return {
      flag: false,
      showBoxId: '0', // 切换框 .DetailedRecords
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
      total: '12次测量',
      value: [],
      name: ['收缩压', '舒张压'],
      xData: ['最高值', '最低值', '平均值'],
      barData: [{ name: '收缩压', data: [] }, { name: '舒张压', data: [] }],
      bloodPressureReport: { }
    }
  },
  created() {
  },
  mounted() {
    this.getReport(0)
    // 修改导航标题
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
      let that = this;
      that.flag = true;
      that.listLoading = true
      getBloodPressureReport(type).then(response => {
        let data = response.data;
        if(data.IsSuccess){
          that.bloodPressureReport = data.ReturnData;
          for (let i in that.bloodPressureReport.ResultPercentList) {
            that.value[i] = that.bloodPressureReport.ResultPercentList[i].Percentage;//  获取圆环name
          }
          that.total = data.ReturnData.Count + "次\n测量";
          that.barData[0].data = [that.bloodPressureReport.MaxSystolic, that.bloodPressureReport.MinSystolic, that.bloodPressureReport.AverSystolic];
          that.barData[1].data = [that.bloodPressureReport.MaxDiastolic, that.bloodPressureReport.MinDiastolic, that.bloodPressureReport.AverDiastolic];
        }else {
           console.log('[ReturnMessage] ' + data.ReturnMessage);
        }
        that.listLoading = false;
      }, error => {
        that.listLoading = false;
        console.log('[error] ' + error); // for debug
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
               width:px2rem(360)
               &>ul
                  &>.colorNormal>i
                      background-color:#00cbe9
                  &>.color2>i
                      background-color:#ffff86
                  &>.color3>i
                      background-color:#ffc635
                  &>.color4>i
                      background-color:#fe8b31
                  &>.color5>i
                      background-color:#ff3b3b
                  &>.color6>i
                      background-color:#50f3f3
               &>ul>li
                   display:block
                   border-bottom:1px solid #ebebeb
                   height:px2rem(48)
                   line-height:px2rem(48)
                   text-align: justify
                   color:#666
                   &>i
                     width:px2rem(16)
                     height:px2rem(17)
                     display:inline-block
                     margin-right:px2rem(20)
                   &>span:nth-child(2)
                     width:72%
                     display: inline-block;
                     font-size:px2rem(26)
                   &>span:nth-child(3)
                     margin-right:0;
                     display: inline-block;
                     font-size:px2rem(26);
                     width:px2rem(30);
.report-column
    margin-top:px2rem(50)
    &>ul
      display:flex
      &>li
         flex:1
         text-algin:left
      &>li:nth-child(1)
         font-size:px2rem(30)
         color: #000000
         padding-left:px2rem(36)
         text-align:left
      &>li:nth-child(2)
         font-size:px2rem(24)
         color: #666
         position:relative
         width:30%
         text-align:right
         padding-right:px2rem(36)
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
</style>
