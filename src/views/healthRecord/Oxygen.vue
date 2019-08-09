<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近血氧</h2>
      <ul>
        <li>
          <p>{{ bloodOxygenRecord.Oxygen > 0 ? bloodOxygenRecord.Oxygen:'' }}<span>%</span></p>
        </li>
        <li>
          <p class="blood-status">{{ bloodOxygenRecord.Result }}</p>
        </li>
      </ul>
    </div>
    <div class="trendMap">
      <h2 class="lately_title">血氧趋势</h2>
      <line-chart v-if="flag" :items="items" :check-time="bloodOxygenRecord.CheckTimeList" :last-time="bloodOxygenRecord.LastTestTime" :y-min="min" :y-max="max" :y-interval="interval"/>
    </div>
    <div class="health_btn">
      <router-link :to="{name:'OxygenManual'}">手动输入</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getBloodOxygenRecord } from '@/api/dailyMonitor'
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'BloodPressure',
  components: { LineChart },
  mixins: [mixinswitch],
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '血氧', data: [] }],
      lastTime:null,
      min: 0,
      max: 100,
      interval: 10, // 间隔
      flag: false,
      bloodOxygenRecord: {
        'OxygenList': [],
        'CheckTimeList': [],
        'Oxygen': null,
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
      getBloodOxygenRecord().then(response => {
        that.flag = true;
        that.listLoading = false;
        let data = response.data;
        if(data.IsSuccess){
            that.bloodOxygenRecord = data.ReturnData;
            that.items[0].data = data.ReturnData.OxygenList;
        }else{
           console.log('[ReturnMessage] ' + data.ReturnMessage);
        }
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