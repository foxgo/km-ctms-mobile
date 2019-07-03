<template>
  <div>
    <div class="sex">
      <div @click="popupVisible = true" >性别{{ selectedText }}</div>
    </div>
    <div class="selectPicker">
      <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker ref="picker" :slots="slotData" :visible-item-count="3" :show-toolbar="true" :value-key="textName" >
          <mt-button class="selectBtn cancel" @click="popupVisible = false">取消</mt-button>
          <mt-button class="selectBtn confirm" @click="handleConfirm">确认</mt-button>
        </mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
/**
   Auth: liuemeifang
   Created: 2019/2/14
*/
export default {
  name: 'Picker',
  props: {
    slotData: {
      type: [Array],
      required: true,
      default: function() {
        return [{
          flex: 1,
          values: [],
          className: 'slot1',
          defaultIndex: 0
        }]
      }
    },
    textName: {
      type: [String],
      required: false,
      default: ''
    },
    valueName: {
      type: [String],
      required: false,
      default: ''
    },
    selectedValue: {
      type: [String, Number],
      required: false,
      default: '请选择'
    },
    title: {
      type: [String],
      required: false,
      default: '选择分类'
    }
  },
  data() {
    return {
      popupVisible: false,
      currentTags: {}
    }
  },
  computed: {
    selectedText: function() {
      if (!this.currentTags) {
        return '请选择'
      }
      if (this.currentTags instanceof Object) {
        return this.currentTags[this.textName]
      } else {
        return this.currentTags
      }
    }
  },
  watch: {
    selectedValue: function(newValue) {
      this.updateValue(newValue)
    }
  },
  methods: {
    handleConfirm() {
      this.popupVisible = false
      this.currentTags = this.$refs.picker.getValues()[0]
      this.$emit('change', this.currentTags) // 把change传给父级
    },
    updateValue(val) {
      const len = this.slotData[0].values.length
      if (len <= 0) {
        return
      }
      if (this.slotData[0].values[0] instanceof Object) {
        const valueName = this.valueName
        for (let i = 0; i < len; i++) {
          if (this.slotData[0].values[i][valueName] === val) {
            this.slotData[0].defaultIndex = i
            this.currentTags = this.slotData[0].values[i]
            break
          }
        }
      } else {
        const index = this.slotData[0].values.indexOf(val)
        this.slotData[0].defaultIndex = index
        this.currentTags = this.slotData[0].values[index]
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .selectPicker >>>.mint-popup
    width:100%
  .selectPicker >>> .picker-toolbar
    display:flex
    width: 100%
    background-color:#f2f2f2
  .selectPicker  >>>.mint-button--default
    background-color:transparent
    box-shadow :none
  .selectBtn
    padding:0 5%
    font-size:15px
    flex:1
  .confirm
    text-align:right
    color:#008dfd
  .cancel
    text-align:left

</style>
