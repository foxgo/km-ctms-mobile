<template>
  <div class="seeLog">
    <h2 @click="open()">查看详细日志<span :class="openFlag? 'icondown': 'iconupward'" class="iconfont icondown"/></h2>
    <div v-if="openFlag">
      <div v-for="(m, index) in value" :key="index" class="log_list">
        <div class="log_time">{{ m.GroupTime | formatDate }}</div>
        <div class="log_detailed">
          <ul>
            <li v-for="(item, index) in m.DetailedRecords" :key="index">
              <p><i class="iconfont icon-time">&#xe69c;</i><span>{{ item.Time | formatTime }}</span></p>
              <p v-if="item.RecordValue"><span>{{ item.ItemType }}</span></p>
              <p v-if="item.RecordValue"><span class="marginRight">{{ item.RecordValue }}mmol/L</span></p>
              <p v-else>血压{{ item.Systolic }}/{{ item.Diastolic }}</p>

              <p
                v-if="item.ResultType"
                :class="{ colorNormal : item.ResultType == '正常', color3 : item.ResultType == '偏高', color4 : item.ResultType == '偏低'}"
              >{{ item.ResultType }}</p>
              <p
                v-else
                :class="{ colorNormal : item.Result == '正常', color2 : item.Result == '正常高值', color3 : item.Result == '轻度', color4 : item.Result == '中度', color5 : item.Result == '重度', color6 : item.Result == '偏低'}"
              >{{ item.Result }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>import { getFormatDate } from '../../../filters'
export default {
  name: 'SeeLog',
  filters: {
    formatDate(time) {
      // var date = new Date(time)
      return getFormatDate(time, 'yyyy-MM-dd')
    },
    formatTime(time) {
      return getFormatDate(time, 'hh:mm')
    }
  }, // 格式化
  props: { // 接受父组件传递来的数据
    value: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return []
      }
    },
    name: {
      type: String,
      default() { // 默认数据，没有数剧的情况下启用
        return ''
      }
    }
  },
  data() {
    return {
      openFlag: true
    }
  },
  methods: {
    data() {

    },
    open: function() {
      this.openFlag = !this.openFlag
    }

  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .marginRight
     padding-right:px2rem(20)
  .seeLog
     margin-top:px2rem(20)
     &>h2
        font-size:px2rem(32)
        height:px2rem(96)
        background-color:#fff
        box-sizing :border-box
        line-height:px2rem(96)
        border-top:1px solid #e2e2e3
        border-bottom:1px solid #e2e2e3
        &>span
           font-size:px2rem(50)
           padding-left:px2rem(20)
           vertical-align :middle
           color:#bdbdbd
     &>div>div>.log_time
        text-align:left
        font-size:px2rem(24)
        color:#999
        height:px2rem(55)
        line-height:px2rem(55)
        margin-left:px2rem(36)
      &>div>div>.log_detailed
        background-color:#fff
        border-top:1px solid #e2e2e3
        &>ul>li
            height:px2rem(95)
            line-height:px2rem(95)
            box-sizing:border-box
            border-bottom:1px solid #e2e2e3
            display:flex
            width:100%
            font-size:px2rem(28)
            &>p
              flex:1
              padding-left:px2rem(31)
              &>span
                 vertical-align :middle
            &>p:nth-child(1)
                text-align:left
            &>p:nth-child(3)
                text-align:right
                padding-right:px2rem(36)
            &>.colorNormal
                color:#00cbe9
            &>.color2
                color:#ffff86
            &>.color3
                color:#ffc635
            &>.color4
                color:#fe8b31
            &>.color5
                color:#ff3b3b
            &>.color6
                color:#50f3f3
  .icon-time
     font-size:px2rem(40)
     padding-right:px2rem(5)
     vertical-align :top
     color:#b5b5b5

</style>
