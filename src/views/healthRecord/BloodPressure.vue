<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近血压</h2>
      <ul>
        <li>
          <p>{{ bloodPressureRecord.Systolic }}<span>mmol/L</span></p>
          <h4>收缩压</h4>
        </li>
        <li>
          <p>{{ bloodPressureRecord.Diastolic }}<span>mmol/L</span></p>
          <h4>舒张压</h4>
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
      <router-link :to="{name:'BloodPressureManual'}">设备输入</router-link>
    </div>
    <div class="report_btn">
       <router-link :to="{name:'BloodPressureReport'}">查看报告</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getBloodPressureRecord } from '@/api/dailyMonitor'
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'BloodPressure',
  components: { LineChart },
  mixins: [mixinswitch],
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '收缩压', data: [] }, { name: '舒张压', data: [] }],
      lastTime: null,
      flag: false,
      min: 60,
      max: 210,
      interval: 30, // 间隔
      // 数据
      bloodPressureRecord: {
        SystolicList: [],
        DiastolicList: [],
        CheckTimeList: [],
        Systolic: null,
        Diastolic: null,
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
    this.$refs.healthHeight.style.height = (this.h - 154.0) + 'px'
    console.log(this.h)
  },
  watch: {
    memberId: function(newValue,olodValue) {
      if(newValue > 0 && newValue != olodValue){
        this.getData()
      }
    }
  },
  methods: {
    getData() {
      let that = this;
      that.listLoading = true;
      getBloodPressureRecord().then(response => {
        let data = response.data;
        if(data.IsSuccess){
              that.bloodPressureRecord = data.ReturnData;
              that.items[0].data = data.ReturnData.SystolicList;
              that.items[1].data = data.ReturnData.DiastolicList;
        }else{
           console.log('[ReturnMessage] ' + data.ReturnMessage);
           //that.$MessageBox("提示",data.ReturnMessage);
        }
        that.flag = true;
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
 @import '~@/assets/styles/dailyMonitor.styl'
</style>