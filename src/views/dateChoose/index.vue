<template>
    <div class="page-section date-choose-section clearfix">
        <!--<router-link class="km-header-bar" :to="{name: 'dailyHealth', query: {value}}">确认</router-link>-->
        <a class="km-header-bar" href="javascript:" @click="$utils.goBack">确认</a>

        <div class="calendar-wrap clearfix" v-if="dataItems.length">
            <div :class="{'calendar-bar clearfix': true, 'no-disable-btn': showNextMonthOfCurrentMonth}">
                <a class="calendar-btn km-arrow-left arrow-left-btn"></a>
                <div class="calendar-current">
                    <div class="swiper-container" id="calendar-current-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="obj in dataItems" >
                                <span v-html="formatMonthKey(obj.key)"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="calendar-btn arrow-right-btn km-arrow-right"></a>
            </div>

            <ul class="calendar-container calendar-header calendar-list clearfix">
                <li class="calendar-item" v-for="item in headers" v-html="item"></li>
            </ul>

            <div class="swiper-container" id="calendar-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="obj in dataItems">
                        <ul class="calendar-container calendar-list clearfix">
                            <li :class="{'calendar-item': true, 'no-current-month': !item.isCurrentMonth}" v-for="item in obj.data">
                                <span :class="{'calendar-date': true, 'active': value === item.dateStr}" v-html="Number(item.date)" @click="selectHandle(item)" v-if="!item.isAfterOfToday"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const weekday = {
        "0": "周日",
        "1": "周一",
        "2": "周二",
        "3": "周三",
        "4": "周四",
        "5": "周五",
        "6": "周六"
    };

    let mySwiper;
    let monthSwiper;

    export default {
        data() {
            return {
                activeIndex: 0,
                today: {},
                dataItems: [],
                value: ""
            };
        },
        computed: {
            headers() {
                let array = Object.values(weekday);
                let temp = array.splice(this.firstDayOfWeek);
                let list = temp.concat(array);

                return list;
            },
            date: {
                get() {
                    return this.$store.state.dailyHealth.date;
                },
                set(val) {
                    this.$store.state.dailyHealth.date = val;
                }
            }
        },
        props: {
            showNextMonthOfCurrentMonth: {
                type: Boolean,
                default: false
            },
            rangeCalendar: {
                type: Boolean,
                default: false
            },
            firstDayOfWeek: {
                type: Number,
                default: 0 // 从星期几开始， 同 weekday
            }
        },
        watch: {},
        components: {},
        mounted() {
            this.$root.setPageTitle("日期选择");

            this.init();
        },
        methods: {
            //初始化
            init() {
                let self = this;
                let value = this.date;
                let currentObj = this.today = this.getFormatTime();

                if(value) {
                    currentObj = this.getFormatTime(new Date(this.$utils.getFormatDateStr(value)));
                }

                let currentMonthData = this.getMonthData(`${currentObj.year}/${currentObj.month}/01`);

                let preMonthData = this.getPreMonthData(currentObj);
                let nextMonthData = this.getNextMonthData(currentObj);
                let dataItems = [preMonthData, currentMonthData];

                let slideChange = function(index) {
                    let dataItems = self.dataItems;
                    let key = dataItems[index].key + "-01";

                    let currentObj = dataItems[index].data.find(n => {
                        return `${n.year}-${n.month}-${n.date}` === key;
                    });

                    let preMonthKey = self.getPreMonthKeyObj(currentObj);
                    let nextMonthKey = self.getNextMonthKeyObj(currentObj);

                    let hasPreDataIndex = dataItems.findIndex(n => {
                        return n.key === preMonthKey.key;
                    });
                    let hasNextDataIndex = dataItems.findIndex(n => {
                        return n.key === nextMonthKey.key;
                    });

                    let preMonthData;
                    let nextMonthData;

                    if(hasNextDataIndex === -1) {
                        nextMonthData = self.getNextMonthData(currentObj);

                        let nextFirst = nextMonthData.data.find(n => {
                            return `${nextMonthKey.key}-01` === `${n.year}-${n.month}-${n.date}`;
                        });

                        if(!self.showNextMonthOfCurrentMonth && self.isNextMonthOfCurrentMonth(nextFirst)) {

                        } else {
                            dataItems.splice(index + 1, 0, nextMonthData);
                        }
                    }

                    if(hasPreDataIndex === -1) {
                        preMonthData = self.getPreMonthData(currentObj);

                        dataItems.unshift(preMonthData);

                        index = 1;

                        if(mySwiper) {
                            mySwiper.updateActiveIndex(index);
                        }

                        if(monthSwiper) {
                            monthSwiper.updateActiveIndex(index);
                        }
                    }

                    self.activeIndex = index;

                    self.$nextTick(() => {
                        if(mySwiper) {
                            mySwiper.update(true);
                        }

                        if(monthSwiper) {
                            monthSwiper.update(true);
                        }
                    });
                };

                if(this.showNextMonthOfCurrentMonth) {
                    dataItems.push(nextMonthData);
                }

                if(!value || new Date(value).getTime() > new Date(currentObj.dateStr).getTime()) {
                    value = currentObj.dateStr;
                }

                this.value = value;
                this.dataItems = dataItems;
                this.activeIndex = 1;

                this.$nextTick(() => {
                    this.createSwiper({
                        on:{
                            slidePrevTransitionEnd() {
                                slideChange(this.activeIndex);
                            },
                            slideNextTransitionEnd() {
                                slideChange(this.activeIndex);
                            }
                        }
                    });

                    this.createCurrentMonthSwiper();

                    mySwiper.controller.control = monthSwiper;

                    this.sliderToCurrentDate();
                });
            },
            //创建滑动
            createSwiper(option) {
                let self = this;

                let options = Object.assign({}, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    initialSlide: this.activeIndex,
                    autoplay: false,
                    navigation: {
                        nextEl: ".arrow-right-btn",
                        prevEl: ".arrow-left-btn"
                    },
                    on: {
                        slideChange() {
                            self.activeIndex = this.activeIndex;
                        }
                    }
                }, option);

                mySwiper = this.$createSwiper("#calendar-swiper", options);
            },
            //创建月份滑动
            createCurrentMonthSwiper(option) {
                let options = Object.assign({}, {
                    direction: "vertical",
                    spaceBetween: 0,
                    initialSlide: this.activeIndex,
                    control: false
                }, option);

                monthSwiper = this.$createSwiper("#calendar-current-swiper", options);

                monthSwiper.detachEvents(); //移除所有监听事件
            },
            // 月、日、时分秒等处理
            formatTime(value) {
                return value < 10 ? "0" + value : value;
            },
            // 格式化时间
            getFormatTime(current) {
                if(!current) {
                    current = new Date(); //获取系统当前时间
                }

                let year = this.formatTime(current.getFullYear());
                let month = this.formatTime(current.getMonth() + 1);
                let date = this.formatTime(current.getDate());
                let hours = this.formatTime(current.getHours()); //时
                let minutes = this.formatTime(current.getMinutes()); //分
                let seconds = this.formatTime(current.getSeconds()); //秒
                let day = current.getDay();
                let weekStr = `${weekday[day]}`.replace("星期", "周");

                if(!day) {
                    weekStr = "周日";
                }

                return {
                    year,
                    month,
                    date,
                    hours,
                    minutes,
                    seconds,
                    day,
                    dateStr: `${year}-${month}-${date}`,
                    dayStr: `${weekday[day]}`,
                    weekStr,
                };
            },
            //获取每月日历数
            getMonthData(date) {
                let array = [];
                let times = 24 * 60 * 60 * 1000; // 一天的毫秒数
                let startDate = new Date(date);
                let startDataObj = this.getFormatTime(startDate);
                let key = `${startDataObj.year}-${startDataObj.month}`;

                let firstDayOfWeek = this.firstDayOfWeek;

                //当前1号前面还有几天到 起始星期数
                let beforeSize = 0;
                let weekDay = 7;
                let maxSize = 42;

                if(startDataObj.day < firstDayOfWeek) {
                    beforeSize = weekDay - firstDayOfWeek +　startDataObj.day;
                } else if(startDataObj.day > firstDayOfWeek) {
                    beforeSize = startDataObj.day - firstDayOfWeek;
                }

                if(beforeSize) {
                    for(let i = 0; i < beforeSize; i++) {
                        let temp = new Date(startDate.getTime() - (i + 1) * times);
                        let tempObj = this.getFormatTime(temp);
                        let isAfterOfToday = this.isAfterOfToday(tempObj);

                        array.unshift({
                            ...tempObj,
                            isCurrentMonth: key === `${tempObj.year}-${tempObj.month}`,
                            isAfterOfToday
                        });
                    }
                }

                let afterSize = maxSize - array.length;

                for(let i = 0; i < afterSize; i++) {
                    let temp = new Date(startDate.getTime() + i * times);
                    let tempObj = this.getFormatTime(temp);
                    let isNextMonth = this.isNextMonthOfCurrentMonth(tempObj);
                    let isAfterOfToday = this.isAfterOfToday(tempObj);

                    array.push({
                        ...tempObj,
                        isCurrentMonth: key === `${tempObj.year}-${tempObj.month}`,
                        isNextMonth,
                        isAfterOfToday
                    });
                }

                return {
                    key,
                    data: array
                };
            },
            //获取当前月份上个月份数据Key
            getPreMonthKeyObj(currentObj) {
                let preMonth = Number(currentObj.month) - 1;
                let preMonthYear = Number(currentObj.year);

                if(preMonth === 0) {
                    preMonthYear = preMonthYear - 1;
                    preMonth = 12;
                }

                preMonth = this.formatTime(preMonth);

                return {
                    key: `${preMonthYear}-${preMonth}`,
                    first: `${preMonthYear}/${preMonth}/01`
                };
            },
            //获取当前月份上个月份数据
            getPreMonthData(currentObj) {
                let keyObj = this.getPreMonthKeyObj(currentObj);
                let preMonthData = this.getMonthData(keyObj.first);

                return preMonthData;
            },
            //获取当前月份下个月份数据Key
            getNextMonthKeyObj(currentObj) {
                let nextMonth = Number(currentObj.month) + 1;
                let nextMonthYear = Number(currentObj.year);

                if(nextMonth === 13) {
                    nextMonthYear = nextMonthYear + 1;
                    nextMonth = "01";
                }

                nextMonth = this.formatTime(nextMonth);

                return {
                    key: `${nextMonthYear}-${nextMonth}`,
                    first: `${nextMonthYear}/${nextMonth}/01`
                };
            },
            //获取当前月份下个月份数据
            getNextMonthData(currentObj) {
                let keyObj = this.getNextMonthKeyObj(currentObj);
                let nextMonthData = this.getMonthData(keyObj.first);

                return nextMonthData;
            },
            //是否当前月的下个月
            isNextMonthOfCurrentMonth(item) {
                let result = false;

                if(item) {
                    if(item.year === this.today.year) {
                        if(Number(item.month) >= (Number(this.today.month) + 1)) {
                            result = true;
                        }
                    } else if(item.year > this.today.year) {
                        result = true;
                    }
                }

                return result;
            },
            //是否为今天后的日期
            isAfterOfToday(item) {
                let req = /\-/g;
                let today = new Date(this.today.dateStr.replace(req, "/"));
                let date = new Date(item.dateStr.replace(req, "/"));
                let result = today.getTime() < date.getTime();

                return result;
            },
            //格式化月份显示
            formatMonthKey(key) {
                let array = key.split("-");
                let [year, month] = array;

                return `${year}/${Number(month)}`;
            },
            //滑动到获取当前日期 index
            sliderToCurrentDate() {
                let index = this.activeIndex;

                if(this.date) {
                    let dateObj = this.getFormatTime(new Date(this.$utils.getFormatDateStr(this.date)));
                    let key = `${dateObj.year}-${dateObj.month}`;

                    for(let i = 0; i < this.dataItems.length; i++) {
                        let data = this.dataItems[i].data;

                        let find = data.find(n => {
                            return n.dateStr === this.date;
                        });

                        if(find && data.key === key) {
                            index = i;

                            break;
                        }
                    }
                }

                if(mySwiper) {
                    mySwiper.slideTo(index);
                }
            },
            //选择
            selectHandle(item) {
                this.value = item.dateStr;

                this.date = item.dateStr;
            }
        }
    }
</script>

<style scoped></style>
