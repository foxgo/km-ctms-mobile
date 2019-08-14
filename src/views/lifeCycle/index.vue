<template>
    <div class="page-section normal-page-box life-cycle-section clearfix" v-if="loadComplete && data">
        <div class="current-cycle font-size-medium">
            <p class="clearfix">
                <span class="text-mute">您目前处于生命周期</span><span class="mrg-l text-primary-second font-size-large" v-html="pageData.period"></span>
            </p>

            <p class="text-body-second"><span v-html="$utils.getMapText(genderMap, data.Sex) || '女'"></span><span class="mrg-l-md">{{pageData.age}}{{pageData.unit}}</span></p>
        </div>

        <div class="questions-wrap">
            <h5 class="font-size-medium text-body-second">常见健康问题</h5>

            <div class="questions-list clearfix">
                <a class="questions-link" href="javascript:" v-for="(item, index) in data.HealthProblemItems" :key="index" v-html="item.Name" @click="toDiseaseEncyclopedia(item)"></a>
            </div>
        </div>

        <div class="switch-tab-wrap">
            <ul class="switch-tab-header clearfix">
                <li :class="{active: index === currentTabIndex}" v-for="(item, index) in tab" v-html="item" @click="setCurrentTab(index)"></li>
            </ul>

            <div class="clearfix">
                <div class="swiper-container" id="life-cycle-swiper" v-if="loadComplete">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="switch-tab-body">
                                <p class="mrg-b" v-html="data.PhysicalExamination"></p>

                                <p class="mrg-b" v-for="item in indexGroupDiseases" v-html="item.IndexGroupName"></p>

                                <div class="clearfix">
                                    <a class="font-size-medium text-primary-second" href="javascript:" @click="gotoDoctorOnline">#健康咨询#</a>
                                </div>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="switch-tab-body">
                                <p class="mrg-b" v-for="item in lifeStyle" v-html="item"></p>

                                <div class="clearfix">
                                    <a class="font-size-medium text-primary-second" href="javascript:" @click="gotoDoctorOnline">#健康咨询#</a>

                                    <a class="font-size-medium text-primary-second mrg-l-xxl" href="javascript:" @click="gotoShoppingMall">#健康商城#</a>
                                </div>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="switch-tab-body">
                                <p class="mrg-b" v-for="item in vaccine" v-html="item"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <router-link class="care-btn" :to="{name: 'careForFamily'}">关爱<span class="block">家人</span></router-link>
    </div>
</template>

<script>
    import genderMap from "@/map/h5-gender";

    const tab = ["健康体检建议", "生活方式建议", "预防接种建议"];
    let mySwiper;

    export default {
        data() {
            return {
                genderMap,
                tab,
                loadComplete: false, //是否已加载
                currentTabIndex: 0, // 当前标签
                pageData: {},
                indexGroupDiseases: [],
                data: null
            }
        },
        computed: {
            lifeStyle() {
                return this.getSplit(this.data.LifeStyle);
            },
            vaccine() {
                return this.getSplit(this.data.Vaccine);
            },
            month() {
                return this.$route.query.month;
            },
            week() {
                return this.$route.query.week;
            },
            age() {
                return this.$route.query.age;
            },
            gender() {
                return this.$route.query.gender;
            }
        },
        components: {},
        mounted() {
            this.$root.setPageTitle("生命周期建议");

            this.$root.getPersonInfo().then((data) => {
                this.fetch(data);
            });
        },
        methods: {
            //创建滑动
            createSwiper(option) {
                let self = this;

                let options = Object.assign({}, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    initialSlide: this.currentTabIndex,
                    autoplay: false,
                    on: {
                        slideChange() {
                            self.currentTabIndex = this.activeIndex;
                        }
                    }
                }, option);

                mySwiper = this.$createSwiper("#life-cycle-swiper", options);
            },
            //设置当前标签内容
            setCurrentTab(index) {
                if(mySwiper) {
                    mySwiper.slideTo(index);
                }
            },
            //获取字符切割
            getSplit(str) {
                let array = [];
                let splitStr = "   ";

                if(str) {
                    let temp = str.split(/[\n]/g);

                    for(let i = 0; i < temp.length; i++) {
                        let n = temp[i];

                        if(n.indexOf(splitStr) !== -1) {
                            let arr = n.split(splitStr);

                            arr.forEach(m => {
                                if(m) {
                                    array.push(m);
                                }
                            });

                            continue;
                        }

                        if(n) {
                            array.push(n);
                        }
                    }
                }

                return array;
            },
            //咨询问诊
            gotoDoctorOnline() {
                this.$root.actionToNative("gotoDoctorOnline", "在线问诊");
            },
            //健康商城
            gotoShoppingMall() {
                this.$root.actionToNative("gotoShoppingMall", "健康商城");
            },
            //跳转到疾病百科
            toDiseaseEncyclopedia(item) {
                let router = {
                    name: "diseaseEncyclopedia",
                    query: {
                        id: item.BatDeseaseID
                    }
                };

                if(!item.BatDeseaseID) {
                    this.$toast("暂无该疾病介绍");

                    return;
                }

                this.$goto(router);
            },
            //获取全生命周期管理建议体检建议增加专项检查项目
            getIndexGroupDiseases(json) {
                let array = json.HealthProblemItems.map(n => n.HealthTypeCode);

                this.$ajax({
                    type: "get",
                    request: {
                        name: "getIndexGroupDiseases"
                    },
                    data: {
                        healthTypeCode: array.join()
                    }
                }).then((res) => {
                    this.indexGroupDiseases = res.ReturnData;
                }).finally(() => {
                    this.loadComplete = true;

                    this.$nextTick(() => {
                        this.createSwiper();
                    });
                });
            },
            //请求数据
            fetch(json) {
                let data = {
                    age: json.Age,
                    gender: json.Gender
                };

                if(typeof this.age !== "undefined") {
                    data.age = this.age;
                }

                if(this.month) {
                    data.month = this.month;
                }

                if(this.gender) {
                    data.gender = this.gender;
                }

                if(this.week) {
                    data.week = this.week;
                }

                let result = this.$utils.getPeriod(data);
                data = result.data;

                //男为1, 其他为 设为女值2
                if(this.$utils.getMapKey(genderMap, data.gender) !== "male") {
                    //这里孕期的时候女的必须要传gender=0才有有数据
                    if(result.pageData.pregnantPeriod) {
                        result.data.gender = 0;
                    } else {
                        result.data.gender = 2;
                    }
                }

                this.pageData = result.pageData;

                this.$ajax({
                    type: "get",
                    request: {
                        name: "getLifeCycleSuggest"
                    },
                    data: result.data
                }).then((res) => {
                    this.data = res.ReturnData;

                    this.getIndexGroupDiseases(this.data);
                });
            }
        }
    }
</script>

<style></style>
