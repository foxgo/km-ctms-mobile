<template>
    <div class="picker-box">
        <div @click="showPicker"><span v-if="county">{{province+' '+city+' '+county}}</span><span v-else>请选择</span></div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
            <mt-picker
                ref="picker"
                :slots="dataSource" 
                @change="onValueChanged"
                :visible-item-count="7"
                value-key="seletedArea"
                :show-toolbar="true"
            >
                <div class="picker-toolbar-title">
                    <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
                    <div class="usi-btn-sure" @click="handleConfirm">确定</div>
                </div>
            </mt-picker>

        </mt-popup>
    </div>
</template>

<script>
import areaData from './areaData.json' //引入省市区数据
import { Picker } from 'mint-ui'
export default {
    name: 'AreaPicker',
    components: {
      'mt-picker': Picker
    },
    data() {
        return {
            popupVisible: false,
            dataSource: [
                {
                    flex: 1,
                    defaultIndex: 0,    
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    defaultIndex: 0,    
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                },
                {
                    flex: 1,
                    defaultIndex: 0,    
                    values: [],
                    className: 'slot5',
                    textAlign: 'center'
                }
            ],
            province:'',
            city:'',
            county:'',
        }
    },
    mounted(){
      this.$nextTick(() => { // vue里面全部加载好了再执行的函数  （类似于setTimeout）
        // 设置初始状态数据
        var provinceArr = areaData.map(province => province.n)
        var cityArr = areaData[0].l.map(city => city.n)
        var arearr = areaData[0].l[0].l
        this.dataSource[0].values = provinceArr
        this.dataSource[2].values = cityArr
        this.dataSource[4].values = arearr
      });
    },
    methods: {
        showPicker() {
          this.popupVisible = true
        },

        // 确定
        handleConfirm() {
            this.$emit('showArea', this.province+' '+this.city+' '+this.county) // 把值传给父级
        },

        onValueChanged(picker,values) {
            if(this.dataSource[4].values.length <=0) return;
            var provinceArr,cityArr,arearr;

            this.province = values[0];

            // 查找当前省份的索引
            var provinceArr = areaData.map(province => province.n)
            let provinceIndex = provinceArr.indexOf(values[0])
            // 当前省份下的城市
            var cityArr = areaData[provinceIndex].l.map(city => city.n)
            // 查找当前城市的索引
            let cityIndex = cityArr.indexOf(values[1]) 
            // 当前城市下的区县
            var arearr = areaData[provinceIndex].l[cityIndex>0?cityIndex:0].l

            picker.setSlotValues(1,cityArr);
            picker.setSlotValues(2,arearr);

            this.province = values[0];
            this.city = values[1];
            this.county = values[2];
        }
    }
}
</script>

<style scoped lang="stylus">
.picker-box >>>.mint-popup
    width :100%
.picker-box >>>.picker-toolbar
     bacakground-color:#f2f2f2 !important
     margin:0 auto

.picker-box >>>.picker-toolbar-title
    display: flex
    flex-direction: row
    justify-content: space-around
    height: 40px
    line-height: 40px
    font-size: 16px

    .usi-btn-cancel
        color: #333
        margin-left -30%
    .usi-btn-sure 
        color: #26a2ff
        margin-right -30%

.picker-box:after
    background-color red
    height 1px
    width 100%
</style>
