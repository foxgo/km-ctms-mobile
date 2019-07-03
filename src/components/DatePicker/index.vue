<template>
  <div class="dataTime">
    <div @click="openPicker"><span v-if="time>0">{{ time | formatDate }}</span><span v-else>请选择时间</span></div>
    <mt-datetime-picker
      ref="picker"
      :start-date="startDate"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChange"/>
  </div>
</template>

<script>
/**
   Auth: liuemeifang
   Created: 2019/3/14
*/

import { formatDate } from '../../filters'
export default {
  name: 'DatePicker',
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      startDate: new Date(),
      time: null
    }
  },
  mounted() {

  },
  methods: {
    openPicker() {
      this.$refs.picker.open()
    },
    handleChange(value) {
      this.time = value
      this.$emit('showTime', formatDate(new Date(this.time), 'yyyy-MM-dd hh:mm:ss')) // 把值传给父级
    }
  }
}
</script>

<style scoped lang="stylus">
.dataTime >>>.picker-toolbar
     bacakground-color:#f2f2f2 !important
     padding:0 5%
     margin:0 auto
.dataTime  >>> .mint-datetime-cancel
    text-align:left
    color:#333
.dataTime >>>.mint-datetime-confirm
    text-align:right
</style>
