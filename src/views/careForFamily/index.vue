<template>
    <div class="page-section care-for-family-section normal-page-box clearfix">
        <div class="white-block pad-lg font-size-large text-body-second">看看您的家人当前生命周期需要哪些 预防保健?</div>

        <form @submit.prevent="save" class="form-con">
            <div class="white-block">
                <div class="field-row clearfix">
                    <label class="field-label">性别</label>

                    <div class="field-con">
                        <ul class="gender-switch clearfix">
                            <li v-for="item in genderMap" @click="genderSwitch(item)">
                                <i :class="[data.gender == item.value ? item.activeIcon: item.icon]" />
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="field-row clearfix">
                    <label class="field-label">年龄</label>

                    <div class="field-con clearfix">
                        <range-choose v-model="data.age" :min="0" :max="120" unit="岁"/>
                    </div>
                </div>

                <template v-if="$utils.getMapKey(genderMap, data.gender) === 'female' && canPregnant">
                    <div class="field-row clearfix" >
                        <label class="field-label">怀孕</label>

                        <div class="field-con">
                            <a :class="{'switch-btn': true, active: data.isPregnant}" href="javascript:" @click="setPregnant(true)">是</a>

                            <a :class="{'switch-btn': true, active: !data.isPregnant}" href="javascript:" @click="setPregnant(false)">否</a>
                        </div>
                    </div>

                    <div class="field-row clearfix" v-if="data.isPregnant">
                        <label class="field-label">孕周</label>

                        <div class="field-con">
                            <range-choose v-model="data.week" :min="10" :max="40" unit="周"/>
                        </div>
                    </div>
                </template>
            </div>

            <div class="hidden clearfix">
                <input type="submit" class="submit-btn" value="提交"/>
            </div>
        </form>

        <div class="btn-con clearfix">
            <input type="button" class="submit-btn" @click="save" value="查看结果"/>
        </div>
    </div>
</template>

<script>
    import RangeChoose from "@/components/RangeChoose";
    import genderMap from "@/map/h5-gender";

    let data = {
        age: 20,
        isPregnant: false,
        week: 0,
        gender: "1"
    };

    export default {
        data() {
            return {
                genderMap,
                data: {
                    ...data
                }
            };
        },
        computed: {
            canPregnant() {
                let canPregnant = (this.data.age > 20 && this.data.age < 50);

                return canPregnant
            }
        },
        watch: {
            "data.age"() {
                let canPregnant = this.canPregnant;

                if(!canPregnant) {
                    this.data = {
                        ...this.data,
                        week: 0,
                        isPregnant: false
                    };
                }
            }
        },
        components: {
            RangeChoose
        },
        mounted() {
            this.$root.setPageTitle("关爱家人");
        },
        methods: {
            //性别切换
            genderSwitch(item) {
                this.data = {
                    ...this.data,
                    gender: item.value
                };
            },
            //是否怀孕
            setPregnant(isPregnant) {
                this.data = {
                    ...this.data,
                    isPregnant,
                    week: isPregnant ? 10 : 0
                };
            },
            //保存
            save() {
                let query = {
                    ...this.data
                };

                if(this.$utils.getMapKey(genderMap, query.gender) !== "female" || !query.isPregnant) {
                    delete query.week;
                    delete query.isPregnant;
                }

                let router = {
                    name: "lifeCycle",
                    query
                };

                this.$goto(router);
            }
        }
    }
</script>

<style scoped></style>
