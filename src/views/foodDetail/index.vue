<template>
    <div class="page-section daily-health food-detail-section clearfix">
        <div class="full-height flex-container flex-direction-column">
            <div class="flex-1 flex-container flex-direction-column clearfix">
                <div class="date-choose-wrap mrg-b-0" v-if="today">
                    <a class="arrow-btn km-arrow-left" href="javascript:" @click="getPrevDate"></a>

                    <router-link class="vertical-middle" :to="{name: 'dateChoose'}" v-html="date">2016-08-23</router-link>

                    <a :class="{'arrow-btn km-arrow-right': true, 'disabled': today === date}" href="javascript:" @click="getNextDate"></a>
                </div>

                <div class="module-con text-center clearfix">
                    <div class="col-fixed-6">
                        <p class="text-body-primary">
                            <strong class="text-strong text-body-second font-size-big" v-html="data.CaloriesIntake">0</strong> 卡路里
                        </p>

                        <p class="mrg-t-md font-size-small text-mute">
                            已摄入
                        </p>
                    </div>

                    <div class="col-fixed-6">
                        <div class="inline-block clearfix">
                            <p class="text-body-primary">
                                <strong class="text-strong text-body-second font-size-big" v-html="getEvaluate()"></strong>
                            </p>

                            <p class="mrg-t-md font-size-small text-mute">
                                评估
                            </p>
                        </div>
                    </div>
                </div>

                <food-input-choose v-model="showDietChoose" :date="date" />

                <div class="recommend-wrap flex-1 flex-container flex-direction-column">
                    <div class="recommend-title">匹配食物列表</div>

                    <div class="flex-1 food-list">
                        <template v-if="dataItems.length">
                            <ul class="recommend-list">
                                <li class="clearfix" v-for="item in dataItems" @click="remove(item)">
                                    <img class="recommend-pic" v-lazy="item.ImageUrl" />

                                    <div class="bfc clearfix">
                                        <div class="fr text-mute">{{item.Calories}}卡里路</div>

                                        <div class="bfc" v-html="item.FoodName">水煮玉米</div>
                                    </div>
                                </li>
                            </ul>
                        </template>

                        <div class="pad-lg text-mute text-center" v-else>暂无相关数据</div>
                    </div>
                </div>
            </div>

            <a class="save-btn" href="javascript:" @click="addDiet">添加食物</a>
        </div>
    </div>
</template>

<script>
    import mixin from "@/mixins/date-choose";

    import FoodInputChoose from "@/components/FoodInputChoose";

    export default {
        mixins: [mixin],
        data() {
            return {
                apiType: 1,
                showDietChoose: false,
                patientInfo: {},
                data: {},
                dataItems: []
            };
        },
        computed: {},
        watch: {},
        components: {
            FoodInputChoose
        },
        mounted() {
            this.$root.setPageTitle("饮食详情");

            this.initData(this.fetch);
        },
        methods: {
            //获取当天的数据
            fetch() {
                this.getPatientInfo();
                this.getHealthData();
                this.getDietDetails();
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
                    this.patientInfo = res.Data;
                });
            },
            //获取评估
            getEvaluate() {
                let weight = this.patientInfo.Weight;
                let height = this.patientInfo.Height;
                let calories = this.data.CaloriesIntake;
                let result = "暂无法评估";
                //标准卡路里
                let standCalorie = 0;
                //标准体重
                const standardWeight = Math.abs(105 - height);
                //BMI=体重/ 身高²
                const BMI = weight / Math.pow(height / 100, 2);

                if(height && weight) {
                    if(BMI < 18.5) {
                        standCalorie = standardWeight * 35;
                    } else if(BMI >= 18.5 && BMI < 24) {
                        standCalorie = standardWeight * 30;
                    } else if(BMI >= 24 && BMI < 28) {
                        standCalorie = standardWeight * 25;
                    } else {
                        standCalorie = standardWeight * 25;
                    }

                    if(standCalorie * 1.1 < calories) {
                        return result = "偏高";
                    } else if(standCalorie * 0.9 < calories && calories < standCalorie * 1.1) {
                        return result = "适中";
                    } else if(standCalorie * 0.9 > calories) {
                        return result = "偏低";
                    }
                }

                return result;
            },
            //获取当天统计
            getHealthData() {
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
                    this.data = res.Data;
                });
            },
            //获取食物列表
            getDietDetails() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getDietDetails"
                    },
                    data: {
                        date: this.date
                    }
                }).then((res) => {
                    this.dataItems = res.Data;
                });
            },
            //录入今日食物
            addDiet() {
                this.showDietChoose = true;
            },
            //删除食物
            remove(item) {
                this.$MessageBox.confirm("确定要删除吗?").then(() => {
                    this.$ajax({
                        type: "get",
                        apiType: this.apiType,
                        request: {
                            name: "removeDietDetails"
                        },
                        data: {
                            id: item.ID
                        }
                    }).then(() => {
                        this.fetch();
                    });
                }, () => {});
            }
        }
    }
</script>

<style scoped></style>
