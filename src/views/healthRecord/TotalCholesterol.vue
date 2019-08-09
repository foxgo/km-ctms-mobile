<template>
  <div ref="healthHeight" class="health_content">
     <div class="lately">
        <h2 class="lately_title">最近胆固醇</h2>
        <ul>
           <li>
             <p>{{ TCRecord.MonitorData > 0 ? TCRecord.MonitorData:'' }}<span>mmol/L</span>  </p>
           </li>
           <li>
             <p class="blood-status">{{ TCRecord.Result }}</p>
           </li>
        </ul>
     </div>
     <div class="trendMap">
         <h2 class="lately_title">胆固醇趋势</h2>
         <line-chart v-if="flag" :items="items" :check-time ="TCRecord.CheckTimeList" :last-time="TCRecord.LastTestTime" :y-min="min" :y-max="max" :y-interval="interval"/>
     </div>
     <div class="health_btn">
        <router-link :to="{name:'TotalCholesterolManual'}">手动输入</router-link>
     </div>
  </div>
</template>

<script>
  
  import LineChart from './components/LineChart'
  import { getTCRecord } from '@/api/dailyMonitor'
  import mixinswitch from "@/mixins/monitor-switch"
  export default {
    name: 'TotalCholesterol',
    components :{ LineChart },
    mixins: [mixinswitch],
    data(){
       return{
         h:document.documentElement.clientHeight || document.body.clientHeight,
         items:[{ name:'胆固醇',data:[]}],
         min:0,
         max:15,
         interval:3,
         flag:false,
         TCRecord:{
            MonitorList:[],
            CheckTimeList:[],
            MonitorData:null,
            Result:null,
            LastTestTime:null,
            ExamTime:null,
            PersonID:0,
         }
       }
    },
    created(){
       this.getData()
    },
    mounted(){
       this.$refs.healthHeight.style.height = this.h +'px'
    },
    watch: {
      memberId: function(newValue,olodValue) {
        if(newValue > 0 && newValue != olodValue){
          this.getData()
        }
      }
    },
    methods:{
      getData(){
         let that = this
         that.listLoading = true
         getTCRecord().then(response=> {
             that.flag = true
             that.listLoading = false
             let data = response.data
             if(data.IsSuccess){
                that.TCRecord = data.ReturnData
                that.items[0].data = data.ReturnData.MonitorList
             }else {
                 console.log('[ReturnMessage] ' + data.ReturnMessage)
             }
         },error=>{
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