<template>
    <div class="page-section normal-page-box common-disease-section clearfix" v-if="loadComplete">
        <div class="disease-wrap">
            <!--<div class="people-body"></div>-->
            <div :class="{'people-body': true, female: $utils.getMapKey(genderMap, gender) === 'female'} "></div>

            <div class="left-disease-list">
                <div class="disease-item" :style="getItemStyle(item)" v-for="item in leftDataItems" @click="tap(item)">
                    <div class="disease-tag">
                        <i :class="['disease-tag-icon', item.icon]" />

                        <div class="disease-tag-label" v-html="item.name"></div>
                    </div>

                    <div class="disease-line" :style="getLineStyle(item)"></div>
                </div>
            </div>

            <div class="right-disease-list">
                <div class="disease-item" :style="getItemStyle(item)" v-for="item in rightDataItems" @click="tap(item)">
                    <div class="disease-tag">
                        <i :class="['disease-tag-icon', item.icon]"  />

                        <div class="disease-tag-label" v-html="item.name"></div>
                    </div>

                    <div class="disease-line" :style="getLineStyle(item)"></div>
                </div>
            </div>

            <div class="gender-switch">
                <a :class="{'switch-btn': true, active: gender == item.value}" v-for="item in genderMap" @click="genderSwitch(item)">{{item.text}}性</a>
            </div>

            <div class="mrg-t-xxl">
                <router-link class="link-btn" :to="{name: 'lifeCycle', query: {age: data.age, gender: data.gender}}">生命周期健康建议</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import genderMap from "@/map/h5-gender";
    import diseaseData from "@/data/common-disease";

    export default {
        data() {
            return {
                genderMap,
                loadComplete: false, //是否已加载
                leftDataItems: [],
                rightDataItems: [],
                gender: "1", // male female
                data: {}
            }
        },
        computed: {
            age() {
                return this.$route.query.age;
            },
            sex() {
                return this.$route.query.gender;
            }
        },
        components: {},
        mounted() {
            this.$root.getPersonInfo().then((data) => {
                let json = {
                    age: data.Age,
                    gender: data.Gender
                };

                if(typeof this.age !== "undefined" && typeof this.sex !== "undefined") {
                    json = {
                        age: this.age,
                        gender: this.sex
                    };
                }

                let result = this.$utils.getPeriod(json);
                let period = result.pageData.period;
                json.period = period;
                this.gender = json.gender;
                this.data = json;

                this.$root.setPageTitle(`${period}常见疾病`);

                this.fetch(json);
            });
        },
        methods: {
            //获取item 的top
            getItemStyle(item) {
                let style = {};

                if(item.top) {
                    style.top = this.px2rem(item.top);
                }

                return style;
            },
            //获取线条 的top
            getLineStyle(item) {
                let style = {
                    width: "0px"
                };

                if(item.lineTop) {
                    style.top = this.px2rem(item.lineTop);
                }

                if(item.lineWidth) {
                    style.width = this.px2rem(item.lineWidth);
                }

                return style;
            },
            //单位转换
            px2rem(px) {
                let perRem = 75;
                let rem = px / perRem;

                return `${rem}rem`;
            },
            //点击
            tap(item) {
                let router = {
                    name: "diseaseEncyclopedia",
                    query: {
                        id: item.id
                    }
                };

                if(!item.id) {
                    this.$toast("暂无该疾病介绍");

                    return;
                }

                this.$goto(router);
            },
            //性别切换
            genderSwitch(item) {
                this.gender = item.value;

                this.data = {
                    ...this.data,
                    gender: this.gender
                };

                this.fetch();
            },
            //获取匹配的疾病
            getMatchDisease(dataItems, names, ids) {
                let array = [];

                dataItems.forEach(n => {
                    let index = names.indexOf(n.name);

                    if(index !== -1) {
                        array.push({
                            ...n,
                            id: ids[index]
                        });
                    }
                });

                return array;
            },
            //获取数据
            fetch() {
                let data = {
                    ...this.data
                };

                this.$ajax({
                    type: "get",
                    request: {
                        name: "getCommonDisease"
                    },
                    data
                }).then((res) => {
                    let names = res.ReturnData.map(n => n.Name);
                    let ids = res.ReturnData.map(n => n.BatDeseaseID);
                    let key = this.$utils.getMapKey(genderMap, data.gender);
                    let diseaseList = diseaseData[key];

                    this.leftDataItems = this.getMatchDisease(diseaseList.leftData, names, ids);

                    this.rightDataItems = this.getMatchDisease(diseaseList.rightData, names, ids);
                }).finally(() => {
                    this.loadComplete = true;
                });
            }
        }
    }
</script>

<style></style>
