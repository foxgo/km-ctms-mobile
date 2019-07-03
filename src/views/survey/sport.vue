<template>
  <div v-cloak class="diet_content">
    <h2 class="title_h2">您的工作性质是？</h2>
    <label-select :data="dictMap['CM33.003']" :selected-value="sport.IsExercise" text-name="ItemName" value-name="ItemCode" mode="single" @change="onSingleChange"/>
    <h2 class="title_h2">您每周锻炼次数？</h2>
    <label-select :data="dictMap['CM33.11']" :selected-value="sport.WeeklyExercise" text-name="ItemName" value-name="ItemCode" mode="single" @change="onSingleChange"/>
    <h2 class="title_h2">平均每次锻炼时间？</h2>
    <label-select :data="dictMap['CM33.12']" :selected-value="sport.ExerciseMinutes" text-name="ItemName" value-name="ItemCode" mode="single" @change="onSingleChange"/>
    <h2 class="title_h2">您锻炼的自我感觉是？</h2>
    <label-select :data="dictMap['CM33.005']" :selected-value="sport.ExerciseState" text-name="ItemName" value-name="ItemCode" mode="single" @change="onSingleChange"/>
    <h2 class="title_h2">您经常进行的3种运动项目是？</h2>
    <label-select :data="dictMap['CM33.045']" :selected-value="sport.ExerciseWays" text-name="ItemName" value-name="ItemCode" type-name="ItemType" mode=" multiple" @change="onMultipleChange"/>
    <div class="btn"><mt-button type="primary" size="large" @click="saveData">保存</mt-button></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import LabelSelect from '@/components/LabelSelect'
import { getSport, saveSport } from '@/api/lifeStyle'
import { initDict, reduceArray } from '@/utils/index'
export default {
  name: 'Sport',
  components: { LabelSelect },
  data() {
    return {
      listLoading: true,
      dictMap: {},
      dictIds: [],
      sport: {
        LifeStyleID: undefined,
        IsExercise: undefined,
        WeeklyExercise: undefined,
        ExerciseMinutes: undefined,
        ExerciseState: undefined,
        ExerciseMode: undefined,
        ExerciseMode2: undefined,
        ExerciseMode3: undefined,
        ExerciseWays: []
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const promises = []
      this.dictIds = ['CM33.003', 'CM33.11', 'CM33.12', 'CM33.005', 'CM33.045']
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
      getSport().then(response => {
        this.sport = response.data
        this.sport.ExerciseWays = ['1', '2'] // todo 把string 转数组
        this.listLoading = false
      }, error => {
        this.listLoading = false
        console.log('[error] ' + error) // for debug
      })
    },
    onSingleChange: function(value) {
      switch (value.ItemType) {
        case 'CM33.041':
          value.select ? this.sport.IsExercise = value.ItemCode : this.sport.IsExercise = undefined
          break
        default:
          break
      }
    },
    onMultipleChange: function(values, type) {
      switch (type) {
        case 'CM33.045':
          this.sport.ExerciseWays = reduceArray(values, 'ItemCode')
          break
        default:
          break
      }
    },
    saveData() {
      this.listLoading = true
      saveSport(this.sport).then(() => {
        this.listLoading = false
        Toast({ title: '成功', message: '更新成功', type: 'success', duration: 2000 })
      }, error => {
        console.log('[error] ' + error) // for debug
        this.listLoading = false
      })
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
      text-align:left
      margin-top: $marginTop
  .title_h2
    title_h2()
</style>
