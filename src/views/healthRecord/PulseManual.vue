<template>
  <div ref="manualH" class="manual_bg normal-page-box">
    <ul class="manual_ul">
      <li>
        <div class="text-tit"><span>*</span>心率</div>
        <div class="text-input"><input v-model="heartRate.Rate" type="number"></div>
        <div class="company">次/分</div>
      </li>
      <li>
        <div class="text-tit"><span>*</span>测量时间</div>
        <date-picker class="text-input" @showTime="showTime"/>
        <div class="company"><i class="iconfont">&#xe64a;</i></div>
      </li>
    </ul>
    <input type="submit" class="manual-btn" value="保存" @click="saveData">
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import DatePicker from '@/components/DatePicker'
import SelectCode from '@/components/SelectCode'
import { saveHeartRate } from '@/api/dailyMonitor'
export default {
  name: 'BloodPressureManual',
  components: { DatePicker, SelectCode },
  data() {
    return {
      heartRate: {
        Rate: null,
        ExamTime: null
      }
    }
  },
  mounted() {
    // 修改导航标题
    this.$store.state.app.pageTitle = '手动输入心率'
  },
  methods: {
    showTime(time) {
      this.heartRate.ExamTime = time
    },
    saveData() {
      let that = this;
      if (that.heartRate.Rate == null || that.heartRate.ExamTime == null) {
          Toast('不能为空');
          return;
      }
      saveHeartRate(that.heartRate).then(response => {
        let data = response.data;
        if (data.IsSuccess) {
              Toast({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            });
            that.$router.push({path:"/healthRecord/Pulse"});
          }else{
             Toast(data.ReturnMessage);
        }
        that.listLoading = false;
      }, error => {
        console.log('[error] ' + error); // for debug
        that.listLoading = false;
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .manual_bg
     background-color: #f5f5f5
     padding-top:px2rem(20)
     &>ul
       background: #ffffff
       border-top:1px solid #ebebeb
       &>li
          border-bottom:1px solid #ebebeb
          display:flex
          box-sizing:border-box
          padding-left: 3%
          padding-right:3%
          height:px2rem(88)
          line-height:px2rem(88)
          &>div
              text-align:left
          &>div.text-tit
              font-size:px2rem(30)
              flex:1
              color:#333
              &>span
                 color:#ff4925
          &>div.text-input
              width:70%
              padding-right:3px
              text-align:right
              &>input
                  width:100%
                  height:90%
                  margin-top:-2px
                  font-size:px2rem(30)
                  line-height:0
                  text-align:right
          &>div.company
              text-align:right
              width:10%
              color: #999999
              font-size:px2rem(24)
  .manual-btn
    color:#fff
    width: 80%
    margin:30px auto
    height:px2rem(80)
    text-align:center
    line-height:px2rem(80)
    border-radius :120px
    border:1px solid #008dfd
    background:#008dfd
    font-size:px2rem(32)
</style>
