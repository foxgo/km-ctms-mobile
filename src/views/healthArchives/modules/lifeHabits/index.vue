<template>
    <div>
      <ul class="living-habit normal-page-box">
        <li class="row-background" v-for="item in liveData"  v-on:click="toUrl(item.to)" >
          <div class="ul-center">
            <ul>
              <li class="li01"><img v-bind:src="item.img" class="listImg"></li>
              <li class="li02">
                <div class="centerStyle">
                  <div class="lileft" v-html="item.text"></div>
                  <div class="liright" v-html="item.percent + '%'"></div>
                  <div class="completion-bar">
                    <div class="bar-grad1" v-bind:style="{width:item.percent + '%'}"></div>
                  </div>
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
  import { getLifeHabitsInfo } from '@/api/healthArchives'
export default {
  name: "LivingHabit",
  data() {
    return {
      memberId: '',

      liveData: {
        "0": {
          text:"饮食习惯",
          img: require("@/assets/images/healthArchives/life1@2x.png"),
          percent: "0",
          to: "/healthArchives/lifeHabits/eatingHabits"
        },
        "1": {
          text:"体力活动与运动",
          img: require("@/assets/images/healthArchives/life2@2x.png"),
          percent: "0",
          to: "/healthArchives/lifeHabits/labor"
        },
        "2": {
          text:"吸烟饮酒",
          img: require("@/assets/images/healthArchives/life3@2x.png"),
          percent: "0",
          to: "/healthArchives/lifeHabits/Drinking&Smoking"
        },
      }
    }
  },
  mounted() {
    this.$store.state.app.pageTitle = '生活习惯';
  },
  methods: {
    toUrl(path) {
      this.$router.push({ path: path, query:{memberId: this.memberId} })
    },
    
    loadData() {
      let that = this;
      getLifeHabitsInfo(that.memberId).then(function(response){
        if (response.data.IsSuccess) {
          that.liveData[0].percent = response.data.ReturnData.Diet || '0';
          that.liveData[1].percent = response.data.ReturnData.Motion || '0';
          that.liveData[2].percent = response.data.ReturnData.SmokeDrink || '0';
        } else {
          Toast(response.data.ReturnMessage);
          console.log(JSON.stringify(that.liveData))
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.memberId = to.query.memberId
      vm.loadData()
    })
  }
}
</script>

<style scoped>
.living-habit {
  padding-top: 0.1rem;
}
.living-habit .row-background {
  background: linear-gradient(105deg, transparent 45px, #fff 0);
  border: none;
  cursor: pointer;
  height: 2.08rem;
  margin: 0.2666666666666667rem 0;
}
.living-habit .ul-center > ul {
  font-size: 0;
  text-align: left;
  padding-left: 0.3733333333333333rem;
}
.living-habit .ul-center > ul > li {
  display: inline-block;
  height: 2.08rem;
}
.living-habit .centerStyle {
  position: relative;
}
.living-habit .centerStyle > div.lileft {
  position: absolute;
  font-size: 0.4rem;
}
.living-habit .listImg {
  width: 1.146666666666667rem;
  height: 1.146666666666667rem;
}
.living-habit .centerStyle > div.liright {
  text-align: right;
  font-size: 0.3466666666666667rem;
  color: #ababab;
}
.living-habit .li01 {
  margin-right: 0.3733333333333333rem;
  position: relative;
  top: 0.4rem;
  text-align: left;
}
.living-habit .li02 {
  width: 7rem;
  position: relative;
  top: 0.2rem;
}
.living-habit .li03 {
  position: relative;
  top: 0.05rem;
  left: 0.6rem;
}
.living-habit .li03 img {
  height: 0.2933333333333333rem;
  margin-top: 0.5rem;
}
.living-habit .bar-grad1 {
  position: absolute;
  left: 0;
  width: 0%;
  /*transition: width 1s ease;*/
  height: 0.12rem;
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
  border-radius: 0.6rem;
  background: #008dfd;
}
.living-habit .completion-bar {
  position: relative;
  width: 100%;
  background: #e1e2e1;
  height: 0.12rem;
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
  border-radius: 0.6rem;
  margin-top: 0.26rem;
}

</style>
