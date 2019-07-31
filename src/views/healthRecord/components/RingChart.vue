<template>
  <div :id="elId" class="chart" />
</template>

<script>
import uuidv1 from 'uuid/v1' // 引入uuid文件
export default {
  name: 'LineChart',
  props: { // 接受父组件传递来的数据
    name: {
      type: String,
      default() { // 默认数据，没有数剧的情况下启用
        return 0 + '次测量'
      }
    },
    value: {
      type: Array,
      default() { // 默认数据，没有数剧的情况下启用
        return []
      }
    }
  },
  data() {
    return {
      elId: '',
      chartObj:null,
      option:{},
      getColor:['#00cbe9', '#ffc635', '#fe8b31', '#ff3b3b', '#ffff86', '#50f3f3'] //  正常 偏高 偏低 正常 正常高值  重度  中度 轻度
    }
  },
  watch:{
     name(val){
       this.drawARing(val,'')
     },
    value(val){
      this.drawARing('',val)
    }
  },
  created() {
    this.elId = uuidv1() // 获取随机id
  },
  methods: {
    drawARing(name='',value='') {
      this.name = name !='' ? name:this.name
      this.value = value !='' ? value: this.value
      // 测量圆环
      var data = [] // 获取数据
      for (let i = 0; i < this.value.length; i++) {
        data[i] = Object.assign({ value: this.value[i], name: '', itemStyle: { normal: { color: this.getColor[i] }}})
      }
      console.log('data:' + this.value)
      this.option.series[0].name = this.name
      this.option.series[0].data = data
      this.chartObj.setOption(this.option)
    }
  },
  mounted() {
    // 初始化图表
    this.chartObj = this.$echarts.init(document.getElementById(this.elId))

    this.option = { // 创建图表配置数据
      tooltip: {
        show: false,
        trigger: 'item'
      },
      legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data: ['', '', '']
      },
      grid: { // echart的上下左右距离
        left: '1%',
        right: '2%',
        bottom: '1%',
        containLabel: true
      },
      series: [
        {
          name: this.name, // 12次\n测量
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['60%', '90%'], // 内圆和外圆大小百分比
          x: 0,
          y: 0,
          avoidLabelOverlap: false,
          legedHoverLink: false, hoverAnimation: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              fontSize: '14',
              formatter: '{a}',
              color: '#333333'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[]
        }
      ]
    }
    this.drawARing()
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .chart
    width:px2rem(220)
    height:px2rem(220)
    background-color:#fff
    margin-top: 0.4rem
</style>
