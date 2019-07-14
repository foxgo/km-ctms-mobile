/**
 * Created by huangyh(黄永号) on 2019/07/13.
 */
const times = 24 * 60 * 60 * 1000; // 一天的毫秒数

let mixin = {
    data() {
        return {
            today: ""
        };
    },
    computed: {
        date: {
            get() {
               return this.$store.state.dailyHealth.date;
            },
            set(val) {
                this.$store.state.dailyHealth.date = val;
            }
        }
    },
    beforeCreate() {},
    mounted() {},
    methods: {
        //设置今天
        initData(callback) {
            let obj = this.$utils.getCurrentTime();
            let today = obj.dateStr;
            let value = this.date;

            if(!value || new Date(value).getTime() > new Date(today).getTime()) {
                value = today;
            }

            this.today = today;
            this.date = value;

            if(callback) {
                callback();
            }
        },
        //获取上一天
        getPrevDate() {
            let date = new Date(this.$utils.getFormatDateStr(this.date));
            let targetDate = new Date(date.getTime() - times);
            let targetObj = this.$utils.getCurrentTime(targetDate);

            this.date = targetObj.dateStr;

            this.fetch();
        },
        //获取下一天
        getNextDate() {
            if(this.today === this.date) {
                return;
            }

            let date = new Date(this.$utils.getFormatDateStr(this.date));
            let targetDate = new Date(date.getTime() + times);
            let targetObj = this.$utils.getCurrentTime(targetDate);

            this.date = targetObj.dateStr;

            this.fetch();
        },
        //获取当天的数据
        fetch() {}
    }
};

export default mixin;
