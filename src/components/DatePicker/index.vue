<template>
  <div class="picker-box">
    <div @click="showPicker"><span v-if="time">{{ time | localFormatDate }}</span><span v-else>请选择时间</span></div>
    <mt-datetime-picker
      ref="dataPicker"
      :start-date="startDate"
      :end-date="new Date()"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChange"/>
  </div>
</template>

<script>
import { formatDate } from '../../utils/dateFilter.js'

export default {
  name: 'DatePicker',
  filters: {
    localFormatDate(time) {
      return formatDate(time, 'yyyy-MM-dd')
    }
  },
  props:['settingTime','startDate'], // 手动设置显示的时间  new Date('1930-01-01')
  data() {
    return {
      time: null
    }
  },
  watch: {
    settingTime(val) {
      this.time = new Date(val)
    }
  },
  methods: {
    
    showPicker() {
      this.$refs.dataPicker.open()
    },

    handleChange(value) {
      this.time = value
      this.$emit('showTime', formatDate(new Date(this.time), 'yyyy-MM-dd hh:mm:ss')) // 把值传给父级
    }
  }
}
</script>

<style scoped lang="stylus">
.picker-box >>>.picker-toolbar
     bacakground-color:#f2f2f2 !important
     padding:0 5%
     margin:0 auto
.picker-box  >>> .mint-datetime-cancel
    text-align:left
    color:#333
.picker-box >>>.mint-datetime-confirm
    text-align:right
</style>
