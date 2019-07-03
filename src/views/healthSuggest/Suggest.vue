<template>
  <div class="health_content">
    <div class="suggest_box">
      <div class="suggest_currently">
        <div>
          <p>目前处于生命周期<span>{{ suggest.Period }}</span></p>
          <p>{{ suggest.Sex }}<span>{{ suggest.Age }}</span></p>
        </div>
        <img :src="imgUrl" >
      </div>
      <div class="suggest_problem">
        <h2><img :src="iconUrl" >常见健康问题</h2>
        <ul>
          <li v-for="(item, index) in suggest.HealthProblemItems" :key="index">{{ item.Name }}</li>
        </ul>
      </div>
      <div class="suggest_detailed">
        <ul class="ul_tab">
          <li v-for="(item, index) in suggestTab" :key="index" :class="{active: showBoxId === index}" @click="changeBox(index)"><span>{{ item.title }}</span></li>
        </ul>
        <div id="suggest_list" class="suggest_list">
          <div class="item show">
            <p><i/>{{ suggest.PhysicalExamination }}</p>
            <div class="shopLink"><a href="" @click="GoBATHealthCounseling">#健康咨询#</a></div>
          </div>
          <div class="item">
            <p v-for="(item, index) in suggest.LifeStyles" v-if="item != ''" :key="index"><i/>{{ item }}</p>
            <div class="shopLink"><a href="">#健康咨询#</a><a href="#">#健康商城#</a></div>
          </div>
          <div class="item">
            <p v-for="(item, index) in suggest.Vaccine" v-if="item != ''" :key="index"><i/>{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="careBtn">
      <router-link :to="{ name: 'CareFamily'}">关爱<br>家人</router-link>
    </div>
  </div>
</template>

<script>
import { getSuggest } from '@/api/suggest'
import { formatDate } from '../../filters'
export default {
  name: 'Suggest',
  data() {
    return {
      showBoxId: 0,
      suggestTab: [
        { title: '健康体检建议' },
        { title: '生活方式建议' },
        { title: '预防接种建议' }
      ],
      imgUrl: require('../../assets/images/suggest/bg_aaa@3x.png'),
      iconUrl: require('../../assets/images/suggest/iconfont_message@3x.png'),
      suggest: {}
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$store.state.app.pageTitle = '生命周期健康建议'
  },
  methods: {

    getData() {
      this.listLoading = true
      var age = null
      var gender = null
      var period = null
      var now = new Date()
      var month = formatDate(new Date(now), 'M')
      console.log(month)
      if (month < 1) {
        period = '新生儿'
        age = month
      }
      if (month >= 1 && month <= 11) {
        period = '婴儿期'
        age = month
      }

      if (month > 11 && month <= 35) {
        period = '幼儿期'
        age = month
      }

      var year = Math.floor(month / 12)
      if (year >= 3 && year < 4) {
        period = '幼儿期'
        age = year
      }
      if (year >= 4 && year < 7) {
        period = '学龄前期'
        age = year
      }
      if (year >= 7 && year < 13) {
        period = '学龄期'
        age = year
      }
      if (year >= 13 && year < 18) {
        period = '少年期'
        age = year
      }
      if (year >= 18 && year < 40) {
        period = '青年期'
        age = year
      }
      if (year >= 40 && year < 65) {
        period = '中年期'
        age = year
      }
      if (year >= 65) {
        period = '老年期'
        age = year
      }
      getSuggest(age, gender, period).then(response => {
        this.suggest = response.data;
        console.log(JSON.stringify(response.data))
        if (this.suggest.Sex === 1) {
          this.suggest.Sex = '男'
        } else if (this.suggest.Sex === 1) {
          this.suggest.Sex = '女'
        }
        if (period === '新生儿' || period === '婴儿期' || (period === '幼儿期' && age > 11 && age <= 36)) {
          this.suggest.Age = age + '月'
        } else if (period === '孕早期' || period === '孕中期' || period === '孕晚期') {
          this.suggest.Age = age.split(',')[0] + '岁'
        } else {
          this.suggest.Age = age + '岁'
        }
        this.suggest.LifeStyles = this.suggest.LifeStyle.replace(/[\s]/g, '').split('.') // 把一字符串分割成数组
        this.suggest.Vaccine = this.suggest.Vaccine.replace(/[\s]/g, '').split('.')
        this.listLoading = false
      }, error => {
        this.listLoading = false
        console.log('[error] ' + error) // for debug
      })
    },
    changeBox(index) { // 切换
      this.showBoxId = index
      var tabs = document.getElementsByClassName('ul_tab')[0].getElementsByTagName('li')
      var contents = document.getElementsByClassName('suggest_list')[0].getElementsByClassName('item')
      for (var i = 0; i < tabs.length; i++) {
        if (i === index) {
          contents[i].setAttribute('class', 'item show')
        } else {
          contents[i].setAttribute('class', 'item')
        }
      }
    },
    GoBATHealthCounseling() {

    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .suggest_box
     text-align:left
     padding-top:px2rem(20)
     &>.suggest_currently
          height:px2rem(156)
          width: 97%
          overflow:hidden
          border-radius :px2rem(20)
          background-color: #fff
          box-sizing :border-box
          position:relative
          margin:0 auto
          &>img
            position:absolute
            width:110%
            top:0
            left:0
          &>div
            position:absolute
            z-index:4
            padding:px2rem(36)
            text-align:left
            line-height:px2rem(50)
            &>p:nth-child(1)
              font-size: px2rem(26)
              font-weight: 500;
              color: #AFAFAF
              &>span
                font-size:px2rem(32)
                padding-left:px2rem(20)
                color: #008dfd
            &>p:nth-child(2)
               font-size:px2rem(26)
               &>span
                  padding-left:px2rem(20)
     &>.suggest_problem
            width: 97%
            overflow:hidden
            border-radius :px2rem(20)
            background-color: #fff
            box-sizing :border-box
            margin:px2rem(20) auto
            padding:px2rem(20) px2rem(36)
            &>h2
              font-size:px2rem(36)
              &>img
                 display:inline-block
                 width:px2rem(29)
                 height:auto
                 vertical-align :top
                 margin-right:px2rem(10)
            &>ul
              margin-top:px2rem(30)
              display:flex
              flex-wrap: wrap
              margin-bttom:0
              &>li
                max-width:px2rem(400)
                margin-right:px2rem(8)
                font-size:px2rem(26)
                margin-bottom:10px
                border-radius :px2rem(20)
                border:1px solid #e2e2e3
                padding:px2rem(10) px2rem(20)
     &>.suggest_detailed
            margin:px2rem(20) auto
            background-color:#fff
            &>ul
              display:flex
              height:px2rem(80)
              line-height:px2rem(80)
              text-align:center
              &>li
                flex:1
                font-size:px2rem(32)
                border-bottom:1px solid #e2e2e3
              &>li.active>span
                border-bottom: 2px solid #008dfd
                padding-bottom:px2rem(20)
                color: #008dfd
            &>.suggest_list
               padding:px2rem(20) px2rem(36)
               &>.item
                  display:none
               &>.show
                   display:block
               &>.item>p
                  font-size:px2rem(26)
                  line-height:px2rem(40)
                  margin-bottom:px2rem(20)
                  &>i
                    display:inline-block
                    border-radius :50%
                    width:px2rem(11)
                    margin-right:10px
                    height:px2rem(11)
                    vertical-align:middle
                    background-color:#008dfd
               &>.item>.shopLink>a
                    font-size:px2rem(32)
                    margin-right:px2rem(20)
                    color:#008dfd
  .careBtn
    position: fixed
    z-index: 8
    right:10px
    bottom:10px
    border-radius: 50px
    width: px2rem(140)
    height: px2rem(140)
    border: 4px solid rgba(214,237,251,1)
    padding: px2rem(22)
    box-sizing :border-box
    color: rgba(0,174,255,1)
    background: #fff
    text-align: center
    font-size: px2rem(30)
    line-height: px2rem(40)
    box-shadow: 3px 1px 20px rgba(214,237,251,1)
    &>a
     color: rgba(0,174,255,1)
</style>
