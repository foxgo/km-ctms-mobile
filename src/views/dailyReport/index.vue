<template>
    <div class="page-section daily-report clearfix">
        <div class="report-info">
            <div class="text-body-primary">健康评分:</div>

            <div class="report-score">
                <div class="score-con">
                    <strong class="text-warning" v-html="data.TotalScore">85</strong><span>分</span>

                    <div class="report-date">({{date}})</div>
                </div>
            </div>

            <div class="clearfix">
                <div class="col-fixed-7">
                    <label class="text-body-primary">肥胖指数：</label>
                    <span class="text-body-second" v-html="data.BMI">28 </span>
                </div>

                <div class="col-fixed-5">
                    <label class="text-body-primary">属于：</label>
                    <span class="report-status" v-html="data.BMIStatus">偏重</span>
                </div>
            </div>
        </div>

        <div class="module-wrap">
            <div class="module-bar clearfix">
                <i class="icon-diet"/> <span class="vertical-middle">饮食</span>
            </div>

            <div class="module-con clearfix">
                <p class="mrg-b">评估：{{diet.Diagnosis}}</p>

                <p>建议：{{diet.Suggest}}</p>
            </div>
        </div>

        <div class="module-wrap">
            <div class="module-bar clearfix">
                <i class="icon-water"/> <span class="vertical-middle">喝水</span>
            </div>

            <div class="module-con clearfix">
                <p class="mrg-b">评估：{{water.Diagnosis}}</p>

                <p>建议：{{water.Suggest}}</p>
            </div>
        </div>

        <div class="module-wrap">
            <div class="module-bar clearfix">
                <i class="icon-foot-2"/> <span class="vertical-middle">运动</span>
            </div>

            <div class="module-con clearfix">
                <p class="mrg-b">评估：{{steps.Diagnosis}}</p>

                <p>建议：{{steps.Suggest}}</p>
            </div>
        </div>

        <div class="module-wrap">
            <div class="module-bar clearfix">
                <i class="icon-sleep" /> <span class="vertical-middle">睡眠</span>
            </div>

            <div class="module-con clearfix">
                <p class="mrg-b">评估：{{sleep.Diagnosis}}</p>

                <p>建议：{{sleep.Suggest}}</p>
            </div>
        </div>

        <div class="module-wrap">
            <div class="module-bar clearfix">
                <i class="icon-mood"/> <span class="vertical-middle">心情</span>
            </div>

            <div class="module-con clearfix">
                <p class="mrg-b">{{mood.Suggest}}</p>
            </div>
        </div>

        <div class="recommend-wrap">
            <div class="recommend-title">康美药品推荐</div>

            <ul class="recommend-list" v-if="data.RecommendProduct">
                <li class="clearfix">
                    <a class="block clearfix">
                        <img class="recommend-pic" v-lazy="$utils.getRecommendProductUrl(data.RecommendProduct.SKU_IMG_PATH)" />

                        <div class="bfc clearfix">
                            <div class="mrg-b" v-html="data.RecommendProduct.PRODUCT_NAME">三七粉</div>

                            <div class="text-danger">{{$utils.formatMoney(data.RecommendProduct.MARKET_PRICE)}}</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import mixin from "@/mixins/date-choose";

    export default {
        mixins: [mixin],
        data() {
            return {
                apiType: 1,
                data: {}
            };
        },

        computed: {
            diet() {
                return this.getModuleData("饮食");
            },
            water() {
                return this.getModuleData("喝水");
            },
            steps() {
                return this.getModuleData("运动");
            },
            sleep() {
                return this.getModuleData("睡眠");
            },
            mood() {
                return this.getModuleData("心情");
            }
        },
        components: {},
        mounted() {
            this.$root.setPageTitle("健康报告");

            this.initData();

            this.fetch();

            //this.getPatientInfo();
        },
        methods: {
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
                    let {Birthday, Weight, Height} = res.Data;
                    let dateObj = this.$utils.getCurrentTime(new Date(Birthday));

                    let data = {
                        Birthday: dateObj.dateStr,
                        Weight,
                        Height,
                        ...this.$route.query
                    };

                    this.fetch(data);
                });
            },
            //获取数据
            fetch(data) {
                if(!data) {
                    data = {
                        ...this.$route.query
                    };
                }
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getHealthThreeSecondRecord"
                    },
                    data
                }).then((res) => {
                    this.data = res.ReturnData;
                });
            },
            //获取类型相关数据
            getModuleData(key) {
                let obj = {};

                if(this.data.isEvalationSuccess) {
                    obj = this.data.EvaDetailList.find(n => {
                        return n.EvaType === key;
                    });
                }

                return obj;
            }
        }
    }
</script>

<style scoped></style>
