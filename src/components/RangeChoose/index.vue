<template>
    <div class="range-choose clearfix">
        <ul class="range-list clearfix">
            <li :class="{'long-item': isLong(item)}" :style="{width: (100 / dataItems.length) + '%'}" v-for="item in dataItems">
                <span class="range-text" v-html="item" v-if="isLong(item)"></span>
            </li>
        </ul>

        <div class="range-btn" :style="{left: getSliderLeft()}">
            <div class="range-tip" v-html="`${rangeValue}${unit}`"></div>
        </div>

        <mt-range :min="min" :max="max" :step="step" :bar-height="barHeight" v-model="rangeValue"></mt-range>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rangeValue: 0,
                dataItems: []
            };
        },
        model: {
            prop: "data",
            event: "change"
        },
        computed: {},
        props: {
            data: {
                type: Number,
                default: 0
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            barHeight: {
                type: Number,
                default: 0
            },
            unit: {
                type: String,
                default: ""
            }
        },
        watch: {
            rangeValue(val) {
                this.$emit("change", val);
            }
        },
        components: {},
        mounted() {
            this.init();
        },
        methods: {
            //初始化
            init() {
                let dataItems = [];

                for(let i = this.min; i <= this.max; i += this.step) {
                    dataItems.push(i);
                }

                this.dataItems = dataItems;
                this.rangeValue = this.data;
            },
            //是否长粗刻度
            isLong(item) {
                return item % 10 === 0;
            },
            //获取滑动left值
            getSliderLeft() {
                let per = (100 / this.dataItems.length);
                let left = per * (this.rangeValue - this.min);

                return left + "%";
            }
        }
    }
</script>

<style scoped></style>
