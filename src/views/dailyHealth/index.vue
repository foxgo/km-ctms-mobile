<template>
    <div class="page-section daily-health clearfix">
        <router-link class="km-header-bar" :to="{name: 'healthStatistics'}">统计</router-link>

        <div class="full-height flex-container flex-direction-column">
            <div class="flex-1 daily-main">
                <div class="date-choose-wrap" v-if="today">
                    <a class="arrow-btn km-arrow-left" href="javascript:" @click="getPrevDate"></a>

                    <router-link class="vertical-middle" :to="{name: 'dateChoose'}" v-html="date">2016-08-23</router-link>

                    <a :class="{'arrow-btn km-arrow-right': true, 'disabled': today === date}" href="javascript:" @click="getNextDate"></a>
                </div>

                <div class="module-wrap">
                    <div class="module-title">每日健康指标</div>

                    <router-link class="module-bar clearfix" :to="{name: 'foodDetail'}">
                        <span class="inline-block fr text-mute font-size-small">饮食详情  <i class="icon-arrow-right" /></span>

                        <i class="icon-diet" /> <span class="vertical-middle">饮食记录</span>
                    </router-link>

                    <div class="module-con clearfix">
                        <div class="col-fixed-5">
                            <p class="text-body-primary">
                                <strong class="text-strong text-body-second font-size-big" v-html="data.CaloriesIntake">0</strong> 卡路里
                            </p>

                            <p class="mrg-t-md font-size-small text-mute">
                                今日已摄入
                            </p>
                        </div>

                        <div class="col-fixed-7">
                            <div class="inline-block clearfix" @click="addDiet">
                                <i class="icon-camera" />

                                <p class="mrg-t-md font-size-small text-mute">
                                    录入今日食物
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-wrap">
                    <div class="module-bar clearfix">
                        <i class="icon-water" /> <span class="vertical-middle">喝水记录</span> <i class="icon-help vertical-top" @click="waterDesc"/>
                    </div>

                    <div class="module-con clearfix">
                        <a class="icon-min water-op-btn mrg-r-lg" href="javascript:" @click="changeDrinkingWater('reduce')" v-if="data.DrinkingWater"></a>

                        <a class="icon-min-off water-op-btn mrg-r-lg disabled" href="javascript:" v-else></a>

                        <i class="mrg-r icon-glass"/>

                        <span class="mrg-r text-mute">x</span>

                        <span class="mrg-r-lg text-mute" v-html="data.DrinkingWater">0</span>

                        <a class="water-op-btn icon-plus" href="javascript:" @click="changeDrinkingWater('add')"></a>
                    </div>
                </div>

                <div class="module-wrap">
                    <div class="module-bar clearfix" @click="updateSteps">
                        <span class="inline-block fr text-mute font-size-small"><i class="icon-arrow-right" /></span>

                        <i class="icon-foot" /> <span class="vertical-middle">步数记录</span>
                    </div>

                    <div class="module-con clearfix">
                        <div class="col-fixed-5">
                            <p class="text-body-primary">
                                <strong class="text-strong text-body-second font-size-big" v-html="data.WalkSteps">0</strong> 步
                            </p>
                        </div>

                        <div class="col-fixed-7">
                            <p class="font-size-small text-body-primary clearfix">
                                {{data.WalkingDistance}}公里/{{data.CaloriesConsume}}千卡
                            </p>
                        </div>
                    </div>
                </div>

                <div class="module-wrap">
                    <router-link class="module-bar clearfix" :to="{name: 'sleepInput'}">
                        <span class="inline-block fr text-mute font-size-small"><span class="text-strong font-size-big text-body-second" v-html="data.SleepHours">0</span> <span>小时</span> <i class="icon-arrow-right" /></span>

                        <i class="icon-sleep" /> <span class="vertical-middle">睡眠记录</span>
                    </router-link>
                </div>

                <div class="module-wrap mrg-b-0">
                    <div class="module-bar clearfix">
                        <div class="inline-block fr text-mute font-size-small">
                            <span :class="['mrg-l', data.Mood === item.value ? item.activeIcon : item.icon]" v-for="item in moodMap" @click="setMood(item)"></span>
                        </div>

                        <i class="icon-mood" /> <span class="vertical-middle">心情</span>
                    </div>

                    <div class="module-con clearfix">
                        <router-link class="text-primary font-size-medium" :to="{name: 'patientInfo'}" >修改个人资料</router-link>
                    </div>
                </div>

                <food-input-choose v-model="showDietChoose" :date="date" />
            </div>

            <a class="save-btn" href="javascript:" @click="toReport">每日健康报告</a>
        </div>
    </div>
</template>

<script>
    import mixin from "@/mixins/date-choose";

    import FoodInputChoose from "@/components/FoodInputChoose";
    import moodMap from "@/map/mood";

    let data = {
        DataDate: "2016-08-23", //string              数据日期,必填
        CaloriesIntake: 0, // 可选	float                    摄入总卡路里数,（可选,需求修改该字段时传值即可）
        DrinkingWater: 0, // 可选	int            每日喝水总杯数,（可选,需求修改该字段时传值即可）
        WalkingDistance: 0, // 可选	float            行走距离(单位:公里),（可选,需求修改该字段时传值即可）
        CaloriesConsume: 0, // 可选	float            消耗的总卡路里数,（可选,需求修改该字段时传值即可）
        WalkSteps: 0, // 可选	int            步数,（可选,需求修改该字段时传值即可）
        SleepHours: 0, // 可选	float            睡眠时间,（可选,需求修改该字段时传值即可）
        BedTime: "", // 可选	string            就寝时间,（可选,需求修改该字段时传值即可）
        GetUpTime: "", // 可选	string            起床时间,（可选,需求修改该字段时传值即可 ）
        Mood: 0 // 可选	int心情,1.高兴,2.愉快,3.平和,4.低落,5.生气,0.未填写心情记录（可选,需求修改该字段时传值即可）
    };

    export default {
        mixins: [mixin],
        data() {
            return {
                moodMap,
                showDietChoose: false,
                apiType: 1,
                today: "",
                data: {
                    ...data
                }
            };
        },
        components: {
            FoodInputChoose
        },
        mounted() {
            this.$root.setPageTitle("健康3秒钟");

            this.initData(this.fetch);
            /*this.login().then(() => {
                this.initData(this.fetch);
            });*/
        },
        methods: {
            //说明
            waterDesc() {
                this.$toast("每杯水200ml");
            },
            //喝水杯数
            changeDrinkingWater(key = "add") {
                let DrinkingWater = this.data.DrinkingWater || 0;

                if(key === "add") {
                    DrinkingWater += 1;
                } else {
                    DrinkingWater -= 1;
                }

                if(DrinkingWater < 0) {
                    DrinkingWater = 0;
                }

                this.data = {
                    ...this.data,
                    DrinkingWater
                };

                this.updateHealthData();
            },
            //录入今日食物
            addDiet() {
                this.showDietChoose = true;
            },
            //修改步数
            updateSteps() {
                this.$MessageBox.prompt("步数记录不准确？来手动修改吧", "修改步数记录").then(({value}) => {
                    if(isNaN(value)) {
                        this.$toast("请输入为数字的步数");

                        return;
                    }

                    /*
                    * WalkingDistance: 0, // 可选	float            行走距离(单位:公里),（可选,需求修改该字段时传值即可）
                     CaloriesConsume: 0, // 可选	float            消耗的总卡路里数,（可选,需求修改该字段时传值即可）
                     WalkSteps: 0, // 可选	int            步数,（可选,需求修改该字段时传值即可）
                    *
                    * 公里      = 步数*0.6*0.001
                     卡路里  = 步数*0.04

                     * */

                    let steps = parseInt(value);
                    let WalkingDistance = Number(steps * 0.6 * 0.001).toFixed(2); // 步数转公里
                    let CaloriesConsume = Number(steps * 0.04).toFixed(2); // 千卡路里计算公式

                    this.data = {
                        ...this.data,
                        WalkSteps: steps,
                        WalkingDistance,
                        CaloriesConsume
                    };

                    this.updateHealthData();
                }, () => {});
            },
            //设置心情
            setMood(item) {
                this.data = {
                    ...this.data,
                    Mood: item.value
                };

                this.updateHealthData();
            },
            /*//健康模块登录
            login() {
                return this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "login"
                    },
                    data: {
                        AccountName: "13265695561", //	String 用户名/手机号
                        Password: "111111" //	String
                    }
                }).then((res) => {
                    this.$utils.setToken_360App(res.Data.Token);
                    //this.$toast("登录成功");
                });
            },*/
            //获取数据
            fetch() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getHealthData"
                    },
                    data: {
                        "date": this.date
                    }
                }).then((res) => {
                    let json = res.Data || {};

                    delete json.AccountID;
                    delete json.LastModifiedTime;

                    this.data = {
                        ...this.data,
                        ...json,
                        DataDate: this.date
                    };
                });
            },
            //更新健康
            updateHealthData() {
                let data = {
                    ...this.data,
                    DataDate: this.date
                };

                if(data.BedTime) {
                    const date = new Date(this.$utils.getFormatDateStr(data.BedTime));
                    const minDate = new Date("2002/01/01");

                    if(date.getTime() < minDate.getTime()) {
                        delete data.BedTime;
                        delete data.GetUpTime;
                    }
                }

                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "updateHealthData"
                    },
                    data,
                    showLoading: false
                }).then((res) => {
                    //console.log(res);
                });
            },
            //获取个人资料
            getPatientInfo() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getPatientInfo"
                    },
                    data: {}
                }).then((res) => {
                    let {Birthday} = res.Data;
                    let dateObj = this.$utils.getCurrentTime(new Date(Birthday));
                    let currentObj = this.$utils.getCurrentTime();
                    let age = currentObj.year - dateObj.year;

                    if(age < 18 || age > 64) {

                    }

                    this.fetch(data);
                });
            },
            //去评估
            toReport() {
                let data = this.data;

                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getPatientInfo"
                    },
                    data: {}
                }).then((res) => {
                    let {Birthday, Weight, Height} = res.Data;
                    let dateObj = this.$utils.getCurrentTime(new Date(Birthday));
                    let currentObj = this.$utils.getCurrentTime();
                    let age = currentObj.year - dateObj.year;

                    if(age < 18 || age > 64) {
                        this.$MessageBox("提示", "抱歉，暂无法评估，您的年龄不在评估范围18岁-64岁内");

                        return;
                    }

                    this.$goto({
                        name: "dailyReport",
                        query: {
                            Calory: data.CaloriesIntake,
                            DrinkCupNum: data.DrinkingWater,
                            SleepHour: data.SleepHours,
                            Steps: data.WalkSteps,
                            Mood: data.Mood,

                            Birthday: dateObj.dateStr,
                            Weight,
                            Height
                        }
                    });
                });
            }
        }
    }
</script>

<style scoped></style>
