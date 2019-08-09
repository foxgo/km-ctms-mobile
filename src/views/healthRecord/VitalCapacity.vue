<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近肺活量</h2>
      <ul>
        <li>
          <p>{{ vitalCapacityRecord.VitalCapacity > 0 ? vitalCapacityRecord.VitalCapacity:'' }}<span>ml</span></p>
        </li>
        <li>
          <p class="blood-status">{{ vitalCapacityRecord.Result }}</p>
        </li>
      </ul>
    </div>
    <div class="trendMap">
      <h2 class="lately_title">肺活量趋势</h2>
      <line-chart v-if="flag" :items="items" :check-time="vitalCapacityRecord.CheckTimeList" :last-time="vitalCapacityRecord.LastTestTime" :y-min="min" :y-max="max" :y-interval="interval"/>
    </div>
    <div class="health_btn">
      <router-link :to="{name:'VitalCapacityManual'}">手动输入</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getVitalCapacityRecord } from '@/api/dailyMonitor'
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'BloodPressure',
  components: { LineChart },
  mixins: [mixinswitch],
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '肺活量', data: [] }],
      min: 2000,
      max: 6000,
      interval: 500, // 间隔
      flag: false,
      vitalCapacityRecord: {
        'VitalCapacityList': [],
        'CheckTimeList': [],
        'VitalCapacity': null,
        'Result': null,
        'LastTestTime': null,
        'ExamTime': null,
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
      that.listLoading = true;
      getVitalCapacityRecord().then(response => {
        let data = response.data;
        if(data.IsSuccess){
            that.vitalCapacityRecord = data.ReturnData;
            that.items[0].data =  data.ReturnData.VitalCapacityList
            console.log(data.ReturnData);
        }else{
           console.log('[ReturnMessage] ' + data.ReturnMessage);
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
 .health_content
    &>.lately
        &>ul
          &>li
             text-align:center
</style>