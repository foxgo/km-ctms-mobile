<template>
    <div class="basic-file normal-page-box">
      <ul>
        <li class="clearfix" ref="realname">
          <p class="red_star"><span>*</span>真实姓名</p>
          <div class="wb"></div>
          <input type="text" v-model.lazy="allData.Name"/>
        </li>
        <li class="clearfix" ref="phone">
          <p class="red_star"><span>*</span>手机号</p>
          <div class="wb"></div>
          <input type="number" maxlength="11" v-model.number="allData.Phone"/>
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
          <date-picker :settingTime="allData.Birthdate" class="pc-box" @showTime="showTime"/>
        </li>
        <li class="clearfix">
          <p>居住地</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <area-picker class="pc-box" :pro_city_county_obj="province_city_county_obj" @showAreaData="showAreaData"/>
        </li>
        <li class="clearfix">
          <p>详细地址</p>
          <div class="wb"></div>
          <input type="text" v-model.lazy="allData.DetailedAddress"/>
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
import areaData from '@/data/areaData_id.json' //引入省市区数据
import DatePicker from '@/components/DatePicker'
import AreaPicker from '@/components/AreaPicker'
import { Toast,DatetimePicker,Actionsheet,MessageBox } from 'mint-ui'
import { isPhoneNo,isCardNo,isCardNoStrict,limitStringLength } from '@/utils/stringFilter.js'
import { dateFormat } from '@/utils/dateFilter.js'
import { getBasicHealthArchivesInfo,postBasicHealthArchivesInfo } from '@/api/healthArchives'
import { createFamilyMember,getFamilyMemberIsExists,getAccountIsExists } from '@/api/familyMember'

export default {
  name: "BasicArchives",
  components: { DatePicker, AreaPicker },
  data() {
    return {

      province_city_county_obj:{},  //接收省份信息
      allData: {},  //详细居住地址以外的全部信息

      autoInputCardID: '', //标记账号，用来处理检测到账号已存在而连续弹窗的问题
      autoInputName: '', //标记账号，用来处理检测到账号已存在而连续弹窗的问题
      cardIdEnableEdit: true, //身份证是否可以编辑，成功设置过后不能再编辑
      
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
  computed:{
    cardIDNumber(){
      return this.allData.PersonNo
    },
    phoneNumber(){
      return this.allData.Phone
    }
  },
  watch: {
    cardIDNumber(val) {
      if(val != "" && val.length == 15 || val.length == 18){
        if(isCardNoStrict(val)) {
          var birthDate, gender
          // 解析身份证的生日与性别
          if(val.length === 15) {
            birthDate = '19' + val.substr(6, 6)
            gender = val.substr(val.length-1, 1)
          }else{
            birthDate = val.substr(6, 8)
            gender = val.substr(val.length-2, 1)%2 === 1 ? '1' : '2'
          }

          // 提取身份证的生日、性别，调用回调函数刷新组件
          this.showTime(birthDate.substring(0,4) + '-' + birthDate.substring(4,6) + '-' + birthDate.substring(6,8))
          const genderIndex = parseInt(gender)%2 ? 0 : 1
          this.selectGender(this.genderActions[genderIndex])

          
          // 检测家庭成员是否已经存在，修改时不再做检测
          if(this.autoInputCardID && this.autoInputCardID === val) { return }
          this.autoInputCardID = ''

          const that = this;
          getFamilyMemberIsExists(2,val)
          .then(function(response){
            that.familyMemberExistHandler(2, response,val)
          })
        }
      }
    },
    phoneNumber(val) {
      const tmpVal = val + ''
      if(tmpVal != "" && tmpVal.length >= 11){ 
        if(isPhoneNo(tmpVal)) {
          // 检测家庭成员是否已经存在
          if(this.autoInputPhone && this.autoInputPhone === tmpVal) { return }
          this.autoInputPhone = ''

          const that = this;
          getFamilyMemberIsExists(1,tmpVal)
          .then(function(response){
            that.familyMemberExistHandler(1, response, tmpVal)
          })
        } else {
          Toast("请填写正确格式的手机号！")
        } 
      } else {
        this.autoInputPhone = ''
      }
    },
  },
  mounted() {
    this.$store.state.app.pageTitle = '新增成员'
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
    showAreaData(province_city_country_obj) { //选择居住地回调
      console.log(JSON.stringify(province_city_country_obj))
      this.province_city_county_obj = province_city_country_obj
    },
    selectGender(value){ //选择性别回调
      this.$refs.gender.innerText = value.name;
      this.allData.Gender = value.indexValue;
    },
    selectMarried(value){ //选择婚姻回调
      this.$refs.marriageData.innerText = value.name;
      this.allData.MarriageStatus = value.indexValue;
    },

    // 提交基本信息/新增家庭成员
    saveButtonClicked() {
      // 需要验证输入的元素的容器 refs: ['realname', 'phone', 'cardID', 'gender', 'birthDate']
      if(this.allData.Name == null || this.allData.Name == "") {
        Toast("请填写你的真实姓名！");
        this.warningAnimation(this.$refs.realname)
        return;
      }
      if(this.allData.Phone == null || this.allData.Phone == "" || !isPhoneNo(this.allData.Phone)) {
        Toast("请填写你的手机号！");
        this.warningAnimation(this.$refs.phone)
        return;
      }
      if(this.allData.PersonNo != null && this.allData.PersonNo != "" ) {
        if (!isCardNo(this.allData.PersonNo)) {
          Toast("请填写正确格式的身份证！");
          return;
        }
      }
      if(this.allData.Gender == null) {
        Toast("请选择你的性别！");
        this.warningAnimation(this.$refs.gender)
        return;
      }
      if(this.allData.Birthdate == null) {
        Toast("请选择你的出生日期！");
        this.warningAnimation(this.$refs.birthDate)
        return;
      }
      if(!!this.allData.Height && (this.allData.Height > 250 || this.allData.Height < 40)) {
        Toast("身高范围：40-250 cm！");
        return;
      }
      if(this.allData.Weight != null && this.allData.Weight != "" && this.allData.Weight > 220 || this.allData.Weight < 1) {
        Toast("体重范围：1-220 kg！");
        return;
      }

      let that = this;
      var address = {}
      if(that.province_city_county_obj.province) {
        address = {
          ProvinceID: that.province_city_county_obj.province.id,//省份ID
          CityID: that.province_city_county_obj.city.id,//市ID
          CountyID: that.province_city_county_obj.county.id,//三级市ID
          DetailedAddress: that.allData.DetailedAddress
        }
      }
      
      var upData = {
        Name: that.allData.Name,
        PersonNo: that.allData.PersonNo,
        Height: that.allData.Height,
        Weight: that.allData.Weight,
        MarriageStatus: that.allData.MarriageStatus,
        Gender: that.allData.Gender,
        Birthdate: that.allData.Birthdate,
        Phone: that.allData.Phone,
        Address: address,
        IsFamilyMember: true // true表示新增
      };

      console.log(JSON.stringify(upData))

      if (!upData.PersonNo) {
        createFamilyMember(upData)
        .then(function(response){
            if (response.data.IsSuccess === true) {
              Toast("新增家庭成员成功！");
            }else{
              Toast(response.data.ReturnMessage);
            }
        }).catch(function(error){
          Toast(error.message);
        })
      } else {
        MessageBox.confirm("身份证号一旦设置将不能再修改").then(action => {
          createFamilyMember(upData)
          .then(function(response){
              if (response.data.IsSuccess === true) {
                Toast("新增家庭成员成功！");
              }else{
                Toast(response.data.ReturnMessage);
              }
          }).catch(function(error){
            Toast(error.message);
          })
        }).catch(err => {})
      }
    },

    warningAnimation(element) {
      element.style.backgroundColor = 'rgba(255, 72, 72, 0.4)';
      setTimeout(() => {
        element.style.backgroundColor = 'transparent'
      }, 1000);
    },

    // 检测家庭成员是否存在的回调，回调中再次检测了账号是否存在
    familyMemberExistHandler(type, response, inputVal) {
      if (response.data.IsSuccess === true) {
        const data = response.data.ReturnData;
        if(!!data && !!data.Name){ // 已有家庭成员,弹框提醒
          console.log(data)

          var tipMessage = (type===1?"手机号":"身份证号") + "已存在家庭档案中，姓名【" + data.Name + "】," + (data.PersonNo ? "身份证号【"+data.PersonNo+"】,":"") + "手机号【" + data.Phone + "】,请重新输入"
          MessageBox.alert(tipMessage).then(action => {
            if(type === 1){
              this.allData.Phone = ''
            }else if(type === 2) {
              this.allData.PersonNo = ''
            }
          });
          this.isAccountExist = false
        }else{
          const that = this
          // 检测该账号是否已存在
          getAccountIsExists(type,inputVal)
          .then(function(response){
            const data = response.data.ReturnData;
            if(!!data && !!data.Name){ // 已有该账号,弹框提醒

              var tipMessage = (type===1?"手机号":"身份证号") + "已存在账号系统中，姓名【" + data.Name + "】," + (data.PersonNo ? "身份证号【"+data.PersonNo+"】,":"") + "手机号【" + data.Phone + "】,是否显示档案？"
              MessageBox.confirm(tipMessage).then(action => {
                that.isAccountExist = true
                // 用返回的数据填入输入框
                that.allData = data
                that.autoInputPhone = data.Phone
                that.autoInputCardID = data.PersonNo
                
                that.handleGender_MarriageStatus_PersonNoEdit()
              }).catch(err => { 
                if (err == 'cancel') { //取消的回调
                  if(type === 1){
                    that.allData.Phone = ''
                  }else if(type === 2) {
                    that.allData.PersonNo = ''
                  }
                } 
              });
            }
          })
        }
      }
    },

    // 处理性别、婚姻、身份证能否编辑这几个需要过滤的值
    handleGender_MarriageStatus_PersonNoEdit() {
      //身份证能否编辑
      this.cardIdEnableEdit = !this.allData.PersonNo||this.allData.PersonNo.length<15
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

      //地址
      var provinceObj = areaData.find(province => (province.id == this.allData.Address.ProvinceID))
      var cityObj = provinceObj.l.find(city => (city.id == this.allData.Address.CityID))
      var countyObj = cityObj.l.find(county => (county.id == this.allData.Address.CountyID))
      
      this.province_city_county_obj = {
        "province":{"value":provinceObj.n,"id":provinceObj.id },
        "city":{"value":cityObj.n,"id":cityObj.id },
        "county":{"value":countyObj.n,"id":countyObj.id }
      }
      this.allData.DetailedAddress = this.allData.Address.DetailedAddress
    }
  }
}

</script>

<style scoped>
.basic-file {
  width: 100%;
  max-width: 10rem;
  background-color: #fff;
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
