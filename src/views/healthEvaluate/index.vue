<template>
    <div class="health_evaluate normal-page-box">
      <div id="scoreTips" :style="{display: showScoreTips == true ? 'block' : 'none'}">
        <ul :class="showScoreTips == true ? 'isFixed' :''">
          <li>总分 <span style="background: rgb(220,103,17);">{{healthScore}}</span></li>
          <li>生理 <span style="background: rgb(37,191,255);">{{physiologicalHealthScore}}</span></li>
          <li>心理 <span style="background: rgb(255, 164, 57);">{{psychologyHealthScore}}</span></li>
          <li>社会 <span style="background: rgb(0, 200, 132);">{{socialHealthScore}}</span></li>
        </ul>
      </div>
      <section id="head">
        <div id="score_synthesize">
          <span class="head_title_text">综合评分:</span>
          <span id="head_span_score" class="head_content_text">{{healthScore ? healthScore : 0}}</span>
          <span id="head_span_grade" class="head_content_text">{{healthGrade ? healthGrade : 0}}</span>
        </div>
        <div id="score_details">
          <svg>
            <circle cx="150" cy="80" r="80" style="fill:none;stroke:rgb(230,230,233);stroke-width:20;opacity:1.0;padding: 0;margin:0;"/>
            <circle cx="150" cy="80" r="80" style="fill:none;stroke:rgb(108,211,194);stroke-width:6;opacity:1.0;"/>
          </svg>
          <div id="report_radius_1" class="report_radius">
            <div class="report_radius_span">生理</div>
            <span id="report_radius_span_1">{{physiologicalHealthScore ? physiologicalHealthScore : 0}}</span>
          </div>
          <div id="report_radius_2" class="report_radius">
            <div class="report_radius_span">心理</div>
            <span id="report_radius_span_2">{{psychologyHealthScore ? psychologyHealthScore : 0}}</span>
          </div>
          <div id="report_radius_3" class="report_radius">
            <div class="report_radius_span">社会</div>
            <span id="report_radius_span_3">{{socialHealthScore ? socialHealthScore : 0}}</span>
          </div>
        </div>
        <div id="score_comment">
          <span id="middle_span_comment">注: 您本次评估的健康档案信息完整度为40%,评估时间为2019-04-04。信息越完整,评估越精准! 建议完善信息后再次评估</span>
        </div>
        <div style="background-color: rgb(242,242,242); height: 10px"/>
      </section>

      <!-- 中部:各种建议 -->
      <section id="middle">
        <div id="suggetion" class="clearfix">
          <ul :class="showScoreTips == true ? 'isFixed' :''">
            <!--<li>
                <router-link :to="{name:linkerList[0].name, params:{suggestionData:dietSuggestion,suggestionDetailData:dietSuggestionDetail}}" active-class="seleted_li_a">{{linkerList[0].title}}</router-link>
            </li>
            <li>
                <router-link :to="{name:linkerList[1].name, params:{suggestionData:sportSuggestion}}" active-class="seleted_li_a">{{linkerList[1].title}}</router-link>
            </li>
            <li>
                <router-link :to="{name:linkerList[2].name, params:{suggestionData:mentalSuggestion}}" active-class="seleted_li_a">{{linkerList[2].title}}</router-link>
            </li>
            <li>
                <router-link :to="{name:linkerList[3].name, params:{suggestionData:societySuggestion}}" active-class="seleted_li_a">{{linkerList[3].title}}</router-link>
            </li>-->

            <li>
              <a :class="{'seleted_li_a': 0 === currentTabIndex}" href="javascript:" @click="setCurrentTab(0)">{{linkerList[0].title}}</a>
            </li>
            <li>
              <a :class="{'seleted_li_a': 1 === currentTabIndex}" href="javascript:" @click="setCurrentTab(1)">{{linkerList[1].title}}</a>
            </li>
            <li>
              <a :class="{'seleted_li_a': 2 === currentTabIndex}" href="javascript:" @click="setCurrentTab(2)">{{linkerList[2].title}}</a>
            </li>
            <li>
              <a :class="{'seleted_li_a': 3 === currentTabIndex}" href="javascript:" @click="setCurrentTab(3)">{{linkerList[3].title}}</a>
            </li>
          </ul>
        </div>
        <div class="clearfix">
          <div class="swiper-container" id="health-evaluate-swiper" v-if="loadComplete">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <eatting-suggest :suggestionData="dietSuggestion" :suggestionDetailData="dietSuggestionDetail" />
              </div>

              <div class="swiper-slide">
                <sport-suggest :suggestionData="sportSuggestion" />
              </div>

              <div class="swiper-slide">
                <mental-suggest :suggestionData="mentalSuggestion" />
              </div>

              <div class="swiper-slide">
                <society-suggest :suggestionData="societySuggestion" />
              </div>
            </div>
          </div>

          <!--<router-view/>-->
        </div>
      </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { getHealthEvaluateInfo } from '@/api/healthEvaluate'
import { ScoreAlertView } from './components/ScoreAlertView/scoreAlertView'

import EattingSuggest from "./components/EattingSuggest";
import SportSuggest from "./components/SportSuggest";
import MentalSuggest from "./components/MentalSuggest";
import SocietySuggest from "./components/SocietySuggest";

let mySwiper;

export default {
  name: 'HealthEvaluate',
  data() {
    return {
      loadComplete: false, //是否已加载
      currentTabIndex: 0, // 当前标签
      linkerList: [
        { title: '饮食建议', name: 'EattingSuggest' },
        { title: '运动建议', name: 'SportSuggest' },
        { title: '心理建议', name: 'MentalSuggest' },
        { title: '社会建议', name: 'SocietySuggest' }
      ],

      healthScore:0,
      healthGrade:0,
      physiologicalHealthScore:0,
      psychologyHealthScore:0,
      socialHealthScore:0,
      showScoreTips: false,

      dietSuggestion:'',
      dietSuggestionDetail:'',
      sportSuggestion:'',
      mentalSuggestion:'',
      societySuggestion:'',

      
    }
  },
  components: {
      EattingSuggest,
      SportSuggest,
      MentalSuggest,
      SocietySuggest
  },
  mounted() {
    this.$store.state.app.pageTitle = '健康评估'
    this.loadData();

    window.addEventListener('scroll',this.scrollHandle,true);
  },
  methods: {
    //创建滑动
    createSwiper(option) {
        let self = this;

        let options = Object.assign({}, {
            slidesPerView: 1,
            spaceBetween: 0,
            initialSlide: this.currentTabIndex,
            autoplay: false,
            on: {
                slideChange() {
                    self.currentTabIndex = this.activeIndex;
                }
            }
        }, option);

        mySwiper = this.$createSwiper("#health-evaluate-swiper", options);
    },
      //设置当前标签内容
    setCurrentTab(index) {
        if(mySwiper) {
            mySwiper.slideTo(index);
        }
    },
    scrollHandle:function () {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#suggetion').offsetTop - 30;
      scrollTop > offsetTop ? this.showScoreTips = true : this.showScoreTips = false

    },

    loadData() {
      let that = this;
      this.$root.showLoading()

      getHealthEvaluateInfo().then(response => {
        console.log(response.data.ReturnData);
        if (response.data.IsSuccess) {
          this.$root.hideLoading()

          let data = response.data.ReturnData;
          that.dietSuggestion = data.DietAdvice;
          that.dietSuggestionDetail = data.DietAdviseDetail;
          that.sportSuggestion = data.SportAdvice;
          that.mentalSuggestion = data.PsychologyResult.BehaviorSuggestion;
          that.societySuggestion = data.SocialResult.BehaviorSuggestion;
         // that.$router.push({name:that.linkerList[0].name,params:{suggestionData:that.dietSuggestion,suggestionDetailData:that.dietSuggestionDetail}});
          console.log('dietSuggestion ==' + that.dietSuggestion);
          // 分数
         // document.getElementById('head_span_score').innerHTML = data.PersonDeseaseCategory.HealthScore;
         // document.getElementById('head_span_grade').innerHTML = data.PersonDeseaseCategory.HealthGrade;
         // document.getElementById('report_radius_span_1').innerHTML = data.PersonDeseaseCategory.PhysiologicalHealth;
         // document.getElementById('report_radius_span_2').innerHTML = data.PsychologyResult.Score;
         // document.getElementById('report_radius_span_3').innerHTML = data.SocialResult.Score;

         this.healthScore = data.PersonDeseaseCategory.HealthScore;
         this.healthGrade = data.PersonDeseaseCategory.HealthGrade;
         this.physiologicalHealthScore = data.PersonDeseaseCategory.PhysiologicalHealth;
         this.psychologyHealthScore = data.PsychologyResult.Score;
         this.socialHealthScore = data.SocialResult.Score;

         let time = data.PersonDeseaseCategory.ModifiedTime.split('T')[0];
         document.getElementById('middle_span_comment').innerHTML =
         '注: 您本次评估的健康档案信息完整度为' + data.DataIntegrity + '%,评估时间为' + time + '。信息越完整,评估越精准! 建议完善信息后再次评估';

         // 疾病风险因子  var colorArr = ["0.3","0.6"];
         var physiologyDeseaseFactors = [];
         for (var i = 0; i < data.HealthDeseaseCategoryList.length; i++) {
             let originFactor = data.HealthDeseaseCategoryList[i];
             let levelID = originFactor.DangerLevelID;
             let level = 0.2;
             switch (levelID) {
                case 4,18:
                    level = 0.2; break;
                case 1,5,9,12,15,19:
                    level = 0.3; break;
                case 2,6,10,13,16,20:
                    level = 0.5; break;
                case 3,7,11,14,17,21:
                    level = 0.8; break;
                case 8,22:
                    level = 1.0; break;
                default: break;
             }
             let factor = { 'desease': originFactor.HealthDeseaseName,
                'level': level
             };
            physiologyDeseaseFactors.push(factor);
         }
         
         // 心理 level: {1:低,2:中,3:优}
      
         function getLevel (result) {
             switch(result) {
                case 1:
                    return 0.2;
                case 2:
                    return 0.5;
                case 3:
                    return 1.0;
                default: return 0.2;
             }
         }
         var psychologyResult = data.PsychologyResult;
         var mentalDeseaseFactors = {
         conclusion: psychologyResult.GeneralConclusion,
         listdata: [
                    { 'desease': '焦虑', 'level': getLevel(psychologyResult.Item1) },
                    { 'desease': '抑郁', 'level': getLevel(psychologyResult.Item2) },
                    { 'desease': '睡眠', 'level': getLevel(psychologyResult.Item3) },
                    { 'desease': '心理躯体化', 'level': getLevel(psychologyResult.Item4) }
                    ]
         };
         
         //社会 level: {1:差,2:中,3:优}
         var socialResult = data.SocialResult;
         var societyDeseaseFactors = {
                conclusion: socialResult.GeneralConclusion,
                listdata: [
                    { 'desease': '社会适应', 'level': getLevel(socialResult.Item1) },
                    { 'desease': '社会接触', 'level': getLevel(socialResult.Item2) },
                    { 'desease': '社会支持', 'level': getLevel(socialResult.Item3) }
                    ]
         };
         
         //配置点击事件
         var messageList = [physiologyDeseaseFactors,mentalDeseaseFactors,societyDeseaseFactors];
         for (var i = 1; i <= 3; i++) {
            var button = document.getElementById('report_radius_' + i);
            button.onclick = function(index,message) {
                return function() {
                    new ScoreAlertView().show(index,message);
                }
            }(i,messageList[i-1])
         }

        }else {
          this.$root.hideLoading()
          Toast(response.data.ReturnMessage);
        }

        this.loadComplete = true;
        this.$nextTick(() => {
            this.createSwiper();
        });
      }).catch(error => {
        this.$root.hideLoading()
        Toast(error.message);

          this.loadComplete = true;
          this.$nextTick(() => {
              this.createSwiper();
          });
      })
    },

  },
  beforeRouteUpdate (to, from, next) {
    // console.log(to);
    //点击返回按钮后跳到首页
    if (Object.keys(to.params).length <= 0) {
      this.$router.back('/');
    }else{
      next();
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandle)
  },
}
</script>

<style scoped >
/*@import '~@/assets/styles/varibles.styl'*/
.health_evaluate {
		margin-top: 40px;
	}

#score_synthesize {
  padding-top: 10px;
  padding-bottom: 5px;
  text-align:left;
}

.head_title_text {
  color: rgb(51, 51, 51);
  font-size:14px;
  padding-left: 15px;
  padding-right: 10px;
}

.head_content_text {
  color: red; font-size: 16px;
}

#score_details {
  width: 100%;
  height: 250px;
  margin-bottom: -10px;
}

#score_details svg {
  /*background-color: rgba(170,170,170,0.6);*/

  width:300px;
  height:200px;
  /*根据尺寸计算坐标*/
  margin: calc((280px - 200px)/2) calc(50% - 200px);

}

.report_radius {
  width: 90px;
  height: 90px;
  border-radius: 45px;
  text-align: center;
  position: absolute;
  color: #fff!important;
  /*display: inline-block;*/

  -webkit-tap-highlight-color:rgba(0,0,0,0);
}

/*顶部--生理分数*/
#report_radius_1 {
  background-color: rgb(37,191,255);
  top: 70px;
  right: calc(50% - 45px);
  right:-webkit-calc(50% - 45px);
}

#report_radius_2 {
  background-color: rgb(255, 164, 57);
  top: 200px;
  left: calc(50% - 130px);
  left:-webkit-calc(50% - 130px);
}

#report_radius_3 {
  background-color: rgb(0, 200, 132);
  top: 200px;
  right: calc(50% - 130px);
  right:-webkit-calc(50% - 130px);
}

.report_radius_span {
  height: 24px;
  line-height: 24px;
  padding-top: 20px;
}

.report_radius span {
  /*display: block;*/
  font-size: 20px;
  padding-top: -10px;
}

#score_comment {
  padding-bottom: 15px;
  padding-left: 10px;
}
#middle_span_comment {
  color: rgb(153, 153, 153);
  font-size: 14px;
  font-family: HiraginosansGB-W3;
}

div#suggetion ul {
  width: 100%;
  /*height: 30px;*/
}

div#suggetion ul li {
  float: left;  /* 向左漂移，将竖排变为横排 */
  width: 25%;
  height: 30px;
  border-bottom: 0.5px rgb(200, 200, 200) solid;
}

div#suggetion ul li a {
  text-align: center;
  color: rgb(102, 102, 102);
  font-size: 15px;
  font-family: HiraginosansGB-W3;
  display: block;
  line-height: 30px;
  text-decoration: none;
}

div#suggetion ul li a.seleted_li_a, div#suggetion ul li a:active  {
  color: rgb(0, 141, 253);
  border-bottom: 2px rgb(0, 141, 253) solid;
}

div#suggetion .isFixed {
  position:fixed;
  background-color:#Fff;
  top:30px;
  z-index:998;
}

div#scoreTips .isFixed {
  position:fixed;
  top:0;
  z-index:999;
}

div#scoreTips ul {
  width: 100%;
}

div#scoreTips ul li {
  float: left;
  width: 25%;
  height: 30px;
  background-color:rgb(242,242,242);
  font-size: 15px;
  line-height:30px;
}

div#scoreTips ul li span {
  display:inline-block; 
  vertical-align:baseline;
  font-size: 12px;
  width: 24px;
  height: 24px;
  line-height:26px;
  border-radius: 50%;
  color: white;
}

</style>
