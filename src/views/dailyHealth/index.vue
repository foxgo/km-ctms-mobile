<template>
    <div class="page-section daily-health clearfix">
        <a class="header-bar">统计</a>

        <div class="full-height flex-container flex-direction-column">
            <div class="flex-1 daily-main">
                <div class="date-choose-wrap" v-if="today">
                    <a class="arrow-btn el-icon-arrow-left" href="javascript:" @click="getPrevDate"></a>
                    <span v-html="data.DataDate">2016-08-23</span>
                    <a :class="{'arrow-btn el-icon-arrow-right': true, 'disabled': today === data.DataDate}" href="javascript:" @click="getNextDate"></a>
                </div>

                <div class="module-wrap">
                    <div class="module-title">每日健康指标</div>

                    <div class="module-bar clearfix">
                        <span class="inline-block fr text-mute font-size-small">饮食详情  <i class="el-icon-arrow-right" /></span>

                        <i class="icon-diet" /> <span class="vertical-middle">饮食记录</span>
                    </div>

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
                            <div class="inline-block clearfix">
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
                        <a class="el-icon-remove water-op-btn mrg-r-lg" href="javascript:" @click="changeDrinkingWater('reduce')" v-if="data.DrinkingWater"></a>

                        <a class="el-icon-remove water-op-btn mrg-r-lg disabled" href="javascript:" v-else></a>

                        <i class="mrg-r icon-glass"/>

                        <span class="mrg-r text-mute">x</span>

                        <span class="mrg-r-lg text-mute" v-html="data.DrinkingWater">0</span>

                        <a class="water-op-btn el-icon-circle-plus" href="javascript:" @click="changeDrinkingWater('add')"></a>
                    </div>
                </div>

                <div class="module-wrap">
                    <div class="module-bar clearfix">
                        <span class="inline-block fr text-mute font-size-small"><i class="el-icon-arrow-right" /></span>

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
                    <div class="module-bar clearfix">
                        <span class="inline-block fr text-mute font-size-small"><span class="text-strong font-size-big text-body-second" v-html="data.SleepHours">0</span> 小时<i class="el-icon-arrow-right" /></span>

                        <i class="icon-sleep" /> <span class="vertical-middle">睡眠记录</span>
                    </div>
                </div>

                <div class="module-wrap mrg-b-0">
                    <div class="module-bar clearfix">
                        <div class="inline-block fr text-mute font-size-small">
                            <span :class="['mrg-l', data.Mood === item.value ? item.activeIcon : item.icon]" v-for="item in moodMap"></span>
                        </div>

                        <i class="icon-mood" /> <span class="vertical-middle">心情</span>
                    </div>

                    <div class="module-con clearfix">
                        <a class="text-primary font-size-medium">修改个人资料</a>
                    </div>
                </div>
            </div>

            <a class="save-btn">每日健康报告</a>
        </div>
    </div>
</template>

<script>
    import moodMap from "@/map/mood";
    import {getToken, setToken} from "@/utils/auth";

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

    let times = 24 * 60 * 60 * 1000; // 一天的毫秒数

    export default {
        data() {
            return {
                moodMap,
                apiType: 1,
                today: "",
                data: {
                    ...data
                }
            };
        },
        mounted() {
            this.$root.setPageTitle("健康3秒钟");

            this.initData();

            //this.sendCode();
            //this.login();
            /*this.getHealthData();
            this.addDietDetails();
            this.getDietDetails();
            this.updateHealthData();*/
        },
        methods: {
            //设置今天
            initData() {
                let obj = this.$utils.getCurrentTime();
                let today = obj.dateStr;

                this.today = today;

                this.data = {
                    ...this.data,
                    DataDate: today
                };

                this.getHealthData();
            },
            //说明
            waterDesc() {
                this.$toast("每杯水200ml");
            },
            //获取上一天
            getPrevDate() {
                let reg = /-/g;
                let date = new Date(this.data.DataDate.replace(reg, "/"));

                let targetDate = new Date(date.getTime() - times);
                let targetObj = this.$utils.getCurrentTime(targetDate);

                this.data = {
                    ...this.data,
                    DataDate: targetObj.dateStr
                };

                this.getHealthData();
            },
            //获取下一天
            getNextDate() {
                if(this.today === this.data.DataDate) {
                    return;
                }

                let reg = /-/g;
                let date = new Date(this.data.DataDate.replace(reg, "/"));

                let targetDate = new Date(date.getTime() + times);
                let targetObj = this.$utils.getCurrentTime(targetDate);

                this.data = {
                    ...this.data,
                    DataDate: targetObj.dateStr
                };

                this.getHealthData();
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
            },
            sendCode() {
                return this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "sentCode"
                    },
                    data: {
                        toPhone: "13265695561",	//string 手机号
                        valid: 1//	int 操作类型 0:只发送验证码，1: 注册; 2:康美360忘记密码;
                    }
                }).then((res) => {
                    console.log(res);
                    this.$toast("发送成功");
                });
            },
            register() {
                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "register"
                    },
                    data: {
                        PhoneNumber: "13265695561", //	String 手机号
                        VerificationCode: "84968", //	String验证码
                        Password: "111111"	//String密码
                    }
                }).then((res) => {
                    this.$toast("注册成功");
                });
            },
            login() {
                this.$ajax({
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
                    setToken(res.Data.Token);
                    this.$toast("登录成功");
                });
            },
            getHealthData() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getHealthData"
                    },
                    data: {
                        "date": this.data.DataDate
                    }
                }).then((res) => {
                    /*
                    * "AccountID": 2842,                             //用户ID
                     "DataDate": "2017-12-08 00:00:00",             //数据日期
                     "CaloriesIntake": "557.80",                    //当天摄入的总卡路里数
                     "DrinkingWater": 0,                            //当天喝水总杯数
                     "WalkingDistance": "3.20",                     //行走距离
                     "CaloriesConsume": "0.00",                     //当天消耗的总卡路里数
                     "WalkSteps": 0,                                //步数
                     "SleepHours": "0.00",                          //睡眠小时数
                     "BedTime": "0001-01-01 00:00:00",              //就寝时间
                     "GetUpTime": "0001-01-01 00:00:00",            //起床时间
                     "Mood": 2,                                     //心情状态,2非常好,1好,0一般,-1不好,-2很糟糕
                     "LastModifiedTime": "2017-12-08 12:57:33"


                     DataDate: "2016-08-23", //string              数据日期,必填
                     CaloriesIntake: "", // 可选	float                    摄入总卡路里数,（可选,需求修改该字段时传值即可）
                     DrinkingWater: 0, // 可选	int            每日喝水总杯数,（可选,需求修改该字段时传值即可）
                     WalkingDistance: "", // 可选	float            行走距离(单位:公里),（可选,需求修改该字段时传值即可）
                     CaloriesConsume: "", // 可选	float            消耗的总卡路里数,（可选,需求修改该字段时传值即可）
                     WalkSteps: "", // 可选	int            步数,（可选,需求修改该字段时传值即可）
                     SleepHours: "", // 可选	float            睡眠时间,（可选,需求修改该字段时传值即可）
                     BedTime: "", // 可选	string            就寝时间,（可选,需求修改该字段时传值即可）
                     GetUpTime: "", // 可选	string            起床时间,（可选,需求修改该字段时传值即可 ）
                     Mood: 1 // 可选	int心情,1.高兴,2.愉快,3.平和,4.低落,5.生气,0.未填写心情记录（可选,需求修改该字段时传值即可）
                    * */
                    let json = res.Data;

                    delete json.AccountID;
                    delete json.LastModifiedTime;

                    this.data = {
                        ...this.data,
                        ...json,
                        DataDate: this.data.DataDate
                    };
                });
            },
            addDietDetails() {
                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "addDietDetails"
                    },
                    /*data: {
                        DataDate: "2016-08-23", //string              数据日期,必填
                        DietList: "", // array                         食物信息列表
                         FoodName: "", // string	                         食物名称
                         Count: 0, // int	                         食物份量
                         Calories: "", // float	                         每份食物含的卡路里数
                         OrderNum: "", // int                         顺序号
                         ImageUrl: "" // string	                         食物图片地址
                    }*/
                    data: {
                        "DataDate": "2017-12-08",
                        "DietList": [
                            {
                                "FoodName": "叉烧饭",
                                "Count": "1",
                                "Calories": "516.6",
                                "OrderNum": "1",
                                "ImageUrl": "http://upload.jkbat.com/Files/20170425/xk01pn1h.w32.jpg"
                            },
                            {
                                "FoodName": "苹果",
                                "Count": "2",
                                "Calories": "20.6",
                                "OrderNum": "2",
                                "ImageUrl": "http://upload.jkbat.com/Files/20170425/xk01pn1h.w32.jpg"
                            }
                        ]
                    }
                }).then((res) => {
                    console.log(res);
                });
            },
            getDietDetails() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getDietDetails"
                    },
                    data: {
                        "date": "2017-12-08"
                    }
                }).then((res) => {
                    console.log(res);
                });
            },
            updateHealthData() {
                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "updateHealthData"
                    },
                    data: {
                        ...this.data
                    }
                }).then((res) => {
                    console.log(res);
                });
            },
            getCalorieFromPicForHealth() {
                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "getCalorieFromPicForHealth"
                    },
                    data: {
                        "imageFile":"XXXXX"   //--所传图片转换的base64格式
                    }
                }).then((res) => {
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped></style>
