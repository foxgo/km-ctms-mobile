<template>
    <div class="page-section food-input-section clearfix">
        <form @submit.prevent="search">
            <div class="search-wrap">
                <input class="search-input" v-model="data.foodName" @focus="focus" @blur="blur"/>

                <div class="search-tip" v-if="showTip">
                    <i class="icon-search" /> 食物名称
                </div>

                <div class="hidden">
                    <input type="submit" />
                </div>
            </div>
        </form>

        <div class="food-pic" v-if="src">
            <img :src="src" class="img-response" />

            <div class="text-body-second mrg-t-md mrg-b-md">
                <i class="icon-warning" /> 抱歉找不到匹配的食物，以下是我们推荐的食物您还可以通过搜索查询食物。
            </div>
        </div>

        <div class="recommend-wrap" v-if="showList">
            <div class="recommend-title">推荐食物列表</div>

            <template v-if="dataItems.length">
                <ul class="recommend-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li class="clearfix" v-for="item in dataItems" @click="confirm(item)">
                        <img class="recommend-pic" v-lazy="item.PictureURL" />

                        <div class="bfc clearfix">
                            <div class="fr text-mute">{{item.HeatQty}}卡里路</div>

                            <div class="bfc" v-html="item.MenuName">水煮玉米</div>
                        </div>
                    </li>
                </ul>

                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </template>

            <div class="pad-lg text-mute text-center" v-else>暂无相关数据</div>
        </div>

        <transition name="fade">
            <div class="confirm-wrap" v-if="showConfirmDialog">
                <div class="confirm-masker" @click="hideConfirmDialog"></div>

                <div class="confirm-con">
                    <div class="confirm-title">确认添加该食物</div>

                    <div class="food-info clearfix">
                        <img class="food-pic" :src="confirmData.PictureURL" />

                        <div class="bfc clearfix">
                            <div class="mrg-b-md text-nowrap" v-html="confirmData.MenuName">水煮玉米</div>

                            <div class="text-mute">{{confirmData.HeatQty}}卡里路</div>
                        </div>
                    </div>

                    <div class="confirm-bar clearfix">
                        <a class="cancel-btn" href="javascript:" @click="hideConfirmDialog">取消</a>

                        <a class="confirm-btn" href="javascript:" @click="addDietDetails(confirmData)">确定</a>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import mixin from "@/mixins/date-choose";

    export default {
        mixins: [mixin],
        data() {
            return {
                src: "",
                apiType: 1,
                loading: false,
                showInputTip: true,
                showList: false,
                showConfirmDialog: false,
                confirmData: {},
                data: {
                    foodName: "" // "虾"
                },
                dataItems: [],
                pagination: {
                    pageIndex: 0,
                    pageSize: 10
                }
            };
        },
        computed: {
            showTip() {
                let result = this.showInputTip;

                if(this.data.foodName) {
                    result = false;
                }

                return result;
            }
        },
        watch: {
            "data.foodName"(val) {
                if(val) {
                    this.getAssociationFood();
                }
            }
        },
        components: {},
        mounted() {
            this.$root.setPageTitle("食物录入");

            this.initData();

            let file = this.$root.getTempImage();

            if(file) {
                this.upload(file);
            }
        },
        methods: {
            //上传
            upload(file) {
                let self = this;
                let path = URL.createObjectURL(file);
                let img = new Image();

                img.onload = function () {
                    let width = this.width;
                    let height = this.height;
                    //let scale = width / height;

                    /*width = 480 || width;
                     height = width / scale;*/

                    //生成canvas
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(this, 0, 0, width, height);

                    let base64 = canvas.toDataURL("image/jpeg", 1);

                    self.$ajax({
                        type: "post",
                        apiType: self.apiType,
                        request: {
                            name: "getCalorieFromPicForHealth"
                        },
                        data: {
                            imageFile: btoa(base64)//	--所传图片转换的base64格式
                        }
                    }).then((res) => {
                        let {calorie, name} = res.Data;

                        if(name === "非菜") {
                            name = "";
                        }

                        self.src = base64;

                        self.$root.setTempImage(null);

                        self.getAssociationFood(name);
                    });
                };

                img.src = path;
            },
            //聚焦
            focus() {
                this.showInputTip = false;
            },
            //失去焦点
            blur() {
                this.showInputTip = true;
            },
            //关联查询
            getAssociationFood(foodName) {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getAssociationFood"
                    },
                    data: {
                        foodName: this.data.foodName ||  foodName || "虾"// "虾"
                    },
                    showLoading: false
                }).then((res) => {
                    let json = res;
                    let {Data} = res;

                    this.dataItems = Data;
                    this.pagination = {
                        pageIndex: json.PageIndex,
                        pageSize: json.PageSize,
                        totalPage: json.PagesCount
                    };
                    this.showList = true;
                });
            },
            //获取查询列表
            fetchList(pageIndex) {
                let data = {
                    foodName: this.data.foodName,
                    ...this.pagination,
                    pageIndex: pageIndex || this.pagination.pageIndex || 0
                };

                return this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getAssociationFood"
                    },
                    data
                }).then((res) => {
                    let json = res;
                    let {Data} = res;

                    if(json.PageIndex) {
                        this.dataItems = this.dataItems.concat(Data);
                    } else {
                        this.dataItems = Data;
                    }

                    this.pagination = {
                        pageIndex: json.PageIndex,
                        pageSize: json.PageSize,
                        totalPage: json.PagesCount
                    };
                    this.showList = true;

                    return res;
                });
            },
            //搜索
            search() {
                if(this.data.foodName) {
                    this.fetchList();
                }
            },
            //点击确认添加
            confirm(item) {
                this.confirmData = item;

                this.showConfirmDialog = true;
            },
            //关闭
            hideConfirmDialog() {
                this.confirmData = {};

                this.showConfirmDialog = false;
            },
            //获取食物详情
            getDietDetails() {
                return this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getDietDetails"
                    },
                    data: {
                        date: this.date
                    }
                }).then((res) => {
                    return res;
                });
            },
            //添加食物
            addDietDetails(item) {
                this.getDietDetails().then((res) => {
                    let data = res.Data;
                    let OrderNum = (data.length || 0) + 1;

                    let json = {
                        DataDate: this.date,
                        DietList: [
                            {
                                FoodName: item.MenuName,
                                Count: "1",
                                Calories: item.HeatQty,
                                OrderNum,
                                ImageUrl: item.PictureURL
                            }
                        ]
                    };

                    this.$ajax({
                        type: "post",
                        apiType: this.apiType,
                        request: {
                            name: "addDietDetails"
                        },
                        data: json
                    }).then(() => {
                        this.hideConfirmDialog();

                        this.$goto({
                            name: "foodDetail"
                        });
                    });
                });
            },
            //加载更多
            loadMore() {
                let pageIndex = this.pagination.pageIndex + 1;

                if(!this.pagination.totalPage || pageIndex >= this.pagination.totalPage) {
                    return false;
                }

                this.loading = true;

                setTimeout(() => {
                    this.fetchList(pageIndex).then(() => {
                        this.loading = false;
                    });
                }, 0);
            }
        }
    }
</script>

<style scoped></style>
