<template>
    <div class="page-section sleep-input-section clearfix">
        <form @submit.prevent="save" class="form-con" v-if="startDateObj">
            <div class="field-row clearfix">
                <label class="field-label">卧床时间</label>

                <div class="field-con clearfix" @click="openPicker('startDate')">
                    <div class="col-fixed-7" v-html="startDateObj.chinaDateStr">2017年5月10日</div>

                    <div class="col-fixed-5" v-html="timeObj.startTimeStr">晚上 9:50</div>
                </div>
            </div>

            <div class="field-row clearfix">
                <label class="field-label">起床时间</label>

                <div class="field-con clearfix" @click="openPicker('endDate')">
                    <div class="col-fixed-7" v-html="endDateObj.chinaDateStr">2017年5月11日</div>

                    <div class="col-fixed-5" v-html="timeObj.endTimeStr">早上 7:30</div>
                </div>
            </div>

            <div class="field-row clearfix">
                <label class="field-label">睡眠时间</label>

                <div class="field-con clearfix">
                    <div class="col-fixed-7 font-size-small text-mute text-nowrap">（自动计算出来，不可编辑）</div>

                    <div class="col-fixed-5">{{data.SleepHours}}小时</div>
                </div>
            </div>

            <div class="field-row btn-con clearfix">
                <input type="submit" class="submit-btn" value="完成填写"/>
            </div>
        </form>

        <mt-popup v-model="showPicker" position="bottom" class="time-picker">
            <mt-picker ref="picker" :slots="slotData" :show-toolbar="true">
                <a class="time-picker-btn cancel-btn" href="javascript:" @click="closePicker">取消</a>

                <a class="time-picker-btn confirm-btn" href="javascript:" @click="handleConfirm">确认</a>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import mixin from "@/mixins/date-choose";

    const times = 24 * 60 * 60 * 1000; // 一天的毫秒数

    let noonMap = {
        "morning": "上午",
        "night": "下午"
    };
    let data = {
        DataDate: "2016-08-23", //string              数据日期,必填
        SleepHours: 0, // 可选	float            睡眠时间,（可选,需求修改该字段时传值即可）
        BedTime: "", // 可选	string            就寝时间,（可选,需求修改该字段时传值即可）
        GetUpTime: "" // 可选	string            起床时间,（可选,需求修改该字段时传值即可 ）
    };

    let hours = [];
    let minutes = [];

    for(let i = 0; i < 12; i++) {
        hours.push(i);
    }

    for(let i = 0; i < 60; i++) {
        let minute = i < 10 ? "0" + i :  i;

        minutes.push(minute);
    }

    let slotData = [
        {
            flex: 1,
            values: [noonMap.morning, noonMap.night],
            className: "slot1",
            textAlign: "right"
        },
        {
            flex: 1,
            values: hours,
            className: "slot2",
            textAlign: "center"
        },
        {
            divider: true,
            content: ":",
            className: "slot3"
        },
        {
            flex: 1,
            values: minutes,
            className: "slot4",
            textAlign: "center"
        }
    ];

    export default {
        mixins: [mixin],
        data() {
            return {
                slotData,
                apiType: 1,
                showPicker: false,
                currentPickerKey: "",
                startDateObj: null,
                endDateObj: null,
                timeObj: null,
                data: {
                    ...data
                }
            };
        },
        computed: {},
        components: {},
        mounted() {
            this.$root.setPageTitle("睡眠时间录入");

            this.initData(this.fetch);
        },
        methods: {
            //获取小时差
            formalTime(startDate, endDate) {
                let time = endDate.getTime() - startDate.getTime();
                let hour = this.$utils.divide(time, 60 * 60 * 1000).toFixed(2);

                let startDateObj = this.$utils.getCurrentTime(startDate);
                let endDateObj = this.$utils.getCurrentTime(endDate);
                let startTimeStr = `${noonMap.morning} ${Number(startDateObj.hours)}:${startDateObj.minutes}`;
                let endTimeStr = `${noonMap.morning} ${Number(endDateObj.hours)}:${endDateObj.minutes}`;

                const max = 12;

                if(startDateObj.hours > max) {
                    startDateObj.hours -= max;

                    startTimeStr = `${noonMap.night} ${Number(startDateObj.hours)}:${startDateObj.minutes}`;
                }

                if(endDateObj.hours > max) {
                    endDateObj.hours -= max;

                    endTimeStr = `${noonMap.night} ${Number(endDateObj.hours)}:${endDateObj.minutes}`;
                }

                return {
                    startTimeStr,
                    endTimeStr,
                    hour
                };
            },
            //获取数据
            fetch() {
                this.$ajax({
                    type: "get",
                    apiType: this.apiType,
                    request: {
                        name: "getHealthData"
                    },
                    data: {
                        date: this.date
                    }
                }).then((res) => {
                    let {SleepHours, BedTime, GetUpTime} = res.Data;
                    let startDate = new Date(this.$utils.getFormatDateStr(BedTime));
                    let endDate = new Date(this.$utils.getFormatDateStr(GetUpTime));
                    let currentDate = new Date(this.$utils.getFormatDateStr(this.date));

                    if(startDate.getTime() < currentDate.getTime()) {
                        startDate = currentDate;
                    }

                    if(endDate.getTime() < currentDate.getTime()) {
                        endDate = new Date(currentDate.getTime() + times);
                    }

                    let startDateObj = this.$utils.getCurrentTime(startDate);
                    let endDateObj = this.$utils.getCurrentTime(endDate);
                    let timeObj = this.formalTime(startDate, endDate);

                    BedTime = startDateObj.dateTimeStr;
                    GetUpTime = endDateObj.dateTimeStr;
                    SleepHours = timeObj.hour;

                    this.startDateObj = startDateObj;
                    this.endDateObj = endDateObj;
                    this.timeObj = timeObj;

                    this.data = {
                        ...this.data,
                        SleepHours,
                        BedTime,
                        GetUpTime
                    };
                });
            },
            //保存
            save() {
                let data = {
                    ...this.data,
                    DataDate: this.date
                };

                this.$ajax({
                    type: "post",
                    apiType: this.apiType,
                    request: {
                        name: "updateHealthData"
                    },
                    data
                }).then(() => {
                    this.$toast("保存成功");

                    this.fetch();
                });
            },
            //显示选项
            openPicker(key) {
                this.currentPickerKey = key;
                this.showPicker = true;
            },
            //关闭时间选项
            closePicker() {
                this.showPicker = false;
            },
            //选择
            handleConfirm() {
                let picker = this.$refs.picker;
                let noon = picker.getSlotValue(0);
                let hour = picker.getSlotValue(1);
                let minute = picker.getSlotValue(2);
                let str = "";
                let date;

                if(noon === noonMap.night) {
                    hour += 12;
                }

                if(this.currentPickerKey === "startDate") {
                    str = this.$utils.getFormatDateStr(this.startDateObj.dateStr);
                    date = new Date(`${str} ${hour}:${minute}:00`);

                    this.startDateObj = this.$utils.getCurrentTime(date);
                } else {
                    str = this.$utils.getFormatDateStr(this.endDateObj.dateStr);
                    date = new Date(`${str} ${hour}:${minute}:00`);

                    this.endDateObj = this.$utils.getCurrentTime(date);
                }

                this.timeObj = this.formalTime(this.startDateObj.self, this.endDateObj.self);

                this.data = {
                    ...this.data,
                    SleepHours: this.timeObj.hour,
                    BedTime: this.startDateObj.dateTimeStr,
                    GetUpTime: this.endDateObj.dateTimeStr
                };

                console.log("this.data:", this.data);

                this.closePicker();
            }
        }
    }
</script>

<style scoped></style>
