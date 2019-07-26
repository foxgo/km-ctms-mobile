<template>
  <div ref="manualH" class="manual_bg">
    <ul class="manual_ul">
      <li>
        <div class="text-tit"><span>*</span>时间段</div>
        <select-code :slot-data="sugarType" :selected-value="bloodSugar.SugarType" text-name="ItemName" value-name="ItemCode" @change="onChange"/>
        <div class="company"><i class="iconfont">&#xe64a;</i></div>
      </li>
      <li>
        <div class="text-tit"><span>*</span>血糖值</div>
        <div class="text-input">
          <input v-model="bloodSugar.Sugar" type="number">
        </div>
        <div class="company">mmol/L</div>
      </li>
      <li>
        <div class="text-tit"><span>*</span>测量时间</div>
        <date-picker class="text-input" @showTime="showTime"/>
        <div class="company"><i class="iconfont">&#xe64a;</i></div>
      </li>
    </ul>
    <input type="submit" class="manual-btn" value="保存" @click="saveData" >
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import DatePicker from '@/components/DatePicker'
import SelectCode from '@/components/SelectCode'
import { saveBloodSugar } from '@/api/dailyMonitor'
import { initDict } from '@/utils/index'
export default {
  name: 'BloodPressureManual',
  components: { DatePicker, SelectCode },
  data() {
    return {
      sugarType: [{
        flex: 1,
        values: [],
        className: 'slot1',
        defaultIndex: 0
      }],
      bloodSugar: {
        SugarTypeList: null,
        Sugar: null,
        ExamTime: null
      }
    }
  },
  mounted() {
    // 修改导航标题
    this.$store.state.app.pageTitle = '手动输入血糖';
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const promises = []
      this.dictIds = ['CM37.09']
      const promiseDict = initDict(this.$store, this.dictIds)
      if (promiseDict) {
        promises.push(promiseDict)
      }
      if (promises.length > 0) {
        Promise.all(promises).then(() => {
          this.setDict();
        })
      } else {
        this.setDict();
      }
    },
    setDict() {
       this.sugarType[0].values = this.$store.state.dict.items.filter(item => item.ItemType === 'CM37.09');
    },
    onChange: function(value) {
      this.bloodSugar.SugarType = value.ItemCode;
    },
    showTime(time) {
      this.bloodSugar.ExamTime = time
    },
    saveData() {
      let that = this;
      if (that.bloodSugar.Sugar == null || that.bloodSugar.ExamTime == null) {
          Toast('不能为空');
          return;
      }
      saveBloodSugar(that.bloodSugar).then(response => {
        let data = response.data;
        if (data.IsSuccess) {
              Toast({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            });
            that.$router.push({path:"/healthRecord/BloodSugar"});
          }else{
             Toast(data.ReturnMessage);
        }
        console.log(that.bloodSugar);
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
     margin-top: 40px
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
