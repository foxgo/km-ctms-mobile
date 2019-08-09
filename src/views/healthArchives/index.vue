<template>
    <div class="normal-page-box">
      <div class="blue">
        <div class="animate-box">
          <div class="circleProgress_wrapper">
            <div class="wrapper right">
              <div class="circleProgress rightcircle"></div>
            </div>
            <div class="wrapper left">
              <div class="circleProgress leftcircle"></div>
            </div>
          </div>
          <div class="point" v-bind:data-afterContent="userInfor.DataIntegrity + '%'"></div>
          <div class="score"><h6>{{userInfor.Name}}</h6><p><template v-if="userInfor.Gender == 1">男</template><template v-else>女</template>，{{userInfor.Birthday}}</p></div>
        </div>
      </div>

      <ul class="health-file">
        <li class="row-background" v-for="(item,key) in healthFile" :key="key" @click="toUrl(item.to)">
          <div class="ul-center">
            <ul>
              <li class="li01">
                <img v-bind:src="item.img"></li>
              <li class="li02">
                <div class="centerStyle">
                  <div class="lileft" v-html="item.text"></div>
                  <div class="completion-bar">
                    <div class="bar-grad1" v-bind:style="{width:item.percent + '%'}"></div>
                  </div>
                  <div class="liright" v-html="item.percent + '%'"></div>
                </div>
              </li>
              <li class="li03">
                <img src="@/assets/images/healthArchives/arrow.jpg" />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { getHealthArchivesInfo } from '@/api/healthArchives'
import { Toast } from 'mint-ui'

export default {
  name: "HealthArchives",
  data() {
    return {
      userInfor: {
        Name: "",
        Gender: "1",
        Birthday: '00',
        DataIntegrity: '0',

        memberId: ''
      },
      healthFile: {
        "0": {
          text:"基础档案",
          img: require("@/assets/images/healthArchives/folder.png"),
          percent: "10",
          to: "/healthArchives/basicArchives"
        },
        "1": {
          text:"生活习惯",
          img: require("@/assets/images/healthArchives/coffee.png"),
          percent: "10",
          to: "/healthArchives/lifeHabits"
        },
        "2": {
          text:"健康史",
          img: require("@/assets/images/healthArchives/pulse.png"),
          percent: "10",
          to: "/healthArchives/healthHistory"
        },
      }
    }
  },
  mounted() {
    this.$store.state.app.pageTitle = '健康档案'
  },
  methods: {
    toUrl(path) {
      this.$router.push({ path: path, query:{ memberId: this.memberId }})
    },

    //获取信息完整度
    getInfoComplete() {
      let that = this;
      getHealthArchivesInfo(that.memberId)
      .then(response => { 
        
        if (response.data.IsSuccess) {
          const data = response.data.ReturnData;
          that.userInfor.Name = data.Name;
          that.userInfor.Gender = data.Gender;
          that.userInfor.DataIntegrity = data.DataIntegrity;

          if (data.Birthday) {
            let startTime = new Date(data.Birthday); // 开始时间
            let endTime = new Date(); // 结束时间
            let usedTime = endTime - startTime; // 相差的毫秒数
            let usedYears = usedTime/(1000*60*60*24*365);
            that.userInfor.Birthday = parseInt(usedYears);
          }
          //完整度环形动画
          that.paitingCircle(that.userInfor.DataIntegrity);

          that.healthFile[0].percent = data.BasicInfo;
          that.healthFile[1].percent = data.LifeStyle;
          that.healthFile[2].percent = data.HealthInfo;
        }else {
          Toast(response.data.ReturnMessage);
        }
      }).catch(error => {
        Toast(error);
      })
    },

    //转圈动画
    paitingCircle(data) {
      let style = null,
        circleProgressLoad_left,
        circleProgressLoad_right,
        pointscroll,
        pointscrollx;

      let bl = data * 360 / 100;

      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      document.head.appendChild(style);

      if (data <= 50) {
        circleProgressLoad_left = this.createAnimate("circleProgressLoad_left", 45, bl / 2 + 45, bl + 45);
        pointscroll = this.createAnimate("pointscroll", 0, bl / 2, bl);
        pointscrollx = this.createAnimate("pointscrollx", 360, 360 - bl / 2, 360-bl);
        style.sheet.insertRule(circleProgressLoad_left, 0);
        style.sheet.insertRule(pointscroll, 1);
        style.sheet.insertRule(pointscrollx, 2);
      } else {
        circleProgressLoad_left = this.createAnimate("circleProgressLoad_left", 45, 225, 225);
        circleProgressLoad_right = this.createAnimate("circleProgressLoad_right", 45, 45, bl + 45 - 180);
        pointscroll = this.createAnimate("pointscroll", 0, 180, bl);
        pointscrollx = this.createAnimate("pointscrollx", 360, 180, 360-bl);
        style.sheet.insertRule(circleProgressLoad_left, 0);
        style.sheet.insertRule(circleProgressLoad_right, 1);
        style.sheet.insertRule(pointscroll, 2);
        style.sheet.insertRule(pointscrollx, 3);
      }
    },

    //修改动画
    createAnimate: function (name, val1, val2, val3) {
      let token = null,
        animat = null;

      // 判断是否是webkit浏览器内核
      token = window.WebKitCSSKeyframesRule ? '-webkit-' : '';
      // 添加keyframes动画的样式
      animat = '@' + token + 'keyframes ' + name + '{0%{transform: rotateZ(' + val1 + 'deg);}50%{transform: rotateZ(' + val2 + 'deg);}100%{transform: rotateZ(' + val3 + 'deg);}}';

      return animat;
    },

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.memberId){
        vm.memberId = to.params.memberId
      }
      vm.getInfoComplete()
    })
  }
}
</script>

<style scoped>
.blue {
  width: 100%;
  height: 6rem;
  background-color: #008dfd;;
}

.blue .animate-box {
  width: 3.733333333333333rem;
  height: 3.733333333333333rem;
  margin: 0;
  background: url("../../assets/images/healthArchives/circle_bg_white.png") no-repeat;
  background-size: cover;
  /*如果把这几行删掉，不可以居中 */
  position: relative;
  left: 50%;
  top: 50%;
  /*translate(x,y) 括号的百分比数据，会以本身的长宽做参考，比如，本身的长为100px，高为100px. 那填(50%,50%)就是向右，向下移动50px，添加负号就是向着相反的方向移动*/
  transform: translate(-50%,-55%);
}

.rightcircle {
    border-top: 0.1333333333333333rem solid transparent;
    border-right: 0.1333333333333333rem solid transparent;
    right: 0;
    animation: circleProgressLoad_right 2s linear 1 forwards;
}

.leftcircle {
    border-bottom: 0.1333333333333333rem solid transparent;
    border-left: 0.1333333333333333rem solid transparent;
    left: 0;
    animation: circleProgressLoad_left 2s linear 1 forwards;
}

.circleProgress_wrapper {
  width: 3.733333333333333rem;
  height: 3.733333333333333rem;
  margin: 0 auto;
  position: relative;
}
.wrapper {
  width: 1.866666666666667rem;
  height: 3.733333333333333rem;
  position: absolute;
  top: 0;
  overflow: hidden;
}

.right {
  right: 0;
}
.left {
  left: 0;
}
.circleProgress {
  width: 3.466666666666667rem;
  height: 3.466666666666667rem;
  border: 0.1333333333333333rem solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  transform: rotate(45deg);
}
.rightcircle {
  border-top: 0.1333333333333333rem solid transparent;
  border-right: 0.1333333333333333rem solid transparent;
  right: 0;
  animation: circleProgressLoad_right 2s linear 1 forwards;
}

.leftcircle {
  border-bottom: 0.1333333333333333rem solid transparent;
  border-left: 0.1333333333333333rem solid transparent;
  left: 0;
  animation: circleProgressLoad_left 2s linear 1 forwards;
}

.point {
  width: 3.733333333333333rem;
  height: 3.733333333333333rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  animation: pointscroll 2s linear 1 forwards;
}
.point:after {
  width: 0.9333333333333333rem;
  height: 0.9333333333333333rem;
  display: block;
  content: attr(data-afterContent);
  background-color: #ffffff;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  box-shadow: 0 0 0.32rem rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 3.2rem;
  left: 1.4rem;
  color: #008dfd;
  font-size: 0.32rem;
  line-height: 0.9333333333333333rem;
  animation: pointscrollx 2s linear 1 forwards;
}
.score {
  width: 3.733333333333333rem;
  height: 3.733333333333333rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
}
.score h6 {
  font-size: 0.8rem;
  color: #fff;
  font-weight: bold;
  line-height: 3rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 3.733333333333333rem;
}
.score p {
  font-size: 0.3466666666666667rem;
  color: #fff;
  margin-top: -0.8rem;
  text-align: center;
}


.health-file .row-background {
  background: #fff;
  border: none;
  cursor: pointer;
  height: 1.6rem;
  margin: 1px 0;
  border-bottom: solid 1px #fafafa;
}
.health-file .ul-center > ul {
  font-size: 0;
  text-align: left;
  padding-left: 0.3733333333333333rem;
}
.health-file .ul-center > ul > li {
  display: inline-block;
  height: 1.6rem;
  vertical-align: middle;
}
.health-file img{
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
}
.health-file .centerStyle > div.lileft {
  position: relative;
  font-size: 0.4rem;
  display: inline-block;
  width: 20%;
}
.health-file .li01 img {
  width: 0.64rem;
  height: 0.64rem;
}
.health-file .centerStyle > div.liright {
  text-align: right;
  font-size: 0.3466666666666667rem;
  color: #ababab;
  display: inline-block;
  width: 14%;
}
.health-file .li01 {
  margin-right: 0.3733333333333333rem;
  position: relative;
  text-align: left;
}
.health-file .li02 {
  width: 8rem;
  position: relative;
}
.health-file .li02 .centerStyle {
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
}
.health-file .li03 {
  position: relative;
  left: 0.1rem;
}
.health-file .li03 img {
  height: 0.2933333333333333rem;
}
.health-file .bar-grad1 {
  position: absolute;
  left: 0;
  width: 0;
  height: 0.12rem;
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
  border-radius: 0.6rem;
  background: #008dfd;
}
.completion-bar {
  position: relative;
  width: 58%;
  display: inline-block;
  background: #e1e2e1;
  height: 0.12rem;
  top: 50%;
  transform: translate(0,-50%);
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
  border-radius: 0.6rem;
  margin: 0 0.2rem;
}

</style>
