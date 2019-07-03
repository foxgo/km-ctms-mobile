<template>
  <div class="list_health" @click="pushPage()">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#iconjiankangdangan"/>
    </svg>
    <div>健康档案</div>
    <div ref="healthChart" class="chartWidth" />
  </div>
</template>

<script>
export default {
  name: 'ListHealth',
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.$refs.healthChart.resize()
      })()
    }// echart自适应
    this.drawLine()
  },
  methods: {
    pushPage() {
      this.$router.push({ path: '/healthArchives' })
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.healthChart)
      // 绘制图表
      var e = 80
      this.myChart.setOption({
        title: {
          show: true,
          text: e + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: '50%',
            color: '#008dfd',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
          {
            name: '',
            type: 'pie',
            radius: ['65%', '85%'],
            itemStyle: { color: '#008dfd' },
            avoidLabelOverlap: true,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: e, name: '' },
              { value: 100 - e, name: '', itemStyle: { normal: { opacity: 0 }}}
            ]
          }

      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .chartWidth
      width:107px
      height:px2rem(120px)
  .list_health
       height:px2rem(200px)
       line-height:px2rem(200px)
       border:1px solid #eee
       border-left:none
       border-right:none
       background:#fff
       display:flex
       align-items:center
    &>svg
       width:px2rem(97px)
       height:px2rem(82px)
       flex:1
       vertical-align:middle
    &>div
      font-family :rzgfFont
      font-style: italic
      font-size:px2rem(60px)
      font-weight:bold
      color:#008dfd
      flex:1
</style>
