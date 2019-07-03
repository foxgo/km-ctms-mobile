<template>
  <div v-cloak class="diet_content">
    <h2 class="title_h2">您一周会有几天吃新鲜蔬菜</h2>
    <label-select :data="dictMap['CM33.014']" :selected-value="diet.WeeklyVegetables" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">每天大概吃多少？<span>（1碟蔬菜约150g）</span></h2>
    <label-select :data="dictMap['CM33.015']" :selected-value="diet.DailyVegetables" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">您一周会有几天吃新鲜水果？</h2>
    <label-select :data="dictMap['CM33.016']" :selected-value="diet.WeeklyFruit" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">每天大概吃多少？<span>（1个苹果约200g）</span></h2>
    <label-select :data="dictMap['CM33.017']" :selected-value="diet.DailyFruit" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">您一周会有几天吃禽/瘦肉？</h2>
    <label-select :data="dictMap['CM33.018']" :selected-value="diet.WeeklyMeat" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">每天大概吃多少？<span>（1个荤菜约100g）</span></h2>
    <label-select :data="dictMap['CM33.019']" :selected-value="diet.DailyMeat" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">每天食盐摄入量？<span>（1啤酒量约6g）</span></h2>
    <label-select :data="dictMap['CM33.006']" :selected-value="diet.DailySalt" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <div class="btn"><mt-button type="primary" size="large" @click="saveData">保存</mt-button></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import LabelSelect from '@/components/LabelSelect'
import { initDict } from '@/utils/index'
import { getEatHabit, saveEatHabit } from '@/api/lifeStyle'
export default {
  name: 'Diet',
  components: { LabelSelect },
  data() {
    return {
      listLoading: true,
      selected: '1',
      dictMap: {},
      dictIds: [],
      diet: {
        LifeStyleID: '',
        IsVegetables: '',
        WeeklyVegetables: '',
        DailyVegetables: '',
        IsFruit: '',
        WeeklyFruit: '',
        DailyFruit: '',
        IsMeat: '',
        WeeklyMeat: '',
        DailyMeat: '',
        DailySalt: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const promises = []
      this.dictIds = ['CM33.014', 'CM33.015', 'CM33.016', 'CM33.017', 'CM33.018', 'CM33.019', 'CM33.006']
      const promiseDict = initDict(this.$store, this.dictIds)
      if (promiseDict) {
        promises.push(promiseDict)
      }
      if (promises.length > 0) {
        Promise.all(promises).then(() => {
          this.getData()
        })
      } else {
        this.getData()
      }
    },
    setDict() {
      for (let i = 0, len = this.dictIds.length; i < len; i++) {
        this.$set(this.dictMap, this.dictIds[i], this.$store.state.dict.items.filter(item => item.ItemType === this.dictIds[i]))
      }
    },
    getData() {
      this.setDict()
      this.listLoading = true
      getEatHabit().then(response => {
        this.diet = response.data
        this.listLoading = false
      }, error => {
        this.listLoading = false
        console.log('[error] ' + error) // for debug
      })
    },
    saveData() {
      this.listLoading = true
      saveEatHabit(this.diet).then(() => {
        this.listLoading = false
        Toast({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }, error => {
        console.log('[error] ' + error) // for debug
        this.listLoading = false
      })
    },
    onLabelChange: function(value) {
      this.itemOne = value.ItemCode
      console.log(value.ItemCode)
    }

  }
}
</script>
<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .btn >>> .mint-button-text
    font-size:px2rem(32px)
  .btn >>> .mint-button
    btn()
  .diet_content
    text-align:left;
    margin-top:$marginTop
  .title_h2
    title_h2()
</style>
