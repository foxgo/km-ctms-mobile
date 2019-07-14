<template>
    <div class="page-section disease-distribution">
        <div class="map-wrap">
            <div id="map" class="bfc"></div>

            <div class="map-bar">
                <ul class="gender-switch clearfix">
                    <li v-for="item in genderMap" @click="genderSwitch(item)">
                        <i :class="[gender === item.key ? item.activeIcon: item.icon]" />
                    </li>
                </ul>

                <div class="map-location clearfix" v-if="showIllList">
                    <i class="icon-location" /> 您的居住地
                </div>

                <ul class="map-legend clearfix" v-else>
                    <li v-for="item in legend">
                        <span class="legend-bar" :style="{backgroundColor: item.color}"></span>

                        <span class="inline-block vertical-middle font-size-base" v-html="item.text"></span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="rank-wrap" v-if="showIllList">
            <div class="rank-header">
                <h5 class="font-size-large text-strong text-nowrap mrg-b">{{data.province}}疾病排名</h5>

                <p class="font-size-base">（按致死率从高到低排列）</p>
            </div>

            <ul class="rank-list clearfix">
                <li class="text-ellipsis" v-for="(item, index) in illList">
                    <a class="font-size-base" href="javascript:" @click="illHandle(item)">{{index + 1}}、{{item.Name}}</a>
                </li>
            </ul>
        </div>

        <div class="rank-wrap" v-else>
            <div class="rank-header">
                <h5 class="font-size-large text-strong text-nowrap mrg-b">{{data.diseaseName}}地理分布排名</h5>

                <p class="font-size-base">按致死率从高到低</p>
            </div>

            <ul class="rank-list clearfix">
                <li class="text-ellipsis" v-for="(item, index) in provinceList">
                    <a class="font-size-base" href="javascript:" @click="provinceHandle(item)">{{index + 1}}、{{item.Name}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import "@/assets/js/js-map/jsMap-4.1.0.js";
    import Hammer from "@/assets/js/hammer";

    import areaMapData from "@/data/areaData_v2";
    import icon from "@/assets/images/icons/location.png";
    import genderMap from "@/map/gender";

    const legend = {
        "1": {
            key: "veryLower",
            text: "很低",
            color: "#00ca69",
            value: 1
        },
        "2": {
            key: "lower",
            text: "低",
            color: "#a9e000",
            value: 2
        },
        "3": {
            key: "veryLower",
            text: "中",
            color: "#ffae00",
            value: 3
        },
        "4": {
            key: "high",
            text: "高",
            color: "#ff7c7c",
            value: 4
        },
        "5": {
            key: "veryHigh",
            text: "很高",
            color: "#ff0000",
            value: 5
        }
    };
    const baseFillColor = "#d6d6d6";
    const clickFillColor = "#a5d4ff";
    const areaData = areaMapData.iosProvinces;

    let transform = {
        translate: {
            x: 0,
            y: 0
        },
        scale: 1
    };
    let startX = 0;
    let startY = 0;
    let scale = 1;
    let mapData;
    let el;
    let mc;

    export default {
        data() {
            return {
                genderMap,
                legend,
                gender: "male",
                illList: [],
                provinceList: [],
                showIllList: true,
                data: {
                    province: "",
                    provinceCode: "", //广东
                    diseaseName: ""
                }
            };
        },
        mounted() {
            this.$root.setPageTitle("疾病地理功能");

            this.init();
            this.bindEvents();

            this.getCurrentProvince().then(() => {
                this.getIllnessList();
            });
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
            //绑定事件
            bindEvents() {
                el = document.querySelector("#map");
                mc = new Hammer.Manager(el);

                mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));
                mc.add(new Hammer.Pinch({threshold: 0})).recognizeWith([mc.get("pan")]);

                mc.on("panstart panmove", this.onPan);
                mc.on("pinchstart pinchmove", this.onScale);
            },
            //拖动
            onPan(e) {
                if(e.type == "panstart") {
                    startX = transform.translate.x;
                    startY = transform.translate.y;
                }

                transform.translate = {
                    x: startX + e.deltaX,
                    y: startY + e.deltaY
                };

                this.updateElementTransform();
            },
            //缩放
            onScale(e) {
                if(e.type == "pinchstart") {
                    scale = transform.scale || 1;
                }

                transform.scale = scale * e.scale;

                this.updateElementTransform();
            },
            //更新
            updateElementTransform() {
                let value = [
                    "translate3d(" + transform.translate.x + "px, " + transform.translate.y + "px, 0)",
                    "scale(" + transform.scale + ", " + transform.scale + ")"
                ];

                value = value.join(" ");

                el.style.webkitTransform = value;

                el.style.mozTransform = value;

                el.style.transform = value;
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
                        basicColor: "#000",
                        clickColor: "#000"
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
            //根据手机号获取所在省
            getCurrentProvince() {
                let self = this;

                let callback = (province) => {
                    let options = {
                        selected: [province],
                        marker: {
                            disabled: false,
                            icon,
                            data: [province],
                            click: function(id, name) {
                                self.provinceClickHandle(id, name);
                            }
                        }
                    };

                    this.configMap(options);
                };

                return this.$ajax({
                    type: "get",
                    request: {
                        name: "getCurrentAddress"
                    },
                    data: {},
                    needReject: true
                }).then((res) => {
                    let obj = res.ReturnData;

                    if(!obj.Province) {
                        obj = {
                            Province: "广东",
                            ProvinceID: "440000000000"
                        };
                    }

                    let current = this.getProvinceMapDataByName(obj.Province);

                    this.data = {
                        ...this.data,
                        province: obj.Province,
                        provinceCode: obj.ProvinceID,
                        diseaseName: ""
                    };

                    callback(current.key);
                }, () => {
                    let obj = this.getProvinceMapDataByName("广东省");

                    this.data = {
                        ...this.data,
                        province: "广东",
                        provinceCode: "440000000000", //广东
                        diseaseName: ""
                    };

                    callback(obj.key);
                });
            },
            //请求数据
            getIllnessList() {
                this.$ajax({
                    type: "get",
                    request: {
                        name: "getIllnessList"
                    },
                    data: {
                        gender: this.gender,
                        province: this.data.provinceCode
                    },
                    showLoading: false
                }).then((res) => {
                    this.illList = res.ReturnData;
                });
            },
            //性别切换
            genderSwitch(item) {
                this.gender = item.key;
            },
            //点击省份地图
            provinceClickHandle(id, name) {
                let province = areaData.find(n => {
                    return n.value.indexOf(name) !== -1;
                });

                this.data = {
                    ...this.data,
                    province: province.value,
                    provinceCode: province.id
                };

                this.showIllList = true;
                this.getIllnessList();

                this.configMap({
                    selected: [id]
                });
            },
            //点击疾病
            illHandle(item) {
                this.$ajax({
                    type: "get",
                    request: {
                        name: "getProvinceList"
                    },
                    data: {
                        gender: this.gender,
                        illness: item.Code
                    },
                    showLoading: false
                }).then((res) => {
                    this.data = {
                        ...this.data,
                        diseaseName: item.Name
                    };

                    this.setProvinceLevel(res.ReturnData);
                });
            },
            //点击列表里的省份名称
            provinceHandle(item) {
                let obj = this.getProvinceMapDataByName(item.Name);
                this.data = {
                    ...this.data,
                    province: item.Name,
                    provinceCode: item.Code
                };

                this.showIllList = true;

                this.configMap({
                    selected: [obj.key]
                });

                this.getIllnessList();
            },
            //根据名称获取省份简称
            getProvinceMapDataByName(name) {
                let obj;

                for(let pro in mapData.china) {
                    let item = mapData.china[pro];

                    if(name.indexOf(item.name) !== -1) {
                        obj = {
                            key: pro,
                            ...item
                        };
                        break;
                    }
                }

                return obj;
            },
            //根据数据显示省份颜色
            setProvinceLevel(data) {
                let array = [];
                let index = 0;
                let fill = {
                    basicColor: {},
                    hoverColor: {},
                    clickColor: {}
                };

                data.forEach(n => {
                    let obj = this.getProvinceMapDataByName(n.Name);
                    let {key} = obj;
                    let color = this.$utils.getMapProp(legend, n.Level, "color");


                    fill.basicColor[key] = color;
                    fill.hoverColor[key] = color;
                    fill.clickColor[key] = color;
                });

                this.provinceList = data;

                this.showIllList = false;

                this.configMap({
                    fill
                });
            }
        }
    }
</script>

<style scoped></style>
