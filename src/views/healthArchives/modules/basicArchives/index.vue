<template>
    <div class="basic-file">
      <ul>
        <li class="clearfix">
          <p class="red_start"><span>*</span>真实姓名</p>
          <div class="wb"></div>
          <input type="text" v-model.lazy="allData.Name"/>
        </li>
        <li class="clearfix">
          <p>身份证</p>
          <div class="wb"></div>
          <input type="text" v-model.lazy="allData.PersonNo"/>
        </li>
        <li class="clearfix">
          <p class="red_start"><span>*</span>性别</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <div class="pc-box" @click="openGenderPicker">
            <input type="hidden" name="bank_id" id="bankId" value="" />
            <span ref="genderData">请选择</span>
          </div>
        </li>
        <li class="clearfix">
          <p class="red_start"><span>*</span>出生年月</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <div class="form-item item-line" id="selectDate">
            <div class="pc-box" @click="openDatePicker">
              <span data-year="" data-month="" data-date="" ref="birthDateData">请选择时间</span>
            </div>
          </div>
        </li>
        <li class="clearfix">
          <p>身高</p>
          <div class="wb">cm</div>
          <input type="number" v-model="allData.Height" />
        </li>
        <li class="clearfix">
          <p>体重</p>
          <div class="wb">kg</div>
          <input type="number" v-model="allData.Weight" />
        </li>
        <li class="clearfix">
          <p>婚姻史</p>
          <div class="wb"><img src="@/assets/images/healthArchives/arrow.jpg" height="10" width="6"/></div>
          <div class="pc-box" @click="openMarriedPicker">
            <input type="hidden" name="bank_id" id="marriageId" value="">
            <span ref="marriageData">请选择</span>
          </div>
        </li>
      </ul>

      <input type="submit" value="保存" class="submit-btn" v-on:click="setPersonInfor"/>
    
      <template>
        <mt-datetime-picker
          ref="datePicker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          v-model="datePickerValue"
          :start-date="startDate"
          :end-date="endDate"
          @confirm="handleDateConfirm">
        </mt-datetime-picker>
      </template>
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
import { Toast,Picker,DatetimePicker,Actionsheet } from 'mint-ui'
import { dateFormat,isCardNo } from '@/filters'
import { getBasicHealthArchivesInfo,postBasicHealthArchivesInfo } from '@/api/healthArchives'

export default {
      name: "BasicArchives",
      data() {
        return {
          proData:{},   //接收省份信息
          allData: {},  //省份以外的全部信息

          datePickerValue:null,
          startDate: new Date('1920-01-01'),
          endDate: new Date(),
          
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
        cordNumber(){
          return this.allData.PersonNo;
        }
      },
      watch: {
        cordNumber(val) {
          if(val != "" && !isCardNo(val)){ Toast("请填写正确格式的身份证！") }
        },
      },
      mounted() {
        // this.$store.state.app.pageTitle = '基础档案';
        this.getBasicPersonInfo();
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

        handleDateConfirm(){ 
          console.log(this.datePickerValue);

          let dateDom = this.$refs.birthDateData;
          if (this.datePickerValue != null) 
            dateDom.innerText = dateFormat(this.datePickerValue,"yyyy-MM-dd");
        },

        selectGender(value){
          this.$refs.genderData.innerText = value.name;
          this.$refs.genderData.dataset['id'] = value.indexValue;
        },
        selectMarried(value){
          this.$refs.marriageData.innerText = value.name;
          this.$refs.marriageData.dataset['id'] = value.indexValue;
        },

        //获取基本信息
        getBasicPersonInfo() {
          let that = this;
          getBasicHealthArchivesInfo()
          .then(function(response){
            if (response.data.IsSuccess === true) {
              let getData = response.data.ReturnData;
              that.allData = Object.assign({}, that.allData, getData);
              that.address = Object.assign({}, that.address, getData.Address);
              console.log(that.allData);

              //性别
              if(that.allData.Gender == 1) {
                that.$refs.genderData.innerText = "男";
                that.$refs.genderData.dataset['id'] = "1";
              } else {
                that.$refs.genderData.innerText = "女";
                that.$refs.genderData.dataset['id'] = "2";
              }
              //婚姻
              let marriageStatus = parseInt(that.allData.MarriageStatus);
              if (marriageStatus && marriageStatus < 90) {
                that.$refs.marriageData.dataset['id'] = marriageStatus+'';
                let textArr = ["未婚","已婚","丧偶","离婚"];
                let index = marriageStatus/10 -1;
                console.log(index);
                that.$refs.marriageData.innerText = textArr[index];
              }else {
                that.$refs.marriageData.dataset['id'] = "90";
              }
              //出生日期
              if(that.allData.Birthdate != null) {
                let d1 = that.allData.Birthdate.split("T");
                let d2 = d1[0].split("-");
                that.$refs.birthDateData.innerText = d1[0];
                that.$refs.birthDateData.dataset['year'] = d2[0];
                that.$refs.birthDateData.dataset['month'] = d2[1];
                that.$refs.birthDateData.dataset['date'] = d2[2];
              }
            }else{
              Toast(response.data.ReturnMessage);
            }
          }).catch(function(error){
            Toast(error.message);
          });
        },

        //提交基本信心
        setPersonInfor() {
          if(this.allData.Name == null || this.allData.Name == "") {
            Toast("请填写你的姓名！");
            return;
          }
          if(this.allData.PersonNo != null && this.allData.PersonNo != "" ) {
            if (!isCardNo(this.allData.PersonNo)) {
              Toast("请填写正确格式的身份证！");
              return;
            }
          }
          if(this.$refs.genderData.innerHTML == "请选择") {
            Toast("请选择你的性别！");
            return;
          }
          if(this.$refs.birthDateData.innerHTML == "请选择时间") {
            Toast("请选择你的出生日期！");
            return;
          }
          if(this.allData.Height > 250 || this.allData.Height < 40) {
            Toast("身高范围：40-250 cm！");
            return;
          }
          if(this.allData.Weight > 220 || this.allData.Weight < 1) {
            Toast("体重范围：1-220 kg！");
            return;
          }
  
          var m=this.$refs.birthDateData.dataset['month'] ;
          var d=this.$refs.birthDateData.dataset['date'];
          var bdate=this.$refs.birthDateData.dataset['year'] + "-" +m+ "-" +d;
          var today=dateFormat(new Date(),"yyyy-MM-dd");
          var birthDate="";
          if(bdate==today) {
              birthDate = this.$refs.birthDateData.innerHTML;
          } else {
              birthDate=bdate;
          }

          let that = this;
          let upData = {
            Name: that.allData.Name,
            PersonNo: that.allData.PersonNo,
            Height: that.allData.Height,
            Weight: that.allData.Weight,
            MarriageStatus: this.$refs.marriageData.dataset['id'],
            Gender: this.$refs.genderData.dataset['id'],
            Birthdate:  birthDate,
            Phone: that.allData.Phone
          };

          postBasicHealthArchivesInfo(upData)
          .then(function(response){
              if (response.data.IsSuccess === true) {
                Toast("保存成功！");
              }else{
                Toast(response.data.ReturnMessage);
              }
          }).catch(function(error){
            Toast(error.message);
          })
        },
      }
    }

</script>

<style scoped>
.basic-file {
  width: 100%;
  max-width: 10rem;
  margin: 0 auto;
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
}
.basic-file ul li p {
  width: 2.133333333333333rem;
  display: inline-block;
  font-size: 0.4rem;
  float: left;
  text-align: left;
}
.basic-file ul li p span {
  color: #ff4848;
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
  background-color: #fff;
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
.basic-file .phone-number-btn {
  width: 92%;
  margin-top: 1.333333333333333rem;
}
.pc-box {
  width: 5.44rem;
  text-align: right;
  color: #aaa;
  font-size: 0.4rem;
  height: 1.2rem;
  line-height: 1.226666666666667rem;
  float: right;
}

.red_start {
  margin-left: -10px;
}

.submit-btn {
  width: 92%;
  height: 1.066666666666667rem;
  border-radius: 0.533333333333rem;
  border: none;
  background-color: #008dfd;
  color: #fff;
  margin-top:20px;
  margin-bottom:20px;
  font-size: 0.4266666666666667rem;
}
</style>
