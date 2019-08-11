<template>
    <div class="page-section normal-page-box disease-encyclopedia-section clearfix" v-if="loadComplete">
        <div class="panel-wrap">
            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-1 vertical-top" />
                    </span>

                    <a class="open-detail" href="javascript:" @click="sliderOpen(data.Disease_Name, data.Briefintro_Content)">
                        <i class="icon-arrow-open" />
                    </a>

                    <span v-html="data.Disease_Name"></span>
                </div>

                <div class="panel-body">
                    <div class="detail-module" v-html="data.Briefintro_Content"></div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-2 vertical-top" />
                    </span>

                    <a class="open-detail" href="javascript:" @click="sliderOpen('相关症状', data.Common_Symptom_Desc)">
                        <i class="icon-arrow-open" />
                    </a>

                    <span>相关症状</span>
                </div>

                <div class="panel-body">
                    <div class="detail-module" v-html="data.Common_Symptom_Desc"></div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-3 vertical-top" />
                    </span>

                    <span>并发症</span>
                </div>

                <div class="panel-body">
                    <p v-html="data.Concurrent_Disease_Nlist"></p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-4 vertical-top" />
                    </span>

                    <span>易感人群</span>
                </div>

                <div class="panel-body">
                    <p v-html="data.Susceptible_Population"></p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-5 vertical-top" />
                    </span>

                    <span>治愈率</span>
                </div>

                <div class="panel-body">
                    <p v-html="data.Cure_Rate"></p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-6 vertical-top" />
                    </span>

                    <span>常用药品</span>
                </div>

                <div class="panel-body">
                    <ul class="tag-list clearfix">
                        <li v-for="item in data.Drugslst">
                            <div class="tag-item" v-html="item.Name"></div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-7 vertical-top" />
                    </span>

                    <span>相关疗法</span>
                </div>

                <div class="panel-body">
                    <div class="dot-panel">
                        <div class="dot-panel-title">
                            <a class="open-detail" href="javascript:" @click="viewDetail(data.Inspection_Detail)">
                                <i class="icon-arrow-open" />
                            </a>

                            <span>检查方式</span>
                        </div>

                        <div class="dot-panel-body">
                            <p v-for="item in getSplit(data.Inspection_Detail)" v-html="item" v-if="item"></p>
                        </div>
                    </div>

                    <div class="dot-panel">
                        <div class="dot-panel-title">
                            <a class="open-detail" href="javascript:" @click="viewDetail(data.Treatment_Detail)">
                                <i class="icon-arrow-open" />
                            </a>

                            <span>预防护理</span>
                        </div>

                        <div class="dot-panel-body">
                            <p v-for="item in getSplit(data.Treatment_Detail)" v-html="item" v-if="item"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <i class="icon-ver-pro-8 vertical-top" />
                    </span>

                    <span>相关疾病</span>
                </div>

                <div class="panel-body">
                    <div class="tag-list clearfix">
                        <a class="tag-item mrg-r-lg" href="javascript:" v-for="item in data.AboutDiseaselst" v-html="item.Name" @click="replaceRoute(item)">肺气肿</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="slider-masker" v-show="show">
            <div class="slider-cover" @click="sliderClose"></div>

            <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
                <div class="slider-con clearfix" v-show="show" v-if="sliderData">
                    <div class="slider-title clearfix">
                        <a class="fr" @click="sliderClose">
                            <i class="icon-arrow-close" />
                        </a>

                        <span v-html="sliderData.title"></span>
                    </div>

                    <div class="slider-body" v-html="sliderData.message"></div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loadComplete: false, //是否已加载
                show: false,
                sliderData: null,
                data: {}
            }
        },
        computed: {},
        components: {},
        mounted() {
            this.$root.setPageTitle("疾病百科");

            this.fetch();
        },
        methods: {
            //滑出
            sliderOpen(title, message) {
                this.sliderData = {
                    title,
                    message
                };

                this.show = true;
            },
            //滑出关闭
            sliderClose() {
                this.show = false;

                this.sliderData = null;
            },
            //获取字符切割
            getSplit(str) {
                let array = [];

                if(str) {
                    let temp = str.split(/[\n]/g);

                    if(temp.length > 2) {
                        for(let i = 0; i < temp.length; i++) {
                            if(!temp[i]) {
                                temp.splice(i, 1);
                            }
                        }

                        let first = temp.shift();

                        array.push(first, temp.join());
                    }
                } else {
                    array = ["", ""]
                }

                return array;
            },
            //打开检查、治疗详情
            viewDetail(str) {
                let array = this.getSplit(str);

                this.sliderOpen(array[0], array[1]);
            },
            //切换最新
            replaceRoute(item) {
                let router = {
                    name: "diseaseEncyclopedia",
                    query: {
                        id: item.Id
                    }
                };

                if(!item.Id) {
                    this.$toast("暂无该疾病介绍");
                    return;
                }

                this.$goto(router, "replace");

                this.fetch();
            },
            //请求数据
            fetch() {
                this.$ajax({
                    apiType: "1",
                    type: "get",
                    request: {
                        name: "getDiseaseDetail"
                    },
                    data: {
                        id: this.$route.query.id
                    }
                }).then((res) => {
                    this.data = res.Data;
                }).finally(() => {
                    this.loadComplete = true;
                });
            }
        }
    }
</script>

<style></style>
