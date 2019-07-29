<template>
    <div class="page-section health-statistics normal-page-box clearfix">
        <div class="tabs-wrap clearfix">
            <ul class="tabs-header flex-container">
                <li :class="{'flex-1': true, 'active': item.value === type}" v-for="(item, index) in tabs" v-html="item.text" @click="switchTabs(item.value)"></li>
            </ul>

            <div class="tabs-main">
                <div class="chart-wrap">
                    <div class="chart-title">摄入卡路里</div>

                    <div class="chart-ele" id="chart-1"></div>
                </div>

                <div class="chart-wrap">
                    <div class="chart-title">喝水杯数</div>

                    <div class="chart-ele" id="chart-2"></div>
                </div>

                <div class="chart-wrap">
                    <div class="chart-title">行走步数</div>

                    <div class="chart-ele" id="chart-3"></div>
                </div>

                <div class="chart-wrap">
                    <div class="chart-title">睡眠时间</div>

                    <div class="chart-ele" id="chart-4"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const tabs = [
        {
            key: "date",
            text: "日",
            value: 0
        },
        {
            key: "week",
            text: "周",
            value: 1
        },
        {
            key: "month",
            text: "月",
            value: 2
        }
    ];

    let chart1, chart2, chart3, chart4;

    export default {
        data() {
            return {
                tabs,
                type: 0
            };
        },
        computed: {},
        components: {},
        beforeCreate() {},
        mounted() {
            this.$root.setPageTitle("统计");

            this.initChart();
        },
        methods: {
            // 初始化 图表
            initChart() {
                let dom1 = document.getElementById("chart-1");
                let dom2 = document.getElementById("chart-2");
                let dom3 = document.getElementById("chart-3");
                let dom4 = document.getElementById("chart-4");

                chart1 = this.$echarts.init(dom1);
                chart2 = this.$echarts.init(dom2);
                chart3 = this.$echarts.init(dom3);
                chart4 = this.$echarts.init(dom4);

                this.switchTabs(this.type);
            },
            //切换
            switchTabs(type) {
                this.type = type;

                this.draw();
            },
            //获取格式化数据
            formatChartData(obj) {
                let data = {
                    category: Object.keys(obj),
                    values: Object.values(obj)
                };

                return data;
            },
            //绘制图表
            draw() {
                this.$ajax({
                    type: "get",
                    apiType: 1,
                    request: {
                        name: "getHealthDataStatistics"
                    },
                    data: {
                        type: this.type
                    }
                }).then((res) => {
                    let {DietData, DrinkData, SleepData, StepsData} = res.Data;

                    this.drawLineChart(chart1, this.formatChartData(DietData));
                    this.drawLineChart(chart2, this.formatChartData(DrinkData));
                    this.drawLineChart(chart3, this.formatChartData(StepsData));
                    this.drawLineChart(chart4, this.formatChartData(SleepData));
                });
            },
            // 绘制 折线图表
            drawLineChart(chart, data) {
                let textColor = "#666";
                let lineColor = "#2283f5";
                let lineStyle = {
                    color: "#e0e0e0",
                    width: 1,
                    type: "solid"
                };

                let option = {
                    grid: {
                        show: true,
                        top: "10px",
                        right: "40px",
                        bottom: "20px",
                        left: "40px",
                        borderColor: "transparent"
                    },
                    tooltip: {
                        show: true,
                        trigger: "axis",
                        formatter: (array) => {
                            let obj = array[0];

                            return `${obj.name}: ${obj.data}`;
                        }
                    },
                    xAxis: {
                        type: "category",
                        data: data.category,
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: textColor
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: textColor
                        },
                        splitLine: {
                            lineStyle
                        }
                    },
                    series: [{
                        data: data.values,
                        type: "line",
                        symbol: "circle",
                        symbolSize: 6,
                        itemStyle: {
                            color: lineColor
                        },
                        lineStyle: {
                            color: lineColor,
                            width: 2,
                            type: "solid"
                        },
                        smooth: false
                    }]
                };

                chart.setOption(option);
            }
        }
    }
</script>

<style scoped>
</style>
