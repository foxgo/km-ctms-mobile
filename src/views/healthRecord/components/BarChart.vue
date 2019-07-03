<template>
  <div :id="elId" class="chart"/>
</template>

<script>
import uuidv1 from 'uuid/v1' // 引入uuid文件
export default {
  name: 'BarChart',
  props: { // 接受父组件传递来的数据
    name: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return []
      }
    },
    xData: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return []
      }
    },
    data: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return []
      }
    }
  },
  data() {
    return {
      elId: ''
    }
  },
  created() {
    this.elId = uuidv1() // 获取随机id
  },
  mounted() {
    // 血压值(最高值，最低值，平均值) 柱形图
    var data = []
    this.data.forEach(el => { // 获取数据
      data.push({
        name: el.name,
        type: 'bar',
        barWidth: '30', // 固定柱子宽度
        data: el.data,
        label: {
          normal: {
            show: true,
            position: 'top',
            color: '#333333'
          }
        },
        showAllSymbol: true

      })
      console.log(data)
    })
    const option = { // 创建图表配置数据
      color: ['#00cbe9', '#6ccc56'],
      title: {
        text: '',
        subtext: ''
      },
      tooltip: { // 提示框
        //   trigger: 'axis',
        show: false
        // formatter: function (params) {
        //    return '';   //去掉提示框
        // },
      },
      legend: {
        show: false,
        data: this.name
      },
      grid: { // echart的上下左右距离
        left: '-12%',
        right: '-6%',
        bottom: '1%',
        containLabel: true
      },
      toolbox: {
        show: false
      },
      calculable: false,
      xAxis: [
        {
          type: 'category',
          data: this.xData,
          show: true, // 不显示x轴，默认是true的
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14
            }
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: data
    }
    // 初始化图表
    const chartObj = this.$echarts.init(document.getElementById(this.elId))
    chartObj.setOption(option)
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .chart
    width:100%
    height:px2rem(220)
    background-color:#fff
    margin-top: 0.4rem
</style>
