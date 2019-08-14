<template>
    <div class="basic-file normal-page-box">
      <div class="warning-tip clearfix" v-if="showWarningTip">请完善您的基础档案以获得精准评估结果</div>

      <ul>
        <li class="clearfix" ref="realname">
          <p class="red_star"><span>*</span>真实姓名</p>
          <div class="wb"></div>
          <input type="text" v-model.lazy="allData.Name"/>
        </li>
        <li class="clearfix" ref="cardID">
          <p>身份证</p>
          <div class="wb"></div>
          <input type="text" maxlength="18" :readonly="cardIdEnableEdit ? false :'readonly'" v-model="allData.PersonNo"/>
        </li>
        <li class="clearfix">
          <p class="red_star"><span>*</span>性别</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <div class="pc-box" ref="gender" @click="openGenderPicker">请选择</div>
        </li>
        <li class="clearfix" ref="birthDate">
          <p class="red_star"><span>*</span>出生年月</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <date-picker :settingTime="allData.Birthdate" :startDate="new Date('1930-01-01')" class="pc-box" @showTime="showTime"/>
        </li>
        <li class="clearfix">
          <p>身高</p>
          <div class="wb" style="margin-right:5px;">cm</div>
          <input type="number" v-model="allData.Height" />
        </li>
        <li class="clearfix">
          <p>体重</p>
          <div class="wb" style="margin-right:5px;">kg</div>
          <input type="number" v-model="allData.Weight" />
        </li>
        <li class="clearfix">
          <p>婚姻史</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <div class="pc-box" ref="marriageData" @click="openMarriedPicker">请选择</div>
        </li>
      </ul>

      <input type="submit" value="保存" class="submit-btn" v-on:click="saveButtonClicked"/>
    
      <mt-actionsheet
        :actions="genderActions"
        v-model="genderSheetVisible">
      </mt-actionsheet>
      <mt-actionsheet
        :actions="marriedActions"
        v-model="marriedSheetVisible">
      </mt-actionsheet>

    </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import { Toast,DatetimePicker,Actionsheet,MessageBox } from 'mint-ui'
import { isPhoneNo,isCardNoStrict,limitStringLength } from '@/utils/stringFilter.js'
import { dateFormat } from '@/utils/dateFilter.js'
import { getBasicHealthArchivesInfo,postBasicHealthArchivesInfo } from '@/api/healthArchives'

export default {
  name: "BasicArchives",
  components: { DatePicker },
  data() {
    return {
      memberId: '',

      province_city_county_obj:{},  //接收省份信息
      allData: {},  //省份以外的全部信息

      cardIdEnableEdit: false, //身份证是否可以编辑，成功设置过后不能再编辑
      
      genderActions: [
        { name: '男',indexValue:'1',method:this.selectGender },
        { name: '女',indexValue:'2',method:this.selectGender }
      ],
      genderSheetVisible: false,
      marriedActions: [
        { name: '未婚',indexValue:'10',method:this.selectMarried },
        { name: '已婚',indexValue:'20',method:this.selectMarried },
        { name: '丧偶',indexValue:'30',method:this.selectMarried },
        { name: '离婚',indexValue:'40',method:this.selectMarried }
      ],
      marriedSheetVisible: false,
    }
  },
  computed: {
      showWarningTip() {
          return this.$route.query.showWarningTip;
      }
  },
  mounted() {
    
  },
  methods: {
    openDatePicker() {
      this.$refs.datePicker.open();
    },
    openGenderPicker(){
      this.genderSheetVisible = true;
    },
    openMarriedPicker(){
      this.marriedSheetVisible = true;
    },

    showTime(time) { //选择生日回调
      this.allData.Birthdate = time
    },
    selectGender(value){ //选择性别回调
      this.$refs.gender.innerText = value.name;
      this.allData.Gender = value.indexValue;
    },
    selectMarried(value){ //选择婚姻回调
      this.$refs.marriageData.innerText = value.name;
      this.allData.MarriageStatus = value.indexValue;
    },

    //获取基本信息
    getBasicPersonInfo() {
      let that = this;
      getBasicHealthArchivesInfo(that.memberId)
      .then(function(response){
        if (response.data.IsSuccess === true) {
          let getData = response.data.ReturnData;
          that.allData = Object.assign({}, that.allData, getData);
          that.address = Object.assign({}, that.address, getData.Address);
          
          that.handleGender_MarriageStatus_PersonNoEdit()
        }else{
          Toast(response.data.ReturnMessage);
        }
      }).catch(function(error){
        Toast(error.message);
      });
    },

    // 提交基本信息/新增家庭成员
    saveButtonClicked() {
      // 需要验证输入的元素的容器 refs: ['realname', 'phone', 'cardID', 'gender', 'birthDate']

      if(this.allData.Name == null || this.allData.Name == "") {
        Toast("请填写你的真实姓名！");
        this.warningAnimation(this.$refs.realname)
        return;
      }
      if(this.allData.PersonNo != null && this.allData.PersonNo != "" ) {
        if (!isCardNoStrict(this.allData.PersonNo)) {
          Toast("请填写正确格式的身份证！");
          return;
        }
      }
      if(!this.allData.Gender) {
        Toast("请选择你的性别！");
        this.warningAnimation(this.$refs.gender)
        return;
      }
      if(!this.allData.Birthdate) {
        Toast("请选择你的出生日期！");
        this.warningAnimation(this.$refs.birthDate)
        return;
      }
      if(!!this.allData.Height && (this.allData.Height > 250 || this.allData.Height < 40)) {
        Toast("身高范围：40-250 cm！");
        return;
      }
      if(!!this.allData.Weight && (this.allData.Weight > 220 || this.allData.Weight < 1)) {
        Toast("体重范围：1-220 kg！");
        return;
      }

      let that = this;
      var upData = {
        Name: that.allData.Name,
        PersonNo: that.allData.PersonNo,
        Phone: that.allData.Phone,
        Height: that.allData.Height,
        Weight: that.allData.Weight,
        MarriageStatus: that.allData.MarriageStatus,
        Gender: that.allData.Gender,
        Birthdate:  that.allData.Birthdate,
        Address: that.allData.Address,
        IsFamilyMember: false // false 表示编辑
      };

      that.$root.showLoading()
      
      // 提交基本信息
      postBasicHealthArchivesInfo(upData)
      .then(function(response){
          that.$root.hideLoading()
          if (response.data.IsSuccess === true) {
            Toast("保存成功！");
            let getData = response.data.ReturnData;
            if (!!getData.PersonNo) {
              that.cardIdEnableEdit = false
            }

            let redirect = that.$route.query.redirect;
            if(that.showWarningTip && redirect) {
                that.$router.replace(redirect);
            }
          }else{
            Toast(response.data.ReturnMessage);
          }
      }).catch(function(error){
        that.$root.hideLoading()
        Toast(error.message);
      })
    },

    warningAnimation(element) {
      element.style.backgroundColor = 'rgba(255, 72, 72, 0.4)';
      setTimeout(() => {
        element.style.backgroundColor = 'transparent'
      }, 1000);
    },

    // 处理性别、婚姻、身份证能否编辑这几个需要过滤的值
    handleGender_MarriageStatus_PersonNoEdit() {
      //身份证能否编辑
      this.cardIdEnableEdit = !this.allData.PersonNo
      //性别
      if(this.allData.Gender == 1) {
        this.$refs.gender.innerText = "男";
      } else {
        this.$refs.gender.innerText = "女";
      }
      //婚姻
      let marriageStatus = parseInt(this.allData.MarriageStatus);
      if (marriageStatus && marriageStatus < 90) {
        let textArr = ["未婚","已婚","丧偶","离婚"];
        let index = marriageStatus/10 -1;
        this.$refs.marriageData.innerText = textArr[index];
      }
      
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.app.pageTitle = '基础档案';
      vm.memberId = to.params.memberId
      vm.getBasicPersonInfo()
    })
  }
}

</script>

<style scoped>
.basic-file {
  width: 100%;
  max-width: 10rem;
  background-color: #fff;
}

.basic-file .warning-tip {
  line-height: 1.2rem;
  font-size: 0.4rem;
  color: #aaa;
  background: #f7f7f7;
}
.basic-file ul {
  width: 92%;
  max-width: 10rem;
  margin: 0 auto;
}
.basic-file ul li {
  height: 1.28rem;
  line-height: 1.28rem;
  border-bottom: solid 1px #e7e7e7;
  transition: background-color 0.8s ease-out;
}

.basic-file ul li p {
  width: 2.133333333333333rem;
  display: inline-block;
  font-size: 0.4rem;
  float: left;
  text-align: left;
}
.basic-file ul li p span {
  color: rgb(255, 72, 72);
  margin-right: 0.16rem;
}
.basic-file ul li input {
  display: inline-block;
  float: right;
  vertical-align: middle;
  text-align: right;
  color: #aaa;
  font-size: 0.4rem;
  height: 1.2rem;
  line-height: 1.226666666666667rem;
  border: none;
  outline: none;
  background-color: transparent;
  width: 5rem;
}
.basic-file ul li .wb {
  width: 0.576rem;
  height: 1.28rem;
  line-height: 1.28rem;
  float: right;
  font-size: 0.4rem;
  color: #aaa;
  margin-left: 2px;
}
.basic-file ul li .wb img {
  margin-top: -2.5px;
}
.basic-file .phone-number-btn {
  width: 92%;
  margin-top: 1.333333333333333rem;
}
.pc-box {
  width: 5.44rem;
  text-align: right;
  color: #aaa;
  font-size: 0.4rem;
  height: 1.28rem;
  line-height: 1.28rem;
  float: right;
}

.red_star {
  margin-left: -10px;
}


</style>
