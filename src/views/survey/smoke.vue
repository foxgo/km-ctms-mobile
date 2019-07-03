<template>
  <div v-cloak class="diet_content">
    <h2 class="title_h2">您吸烟吗？</h2>
    <label-select :data="dictMap['CM33.001']" :selected-value="SmokeDrink.IsSmoking" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">您饮酒吗？</h2>
    <label-select :data="dictMap['CM33.002']" :selected-value="SmokeDrink.IsDrink" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">您平均每周喝几次酒？</h2>
    <label-select :data="dictMap['CM33.13']" :selected-value="SmokeDrink.IsSmoking" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">您平均每天喝多少量？</h2>
    <ul class="alcohol">
      <li>
        <h3>白酒</h3>
        <label-select :data="dictMap['CM37.11']" :selected-value="SmokeDrink.SpiritDailyDrink" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
      </li>
      <li>
        <h3>黄酒</h3>
        <label-select :data="dictMap['CM37.12']" :selected-value="SmokeDrink.YellowWineDailyDrink" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
      </li>
      <li>
        <h3>红酒</h3>
        <label-select :data="dictMap['CM37.13']" :selected-value="SmokeDrink.RedWineDailyDrink" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
      </li>
      <li>
        <h3>啤酒</h3>
        <label-select :data="dictMap['CM37.14']" :selected-value="SmokeDrink.BeerDailyDrink" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
      </li>
    </ul>
    <div class="btn"><mt-button type="primary" size="large" @click="saveData">保存</mt-button></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import LabelSelect from '@/components/LabelSelect'
import { initDict } from '@/utils/index'
import { getSmokeDrink, saveSmokeDrink } from '@/api/lifeStyle'
export default {
  name: 'Smoke',
  components: { LabelSelect },
  data() {
    return {
      selected: '1',
      listLoading: true,
      dictMap: {},
      dictIds: [],
      SmokeDrink: {
        LifeStyleID: null,
        IsSmoking: null,
        StartSmokingAge: null,
        QuitStartSmokingAge: null,
        QuitEndSmokingAge: null,
        QuitSecondhandSmoke: null,
        SecondhandSmoke: null,
        DailySmoking: null,
        TobaccoDailySmoking: null,
        IsTobaccoSmoking: null,
        IsOrdinarySmoking: null,
        IsDrink: null,
        WeeklyDrink: null,
        RedWineDailyDrink: null,
        SpiritDailyDrink: null,
        YellowWineDailyDrink: null,
        BeerDailyDrink: null,
        OtherDrinkName: null
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const promises = []
      this.dictIds = ['CM33.001', 'CM33.002', 'CM33.13', 'CM37.11', 'CM37.12', 'CM37.13', 'CM37.14']
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
      getSmokeDrink().then(response => {
        this.SmokeDrink = response.data
        this.listLoading = false
      }, error => {
        this.listLoading = false
        console.log('[error] ' + error) // for debug
      })
    },
    saveData() {
      this.listLoading = true
      saveSmokeDrink(this.SmokeDrink).then(() => {
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
  .btn >>> .mint-button-text{font-size:px2rem(32px)}
  .btn >>> .mint-button
    btn()
  .diet_content
     text-align:left
     margin-top:$marginTop
     & ul
      padding-left:0
  .title_h2
    title_h2()
    &>span
      font-size:px2rem(28px)
      font-weight:normal
      color:#999
  .mint-cell-value
     margin-top:30px

  .mt-cell
     border-bottom:none
  .mint-cell-wrapper
      height:30px
  .alcohol
      margin-top:0
      & li
        height:px2rem(80px)
      & h3
        display:inline-block
        font-size:px2rem(28px)
        color:#333
        font-weight:normal
        width: 15%
      & ul
        display:inline-block
</style>

