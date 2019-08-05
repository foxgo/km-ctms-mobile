<template>
  <div class="picker-box">
    <div @click="showPicker"><span v-if="time>0">{{ time | formatDate }}</span><span v-else>请选择时间</span></div>
    <mt-datetime-picker
      ref="dataPicker"
      :start-date="startDate"
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
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  props:['settingTime'], // 手动设置显示的时间
  data() {
    return {
      startDate: new Date(),
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
