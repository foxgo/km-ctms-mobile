<template>
  <div>
    <div class="list">
      <div class="item">
        <div class="item_div borderBottom1">
          <div @click="pushPage(1)">
            <h2>血压监测</h2>
            <p v-if="bloodPressure.Systolic > 0 && bloodPressure.Diastolic > 0">{{bloodPressure.Systolic}}/{{bloodPressure.Diastolic}} mmHg</p>
          </div>
          <img class="listImg" src="@/assets/images/home/addition.png" />
          <!--<svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjiankangpinggu"/>
          </svg>-->
        </div>
      </div>
      <div class="item">
        <div class="item_div borderBottom1">
          <div @click="pushPage(2)">
            <h2>血糖监测</h2>
            <p v-if="bloodSugar.Sugar > 0">{{bloodSugar.Sugar}} mmol/L</p>
          </div>
          <img class="listImg" src="@/assets/images/home/addition.png" />
          <!--<svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjiankangpinggu"/>
          </svg>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLastBloodPressure,getLastBloodSugar } from '@/api/dailyMonitor'
import mixinswitch from "@/mixins/monitor-switch"
export default {
  name: 'HealthTwo',
  mixins: [mixinswitch],
  data() {
    return {
      bloodPressure: {
        Systolic: null,
        Diastolic: null
      },
      bloodSugar: {
        Sugar: null
      }
    }
  },
  created() {
    this.getLastBloodPressure()
    this.getLastBloodSugar()
  },
  watch: {
    memberId: function(newValue,olodValue) {
      if(newValue > 0 && newValue != olodValue){
        this.getLastBloodPressure()
        this.getLastBloodSugar()
      }
    }
  },
  methods: {
    pushPage(index) {
      var pageRoutes = {
        1: '/healthRecord',
        2: 'healthRecord/BloodSugar'
      }

      this.$router.push({ path: pageRoutes[index] })
    },
    getLastBloodPressure() {
      let that = this
      that.listLoading = true
      getLastBloodPressure().then(response => {
        let data = response.data
        if(data.IsSuccess){
          that.bloodPressure = data.ReturnData
        }else{
          console.log('[ReturnMessage] ' + data.ReturnMessage)
        }
        that.flag = true
        that.listLoading = false
      }, error => {
        that.listLoading = false
        console.log('[error] ' + error)
      })
    },
    getLastBloodSugar() {
      let that = this
      that.listLoading = true
      getLastBloodSugar().then(response => {
        let data = response.data
        if(data.IsSuccess){
          that.bloodSugar = data.ReturnData
        }else{
          console.log('[ReturnMessage] ' + data.ReturnMessage)
        }
        that.flag = true
        that.listLoading = false
      }, error => {
        that.listLoading = false
        console.log('[error] ' + error)
      })
  }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .list
    display:flex
    height:px2rem(150)
    box-sizing:border-box
    background-color:#fff
    margin:px2rem(18) auto
    .item
      flex:1
      border:1px solid #eee
      border-left:none
      &> .item_div
        display:flex
        width:100%
        box-sizing:border-box
        height:px2rem(150)
        padding-left:px2rem(20)
        padding-right:px2rem(20)
        align-items:center
        &>svg
          width:px2rem(89)
          height:auto
          text-align:right
        &>div
          flex:1
          text-align:left
          justify-content :center
          &>h2
            margin-top :0px
            margin-bottom :px2rem(10)
        &>img.listImg{
				  width: 0.9rem;
				  height: 0.9rem;
				  padding-right: 0.2rem;
        }
    .item h2
      font-size:px2rem(28px)
      font-weight :bold
      color:#113260
      line-height:px2rem(30)
      margin-bottom:px2rem(16)
      margin-top:px2rem(32px)
    .item p
      font-size:px2rem(24px)
      color:#7b95b8
      line-height:px2rem(34px)
    .borderBottom1
      border-bottom:1px solid #eee
</style>
