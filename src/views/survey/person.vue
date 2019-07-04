<template>
  <div v-cloak class="person">

    <!--<div> 日期：<datetime-picker/></div>-->
    <!-- <label-select :data="testData" :selected-value="person.Sports" text-name="ItemName" value-name="ItemCode" mode="single" /> -->
    <!--<picker :slot-data="yearSlot" :selected-value="person.Gender" text-name="ItemName" value-name="ItemCode" @change="onChange"/>-->
    <mt-field v-model="person.Name" label="用户名" placeholder="请输入用户名" type="text"/>
    <!--<mt-field v-model.trim="person.Name" :state="$v.person.Name.$invalid ? 'error': 'success'" type="text" label="用户名" placeholder="请输入用户名" @input="$v.person.Name.$touch()"/>-->
    <mt-field v-model="person.Gender" type="text" label="性别" placeholder="请输入性别"/>
    <!--<div>性别：<span class="iconfont">&#xe63a;</span><span class="iconfont icon-sex">&#xe639;</span></div>-->
    <!--<mt-field v-model="person.Birthdate" type="date" label="出生年月" placeholder="请输入出生日期" />-->
    <mt-cell v-model="person.Birthdate" type="date" title="出生年月" to="/" is-link value="请输入出生日期"/>
    <mt-field v-model="person.PersonNo" type="text" label="身份证" placeholder="请输入身份证"/>
    <mt-field v-model="person.Phone" label="手机号" placeholder="请输入手机号" type="tel" />
    <!--<mt-field v-model="person.Phone" :state="$v.person.Phone.$invalid ? 'error': 'success'" type="text" label="手机号" placeholder="请输入手机号" @input="$v.person.Phone.$touch()"/>-->
    <mt-field v-model="person.Height" type="number" label="身高" placeholder="请输入身高"/>
    <mt-field v-model="person.Weight" type="number" label="体重" placeholder="请输入体重"/>
    <mt-field v-model="person.MarriageStatus" type="text" label="婚姻史" placeholder="请输入体重"/>
    <mt-field v-model="person.IMEI" type="text" label="IMEI" placeholder="请输入IMEI"/>
    <div class="btn"><mt-button :disabled="$v.$invalid || loading" type="primary" size="large" @click="saveData">保存</mt-button></div>
    <!--<ul><li v-for="err in errors" v-text="err"/></ul>-->
    <!--</form>-->
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Picker from '@/components/Picker'
// import DatetimePicker from '@/components/Picker/DatetimePicker'
import LabelSelect from '@/components/LabelSelect'
import { getPersonInfo, updatePerson } from '@/api/person'
import { initDict } from '@/utils/index'

/* import { initDict, reduceArray } from '@/utils/index'*/

export default {
  name: 'Person',
  components: { LabelSelect, Picker },
  data() {
    return {
      // loading: false, // 正在请求
      popupVisible: false,
      person: {
        Name: undefined,
        Gender: undefined,
        Birthdate: undefined,
        PersonNo: undefined,
        Phone: undefined,
        Height: undefined,
        Weight: undefined,
        MarriageStatus: undefined,
        IMEI: undefined,
        Sports: []
      },
      yearSlot: [{
        flex: 1,
        values: [],
        className: 'slot1',
        defaultIndex: 0
      }],
      testData: []
    }
  },
  validations: {
    person: {
      Name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
      Phone: {
        required
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {

    getData() {
      this.loading = true
      const promises = []
      const codes = ['CM33.014', 'CM33.015']
      const promiseDict = initDict(this.$store, codes)
      if (promiseDict) {
        promises.push(promiseDict)
      }
      if (promises.length > 0) {
        Promise.all(promises).then(() => {
          this.getPerson()
        })
      } else {
        this.getPerson()
      }
    },
    setDict() {
    //  this.yearSlot[0].values = this.$store.state.dict.items.filter(item => item.ItemType === 'CM33.014')
      this.testData = this.$store.state.dict.items.filter(item => item.ItemType === 'CM33.014')
    },
    getPerson() {
      this.setDict()
      getPersonInfo().then(response => {
        this.person = response.data
        //   this.loading = false
        console.log(this.person)
        // this.selectedValue = '4'
      //  this.person.Sports = ['4']
      })
    },
    saveData() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        updatePerson(this.person).then(() => {
          this.loading = false
          Toast({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }, error => {
          console.log('[error] ' + error) // for debug
          this.loading = false
        })
      }
    },
    onChange: function(value) {
      this.person.Gender = value.ItemCode
    },
    /* onLabelChange: function(value) {
      this.person.Sports = reduceArray(value, 'ItemCode')
      console.log(this.person.Sports)
    }*/
    onLabelChange: function(value) {
      this.person.Sports = value.ItemCode
      console.log(this.person.Sports)
    }
  }
}
</script>
<style scoped lang="stylus" >

  @import '~@/assets/styles/varibles.styl'
  .person >>> .mint-cell-title{font-size:px2rem(32px);text-align:left}
  .person >>> .mint-field-core{font-size:px2rem(32px);text-align:right}
  .person >>> .mint-cell{min-height:px2rem(95px)}
    .btn >>> .mint-button-text
       font-size:px2rem(32px)
    .btn >>> .mint-button
       btn()
    .person
       margin-top:px2rem(88px)
  .mint-field,.mint-cell
    border-bottom:1px solid #e7e7e7
  .mint-field-core
    text-align:right !important
  .mint-cell-title
     text-align:left

  .mint-field-core
    font-size:px2rem(36)
</style>

