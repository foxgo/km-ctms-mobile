<template>
  <div :id="elId" class="chart"/>
</template>

<script>
import uuidv1 from 'uuid/v1' // 引入uuid文件
import { getFormatDate } from '@/utils/dateFilter.js'
export default {
  name: 'LineChart',
  props: { // 接受父组件传递来的数据
    yMin: {
      type: Number,
      default() {
        return null
      }
    },
    yMax: {
      type: Number,
      default() {
        return null
      }
    },
    yInterval: {
      type: Number,
      default() {
        return null
      }
    },
    lastTime: {
      type: String,
      default() {
        //return formatDate(new Date(), 'yyyy-MM-dd hh:mm')
        return null
      }
    },
    items: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return [{ name: '', data: [] }, { name: '', data: [] }]
      }
    },
    checkTime: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return []
      }
    }
  },
  data() {
    return {
      elId: '',
      dd: this.lastTime,
      chartObj:null,
      option:{},
      data:[], // 提炼接收到的数据
      name:[]
    }
  },
  computed: {
    ft() {
      return getFormatDate(this.lastTime, 'yyyy-MM-dd hh:mm')
    },
    formatDate() {
      for (var i in this.checkTime) {
        this.checkTime[i] = getFormatDate(this.checkTime[i], 'yyyy-MM-dd hh:mm')
      }
      return this.checkTime
    }
  },
  created() {
    this.elId = uuidv1() // 获取随机id
  },
  watch:{
    items(val){
       this.items  = val
       this.drawLineChart()
    },
    lastTime(val){
      this.lastTime  = val
      this.drawLineChart()
    },
    checkTime(val){
      this.checkTime  = val 
      this.drawLineChart()
    }
  },
  methods: {
    drawLineChart() {
      this.formatDate
      this.ft
      this.data = []
      this.name = []
      this.items.forEach(el => {
        this.data.push(el.data)
        this.name.push(el.name)
      })
      this.option.xAxis.data = this.checkTime
      this.option.title[1].text = this.lastTime != null ? getFormatDate(this.lastTime, 'yyyy-MM-dd hh:mm'):''
      this.option.series[0].name = this.name[0]
      this.option.series[0].data = this.data[0]
      this.option.series[1].name = this.name[1]
      this.option.series[1].data = this.data[1]
      this.chartObj.setOption(this.option)
    }
  },
  mounted() {
    let that = this;
    // 初始化图表
    this.chartObj = this.$echarts.init(document.getElementById(this.elId))
    this.option = { // 创建图表配置数据
      color: ['#0b7cff', '#74cf56', '#428BCA'],
      title: [{
        text: '',
        top: -25,
        left: 'right',
        subtext: ''
      }, {
        text: this.lastTime != null ? getFormatDate(this.lastTime, 'yyyy-MM-dd hh:mm'):'',
        textStyle: {
          color: '#666', // 颜色
          fontWeight: 'normal', // 粗细
          fontSize: 12 // 大小
        },
        left: 'right',
        top: 0,
        subtext: '可左右滑动查看'
      }],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#008dfd',
        formatter: function(params) {
          console.log(params)
          if (params[0].seriesName === '血糖') {
            return params[0].name + '<br/>' + params[1].value + ':' + params[0].value
          } // 判断血糖
          if (params.length > 1) {
            return params[0].name + '<br/>' + params[0].seriesName + ': ' + params[0].data + '<br/>' + params[1].seriesName + ': ' + params[1].data
          } else {
            return params[0].name + '<br/>' + params[0].seriesName + ': ' + params[0].data
          }
        }
      },
      legend: {
        left: 'left',
        data: this.items.name
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '2%',
        top: '24%',
        containLabel: true
      },
      axisPointer: {
        link: [{
          xAxisIndex: [0, 1]
        }]
      },

      dataZoom: [{ // 区域缩放
        show: false,
        type: 'slider',
        xAxisIndex: [0],
        realtime: false,
        start: 30, //  数据窗口范围的起始百分比,表示20%
        end: 100, // 数据窗口范围的结束百分比,表示70%
        bottom: 0,
        showDetail: true,
        height: 20 // 组件高度
      }, {
        // 下面这个属性是里面拖到
        type: 'inside',
        xAxisIndex: [0],
        start: 50,
        end: 100,
        bottom: 0,
        height: 20
      }],
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: this.checkTime
      },

      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        interval: this.yInterval,
        min: this.yMin,
        max: this.yMax,
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        }
      },
      series: [{
        name: this.name[0],
        type: 'line',
        // stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        showAllSymbol: true,
        data: this.data[0]
      }, {
        name: this.name[1],
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        showAllSymbol: true,
        data: this.data[1]
      //  areaStyle: {}
      }]
    }
    this.drawLineChart()
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
.chart
  width:10rem
  height:px2rem(500)
  background-color:#fff
  margin-top: 0.4rem
</style>
