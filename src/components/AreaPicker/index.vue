<template>
    <div class="picker-box">
        <div @click="showPicker"><span v-if="province_city_county_string">{{province_city_county_string}}</span><span v-else>请选择</span></div>
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
import areaData from '@/data/areaData_id.json' //引入省市区数据
import { Picker } from 'mint-ui'
export default {
    name: 'AreaPicker',
    components: {
      'mt-picker': Picker
    },
    props: {
        pro_city_county_obj: {
            type: Object,
            default: {}
        }
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
  
            province_city_county_string:'',

            /*
            {"province":{"value":"北京市","id":"110000000000"},
            "city":{"value":"市辖区","id":"110100000000"},
            "county":{"value":"东城区","id":"110101000000"}}
            */
            province_city_county_obj:{}
        }
    },
    watch: {
        pro_city_county_obj(newVal) {
            if (!!newVal && Object.keys(newVal).length >= 3) {
                const obj = newVal
                this.province_city_county_string = obj.province.value + ' ' + obj.city.value + ' ' + obj.county.value
            }
        }
    },
    mounted(){
      this.$nextTick(() => { // vue里面全部加载好了再执行的函数  （类似于setTimeout）
        // 设置初始状态数据
        var provinceArr = areaData.map(province => province.n)
        var cityArr = areaData[0].l.map(city => city.n)
        var arearr = areaData[0].l[0].l.map(area => area.n)
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
            this.province_city_county_string = this.province_city_county_obj.province.value + ' ' + this.province_city_county_obj.city.value + ' ' + this.province_city_county_obj.county.value
            // 把值传给父级
            this.$emit('showAreaData', this.province_city_county_obj) 
            this.popupVisible = false
        },

        onValueChanged(picker,values) {
            if(this.dataSource[4].values.length <=0) return;
            var provinceArr,cityArr,arearr;

            // 查找当前省份的索引
            var provinceArr = areaData.map(province => province.n)
            let provinceIndex = provinceArr.indexOf(values[0])
            // 当前省份下的城市
            var cityArr = areaData[provinceIndex].l.map(city => city.n)
            // 查找当前城市的索引
            let cityIndex = cityArr.indexOf(values[1]) 
            // 当前城市下的区县
            var arearr = areaData[provinceIndex].l[cityIndex>0?cityIndex:0].l.map(area => area.n)
            let areaIndex = arearr.indexOf(values[2]) 

            picker.setSlotValues(1,cityArr);
            picker.setSlotValues(2,arearr);

            // 获取省份城市区县的id
            let province = areaData[provinceIndex]
            if(!province) { return }
            let city = province.l[cityIndex]
            if(!city) { return }
            let area = areaData[provinceIndex].l[cityIndex].l[areaIndex]
            if(!area) { return }
            // console.log(JSON.stringify(area))

            this.province_city_county_obj = {
                province: { value: values[0], id: province.id},
                city: { value: values[1], id: city.id},
                county: { value: values[2], id: area.id}
            }
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

//设置显示不下的内容以...表示
.picker-box >>>span 
    overflow: hidden 
    white-space: nowrap
    text-overflow: ellipsis
    display: block
</style>
