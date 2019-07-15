<template>
    <div class="page-section patient-info-section clearfix">
        <div class="warning-tip">温馨提示: 完整的健康资料，将方便对您的健康做出准确的评估建议</div>

        <form @submit.prevent="save" class="form-con">
            <div class="field-row clearfix">
                <label class="field-label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>

                <div class="field-con">
                    <label class="label-radio mrg-r-md" v-for="item in genderMap">
                        <input type="radio" name="gender" v-model="data.Sex" :value="item.value"/> <span v-html="item.text">男</span>
                    </label>
                </div>
            </div>

            <div class="field-row clearfix">
                <label class="field-label">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高</label>

                <div class="field-con">
                    <div class="field-unit">CM</div>

                    <div class="bfc">
                        <input class="field-input" v-model="data.Height"/>
                    </div>
                </div>
            </div>

            <div class="field-row clearfix">
                <label class="field-label">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</label>

                <div class="field-con">
                    <div class="field-unit">KG</div>

                    <div class="bfc">
                        <input class="field-input" v-model="data.Weight"/>
                    </div>
                </div>
            </div>

            <div class="field-row clearfix">
                <label class="field-label">出生日期</label>

                <div class="field-con">
                    <div class="field-unit"></div>

                    <div class="bfc">
                        <input class="field-input" v-model="dateStr" readonly @click="chooseDate"/>
                    </div>
                </div>
            </div>

            <div class="field-row clearfix">
                <input type="submit" class="submit-btn" value="完成填写"/>
            </div>
        </form>

        <mt-datetime-picker ref="picker" type="date" :startDate="datePickerOption.startDate" :endDate="datePickerOption.endDate" v-model="data.Birthday" @confirm="handleChange"/>
    </div>
</template>

<script>
    import genderMap from "@/map/gender";

    let data = {
        /*"ID":"", //患者ID
        "UserName":"", //姓名
        "PhotoPath":"", //照片地址
         "Signature":"", //个人简介
         "GeneticDisease":"", //家庭遗传史
         "Allergies":"", //过敏史
         "Anamnese":"", //既往病史
         "PhoneNumber":"", //联系电话*/
        "Sex": 1, //性别
        "Birthday": new Date("1900/01/01"), //生日
        "Weight": 0, //体重
        "Height": 0 //身高
    };

    export default {
        data() {
            return {
                genderMap,
                apiType: 1,
                dateStr: "1900-01-01",
                datePickerOption: {
                    startDate: new Date("1900/01/01"),
                    endDate: new Date()
                },
                data: {
                    ...data
                }
            };
        },

        computed: {},
        components: {},
        mounted() {
            this.$root.setPageTitle("修改个人资料");

            this.fetch();
        },
        methods: {
            //获取个人资料
            fetch() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getPatientInfo"
                    },
                    data: {}
                }).then((res) => {
                    let {Birthday, Weight, Height, ID, Sex} = res.Data;
                    let dateObj = this.$utils.getCurrentTime(new Date(Birthday));
                    let data = {
                        ...this.data,
                        ...res.Data,
                        Birthday: new Date(Birthday),
                        Weight,
                        Height,
                        ID,
                        Sex
                    };

                    this.dateStr = dateObj.dateStr;
                    this.data = data;
                });
            },
            //保存
            save() {
                let dateObj = this.$utils.getCurrentTime(this.data.Birthday);
                let data = {
                    ...this.data,
                    Birthday: dateObj.dateStr
                };

                if(isNaN(data.Height)) {
                    this.$toast("身高应该为数字");

                    return;
                }

                if(isNaN(data.Weight)) {
                    this.$toast("体重应该为数字");

                    return;
                }

                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "getPatientInfo"
                    },
                    data
                }).then(() => {
                    this.$toast("保存成功");
                });
            },
            //日期选择
            chooseDate() {
                let date = new Date(this.$utils.getFormatDateStr(this.dateStr));
                let dateObj = this.$utils.getCurrentTime(date);
                let picker = this.$refs.picker.$refs.picker;

                picker.setSlotValue(0, dateObj.year + "");
                picker.setSlotValue(1, dateObj.month + "");
                picker.setSlotValue(2, dateObj.date + "");

                this.$refs.picker.open();
            },
            //日期修改
            handleChange(value) {
                let date = this.$utils.getCurrentTime(value);

                this.dateStr = date.dateStr;
                this.data = {
                    ...this.data,
                    Birthday: value
                };
            }
        }
    }
</script>

<style scoped></style>
