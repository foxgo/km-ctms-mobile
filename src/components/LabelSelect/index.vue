<template>
  <ul class="label_ul">
    <li v-for="item in data" :key="item[valueName]" :class="item.select ? 'itemActive' : 'itemList'" class="itemLi" style="position:relative" @click="handleChange(item)">
      <span>{{ item[textName] }}</span>  <!--{{ item.select }}-->
      <i class="iconfont icon-yes">&#xe632;</i>
    </li>
  </ul>
</template>

<script>
/**
   Auth: liuemeifang
   Created: 2019/2/15
*/
import { deepClone } from '@/utils/index'
export default {
  name: 'LabelSelect',
  props: {
    data: {
      type: [Array],
      required: true,
      default: function() {
        return []
      }
    },
    mode: {
      type: [String],
      required: false,
      default: 'single' // multiple,single
    },
    textName: {
      type: [String],
      required: false,
      default: 'ItemName'
    },
    valueName: {
      type: [String],
      required: false,
      default: 'ItemCode'
    },
    typeName: {
      type: [String],
      required: false,
      default: 'ItemType'
    },
    selectedValue: {
      type: [String, Number, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      currentTags: [],
      selectValues: [],
      currentTag: {},
      once: true
    }
  },
  watch: {
    selectedValue: function(newValue) {
      if (this.once) {
        if (this.mode !== 'single') {
          this.selectValues = deepClone(newValue)
        }
        this.initData()
        this.updateValue(newValue)
      }
    }
  },
  methods: {
    handleChange(item) {
      if (this.mode === 'single') {
        this.updateValue(item[this.valueName])
        this.$emit('change', this.currentTag)
      } else {
        this.currentTags = []
        if (this.selectValues.some(id => item[this.valueName] === id)) {
          const i = this.selectValues.indexOf(item[this.valueName])
          this.selectValues.splice(i, 1)
        } else {
          this.selectValues.push(item[this.valueName])
        }
        this.updateValue(this.selectValues)
        this.once = false
        this.$emit('change', this.currentTags, item[this.typeName])
      }
    },
    updateValue(val) {
      const len = this.data.length
      if (len <= 0) {
        return
      }
      const valueName = this.valueName
      for (let i = 0; i < len; i++) {
        if (this.mode === 'single') {
          if (this.data[i][valueName] === val) {
            // if (this.data[i]['select']) {
            //   this.data[i]['select'] = false
            // } else {
            //   this.data[i]['select'] = true
            //   this.currentTags = this.data[i]
            // }
            this.data[i]['select'] = true
            this.currentTag = this.data[i]
          } else {
            this.data[i]['select'] = false
          }
        } else {
          if (val.some(id => this.data[i][valueName] === id)) {
            this.data[i]['select'] = true
            this.currentTags.push(this.data[i])
          } else {
            this.data[i]['select'] = false
          }
        }
      }
    },
    initData() {
      for (const item of this.data) {
        if (!item.hasOwnProperty('select')) {
          this.$set(item, 'select', false)
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
 .itemLi
    display:inline-block
    padding-left:px2rem(25px)
    padding-right:px2rem(25px)
    padding-top:px2rem(16px)
    border: 1px solid
    border-radius: px2rem(40px)
    margin-right:px2rem(24px)
    margin-bottom:px2rem(22px)
    height:px2rem(40px)
    font-size:px2rem(28px)
  .itemActive
     border-color:#008dfd
     color:#008dfd
     &>.icon-yes
        display:inline-block
        position:absolute
        right: 0
        top:px2rem(-2px)
        height:px2rem(17px)
        font-size:px2rem(28px)
        background:#fff
  .itemList
     border-color:#eee
     color:#868585
  .label_ul
     margin-top:0
     margin-bottom:0
 .icon-yes
   display:none
</style>
