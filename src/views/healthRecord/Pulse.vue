<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近心率</h2>
      <ul>
        <li>
          <p>{{ heartRateRecord.Rate > 0 ? heartRateRecord.Rate:'' }}<span>次/分</span></p>
        </li>
        <li>
          <p class="blood-status">{{ heartRateRecord.Result }}</p>
        </li>
      </ul>
    </div>
    <div class="trendMap">
      <h2 class="lately_title">心率趋势</h2>
      <line-chart v-if="flag" :items="items" :check-time="heartRateRecord.CheckTimeList" :last-time="heartRateRecord.LastTestTime" :y-min="min" :y-max="max" :y-interval="interval"/>

    </div>
    <div class="health_btn">
      <router-link :to="{name:'PulseManual'}">手动输入</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getHeartRateRecord } from '@/api/dailyMonitor'
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'BloodPressure',
  components: { LineChart },
  mixins: [mixinswitch],
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '心率', data: [] }],
      min: 20,
      max: 140,
      interval: 20, // 间隔
      flag: false,
      heartRateRecord: {
        'RateList': [],
        'CheckTimeList': [],
        'Rate': null,
        'LastTestTime':null,
        'Result': null,
        'Imei': null,
        'ExamTime': null,
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
    this.$refs.healthHeight.style.height = (this.h - 154.0) + 'px'
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
      that.listLoading = true
      getHeartRateRecord().then(response => {
        that.flag = true;
        that.listLoading = false;
        var data = response.data;
        if(data.IsSuccess){
            that.heartRateRecord = data.ReturnData;
            that.items[0].data = data.ReturnData.RateList;
        }else{
           console.log('[ReturnMessage] ' + data.ReturnMessage);
        }
      }, error => {
        that.listLoading = false;
        console.log('[error] ' + error) // for debug
      })
    }
  }
}
</script>

<style scoped lang="stylus">
 @import '~@/assets/styles/dailyMonitor.styl'
 .health_content
    &>.lately
        &>ul
          &>li
             text-align:center
</style>