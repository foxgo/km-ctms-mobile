<template>
  <div v-cloak class="diet_content">
    <h2 class="title_h2"><span>家族病史</span>您的父母亲、兄弟姐妹、祖父母是否患有以下疾病？</h2>
    <label-select :data="dictMap['CM33.025']" :selected-value="Health.FHealthCategoryIDs" text-name="ItemName" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2"><span>疾病史</span>您是否患有以下疾病？</h2>
    <label-select :data="dictMap['CM33.026']" :selected-value="Health.DHealthCategoryIDs" text-name="ItemName" value-name="ItemCode" mode="single" />
    <div class="btn"><mt-button type="primary" size="large" @click="saveData">保存</mt-button></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import LabelSelect from '@/components/LabelSelect'
import { initDict } from '@/utils/index'
import { getHealthHistory, saveHealthHistory } from '@/api/lifeStyle'
export default {
  name: 'Health',
  components: { LabelSelect },
  data() {
    return {
      selected: '1',
      listLoading: true,
      dictMap: {},
      dictIds: [],
      Health: {
        BothDiabetes: null,
        BothHypertensive: null,
        FamilyHistoryRemark: null,
        FHealthCategoryIDs: null,
        PersonID: null,
        UserDeseaseRemark: null,
        DHealthCategoryIDs: null
      }

    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const promises = []
      this.dictIds = ['CM33.025', 'CM33.026']
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
      getHealthHistory().then(response => {
        this.Health = response.data
        this.listLoading = false
      }, error => {
        this.listLoading = false
        console.log('[error] ' + error) // for debug
      })
    },
    saveData() {
      this.listLoading = true
      saveHealthHistory(this.Health).then(() => {
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
      this.diseaseCode = value.ItemCode
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
    text-align:left
    margin-top:$marginTop

  .title_h2
    font-size:px2rem(26px)
    color:#b9b9b9
    text-align:left
    line-height:px2rem(40px)
    font-weight:normal
    margin-bottom:px2rem(20px)
    &>span
       font-size:px2rem(36px)
       color:#ff9600
</style>
