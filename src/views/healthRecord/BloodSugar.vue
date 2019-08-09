<template>
  <div ref="healthHeight" class="health_content">
    <div class="lately">
      <h2 class="lately_title">最近血糖</h2>
      <ul>
        <li>
          <p class="sugar">{{ bloodSugarRecord.SugarType }}</p>
        </li>
        <li>
          <p>{{ bloodSugarRecord.Sugar > 0 ? bloodSugarRecord.Sugar:'' }} <span>mmol/L</span></p>
        </li>
        <li>
          <p class="blood-status">{{ bloodSugarRecord.Result }}</p>
        </li>
      </ul>
    </div>
    <div class="trendMap">
      <h2 class="lately_title">血糖趋势</h2>
      <line-chart v-if="flag" :items="items" :check-time="bloodSugarRecord.CheckTimeList" :last-time="bloodSugarRecord.LastTestTime" :y-min="min" :y-max="max" :y-interval="interval"/>
    </div>
     <div class="health_btn">
      <router-link :to="{name:'BloodSugarManual'}">手动输入</router-link>
      <router-link :to="{name:'BloodSugarManual'}">设备输入</router-link>
    </div>
    <div class="report_btn">
       <router-link :to="{name:'BloodSugarReport'}">查看报告</router-link>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { getBloodSugarRecord } from '@/api/dailyMonitor'
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'BloodPressure',
  components: { LineChart },
  mixins: [mixinswitch],
  data() {
    return {
      h: document.documentElement.clientHeight || document.body.clientHeight,
      items: [{ name: '血糖', data: [] }, { name: '', data: [] }],
      lastTime: '2017-10-19 10:23',
      min: 0,
      max: 18,
      interval: 2, // 间隔
      flag: false,
      bloodSugarRecord: {
        SugarList: [],
        CheckTimeList: [],
        SugarTypeList: [],
        Sugar: null,
        LastTestTime: null,
        Result: null,
        Imei: null,
        ExamTime: null,
        WeekTestCount: 0,
        ExceptionCount: 0,
        NormalCount: 0,
        PersonID: 0,
        SugarType: null
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
      getBloodSugarRecord().then(response => {
        let data = response.data;
        if(data.IsSuccess){
            that.bloodSugarRecord = data.ReturnData;
            that.items[0].data = data.ReturnData.SugarList;
            that.items[1].data = data.ReturnData.SugarTypeList;
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
</style>