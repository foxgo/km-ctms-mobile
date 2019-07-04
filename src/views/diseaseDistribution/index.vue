<template>
    <div class="page-section disease-distribution">
        <div class="map-wrap">
            <div id="map" class="bfc"></div>

            <div class="map-bar">
                <ul class="gender-switch clearfix">
                    <li v-for="item in gender" @click="genderSwitch(item)">
                        <i :class="{[item.icon]: true, [item.activeIcon]: data.gender === item.value}" />
                    </li>
                </ul>

                <div class="map-location clearfix" v-if="showRankList">
                    <i class="icon-location" /> 您的居住地
                </div>

                <ul class="map-legend clearfix" v-else>
                    <li v-for="item in legend">
                        <span class="legend-bar" :style="{backgroundColor: item.color}"></span>

                        <span class="inline-block vertical-middle" v-html="item.text"></span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="rank-wrap" v-if="showRankList">
            <div class="rank-header">
                <h5 class="font-size-medium text-strong mrg-b-sm">{{data.province}}省疾病排名</h5>

                <p class="text-mute font-size-small">按致死率从高到低</p>
            </div>

            <ul class="rank-list clearfix">
                <li v-for="(item, index) in rankData">
                    <a class="text-info" href="javascript:" @click="rankHandle">{{index + 1}}、{{item.text}}</a>
                </li>
            </ul>
        </div>

        <div class="rank-wrap" v-else>
            <div class="rank-header">
                <h5 class="font-size-medium text-strong mrg-b-sm">{{data.diseaseName}}地理分布排名</h5>

                <p class="text-mute font-size-small">按致死率从高到低</p>
            </div>

            <ul class="rank-list clearfix">
                <li v-for="(item, index) in diseaseProvinceList">
                    <a class="text-info" href="javascript:" @click="rankHandle(item)">{{index + 1}}、{{item.text}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import "@/assets/js/js-map/jsMap-4.1.0.js";
    import icon from "@/assets/images/icons/location.png";

    import gender from "@/map/gender";

    const legend = {
        "0": {
            key: "veryLower",
            text: "很低",
            color: "#00ca69",
            value: 0
        },
        "1": {
            key: "lower",
            text: "低",
            color: "#a9e000",
            value: 1
        },
        "2": {
            key: "veryLower",
            text: "中",
            color: "#ffae00",
            value: 2
        },
        "3": {
            key: "high",
            text: "高",
            color: "#ff7c7c",
            value: 3
        },
        "4": {
            key: "veryHigh",
            text: "很高",
            color: "#ff0000",
            value: 4
        }
    };

    let rankData = [
        {
            text: "老年痴呆",
            value: 0
        },
        {
            text: "乳腺癌",
            value: 1
        },
        {
            text: "主动脉瘤",
            value: 2
        },
        {
            text: "心肌炎",
            value: 3
        }
    ];

    rankData = rankData.concat(rankData);

    const baseFillColor = "#d6d6d6";
    const clickFillColor = "#a5d4ff";
    let mapData;

    export default {
        data() {
            return {
                gender,
                rankData,
                legend,
                showRankList: true,
                diseaseProvinceList: [],
                data: {
                    gender: 0,
                    province: "广东",
                    diseaseName: ""
                }
            };
        },
        mounted() {
            this.$root.setPageTitle("疾病地理功能");

            this.fetch();

            this.init();
        },
        methods: {
            //初始化
            init() {
                // 默认地图宽度是 900px
                jsMap.getJSON("/static/js/js-map/data/china.json", (mapJSON) => {
                    mapData = mapJSON;

                    this.configMap();
                });
            },
            //配置地图
            configMap(option) {
                let self = this;
                let size = document.getElementById("app").clientWidth;

                let options = Object.assign({
                    name: "china",
                    width: size,
                    height: size + "px",
                    fill: {
                        basicColor: baseFillColor,
                        hoverColor: "#feb41c",
                        clickColor: clickFillColor
                    },
                    zoom: {
                        disabled: true,
                        max: 5,
                        zoomRange: true,
                        wheelZoom: true
                    },
                    selected: ["guangdong"],
                    areaName: {
                        show: true,
                        size: 12,
                        basicColor: "#333",
                        clickColor: "#333"
                    },
                    // 禁用默认交互效果
                    // 此时只有点击标注图标才会有事件触发[ 禁用的地区不会触发点击事件 ]
                    defaultInteractive: true,
                    marker: {
                        disabled: false,
                        icon,
                        data: ["guangdong"],
                        click: function(id, name) {
                            self.provinceClickHandle(id, name);
                        }
                    },
                    clickCallback: function(id, name) {
                        self.provinceClickHandle(id, name);
                    }
                }, option);

                jsMap.config("#map", mapData, options);
            },
            //请求数据
            fetch() {
                this.$ajax({
                    type: "post",
                    request: {
                        name: "GetDictionary"
                    },
                    data: {
                        ab: 12
                    }
                }).then((res) => {
                     console.log(res);
                });
            },
            //性别切换
            genderSwitch(item) {
                this.data = {
                    ...this.data,
                    gender: item.value
                };
            },
            //点击省份地图
            provinceClickHandle(id, name) {
                 this.data = {
                     ...this.data,
                     province: name
                 };

                 this.showRankList = true;

                 this.configMap({
                     selected: [id]
                 });
            },
            //点击疾病
            rankHandle(item) {
                // 默认地图宽度是 900px
                jsMap.getJSON("/static/js/js-map/data/china.json", (mapJSON) => {
                    let array = [];
                    let index = 0;
                    let fill = {
                        basicColor: {},
                        hoverColor: {},
                        clickColor: {}
                    };

                    for(let pro in mapJSON.china) {
                        let obj = mapJSON.china[pro];
                        let color = this.$utils.getMapProp(legend, index, "color");

                        array.push({
                            text: obj.name,
                            rank: index
                        });

                        fill.basicColor[pro] = color;
                        fill.hoverColor[pro] = color;
                        fill.clickColor[pro] = color;

                        index++;

                        if(index >= 5) {
                            index = 0;
                        }
                    }

                    array = array.sort((a, b) => {
                        return b.index - a.index;
                    });

                    this.data = {
                        ...this.data,
                        diseaseName: item.text
                    };

                    this.diseaseProvinceList = array;

                    this.showRankList = false;

                    this.configMap({
                        fill
                    });
                });
            }
        }
    }
</script>

<style scoped></style>
