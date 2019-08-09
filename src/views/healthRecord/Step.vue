<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近步数</h2>
      <ul>
        <li>
          <p>{{ stepReocrd.Step > 0 ? stepReocrd.Step:'' }}<span>步</span></p>
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
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'BloodPressure',
  components: { LineChart },
  mixins: [mixinswitch],
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
 @import '~@/assets/styles/dailyMonitor.styl'
 .health_content
    &>.lately
        &>ul
          &>li
             text-align:center
</style>