<template>
  <div class="content-box">
    <h5>家族病史<span> 您的父母亲、兄弟姐妹、祖父母是否患有以下疾病?</span></h5>
    <ul class="selections_ul" id="fSelectList">
      <li id="0" @click="fItemClicked">无</li>
      <li v-for="item in diseaseList" v-bind:id="item.HealthTypeID" @click="fItemClicked">{{item.HealthTypeName}}</li>
    </ul>

    <div id="gxyBox" class="switchItemBox" style="display: none">
      <h4>是否父母都有高血压史？</h4>
      <ul class="switch_ul" id="gxy_ul">
        <li @click="fSubItemClicked('gxy_ul',true)">是</li>
        <li @click="fSubItemClicked('gxy_ul',false)">否</li>
      </ul>
    </div>

    <div id="diabetesBox" class="switchItemBox" style="display: none">
      <h4>是否父母都有糖尿病史？</h4>
      <ul class="switch_ul" id="diabetes_ul">
        <li @click="fSubItemClicked('diabetes_ul',true)">是</li>
        <li @click="fSubItemClicked('diabetes_ul',false)">否</li>
      </ul>
    </div>

    <div style="height: 5px;"></div>
    <h5>疾病史<span> 您是否有以下疾病?</span></h5>
    <ul class="selections_ul" id="dSelectList">
      <li id="0" @click="dItemClicked">无</li>
      <li v-for="item in diseaseList" v-bind:id="item.HealthTypeID" @click="dItemClicked">{{item.HealthTypeName}}</li>
    </ul>

    <input type="submit" class="submit-btn" value="保存" v-on:click="setFamiliyData" />
  </div>
</template>

<script>
import { getHealthTypes,getHealthHistory,postHealthHistory } from "@/api/healthArchives"
import { Toast } from 'mint-ui'
import Vue from 'vue'

export default {
  name: "HealthHistory",
  data() {
    return {
      diseaseList: {},
      BothDiabetes: false,
      BothHypertensive: false,
    }
  },
  mounted() {
    // this.$store.state.app.pageTitle = '健康史';
    this.getData();
  },
  methods: {
    //家庭病史
    fItemClicked(event){
      let liElement = event.target;
      let activeClass = "active";
      if (liElement.className === activeClass) {
        liElement.classList.remove(activeClass);
        if (liElement.innerHTML === "高血压") {
          document.getElementById('gxyBox').style.display = 'none';
        }else if (liElement.innerHTML === "糖尿病") {
          document.getElementById('diabetesBox').style.display = 'none';
        }
      }else{
        let selectList = document.getElementById('fSelectList');
        let li_t = selectList.querySelector("li[id=\"\\31 3676\"]"); //糖尿病
        let li_g = selectList.querySelector("li[id=\"\\31 3398\"]"); //高血压

        if (liElement.id == 0) {
          //取消所有其它选择
          let nodeList = selectList.querySelectorAll("."+activeClass);
          for(var i = 0; i < nodeList.length; i++){
            nodeList[i].classList.remove(activeClass);
          }
          document.getElementById('gxyBox').style.display = 'none';
          document.getElementById('diabetesBox').style.display = 'none';
          liElement.classList.add(activeClass);
        }else{
          let noneElement = selectList.querySelector("li[id=\"\\30 \"]"); //无
          if (noneElement.className === activeClass) { 
            noneElement.classList.remove(activeClass);
          }
          liElement.classList.add(activeClass);

          if (liElement === li_t) {
            document.getElementById('diabetesBox').style.display = 'block';
          }else if (liElement == li_g) {
            document.getElementById('gxyBox').style.display = 'block';
          }
        }
      }
    },

    //个人病史
    dItemClicked(event){
      let liElement = event.target;
      let activeClass = "active";
      if (liElement.className === activeClass) {
        liElement.classList.remove(activeClass);
      }else{
        let selectList = document.getElementById('dSelectList');
        if (liElement.id == 0) {
          //取消所有其它选择
          let nodeList = selectList.querySelectorAll("."+activeClass);
          for(var i = 0; i < nodeList.length; i++){
            nodeList[i].classList.remove(activeClass)
          }
          liElement.classList.add(activeClass);
        }else{
          let noneElement = selectList.querySelector("li[id=\"\\30 \"]"); //无
          if (noneElement.className === activeClass) { 
            noneElement.classList.remove(activeClass);
          }
          liElement.classList.add(activeClass);
        }
      }
    },

    //家庭高血压、糖尿病单选
    fSubItemClicked(parentNodeID,value) {
      let liElement = event.target;
      if (parentNodeID === "gxy_ul") {
        this.BothHypertensive = value;
      }else if (parentNodeID === "diabetes_ul") {
        this.BothDiabetes = value;
      }
      liElement.parentNode.querySelector(".active").classList.remove("active");
      liElement.classList.add("active");
    },

    //获取数据
    getData() {
      let that = this;
      getHealthTypes().then(function(response){
        if (response.data.IsSuccess === true) {
          that.diseaseList = response.data.ReturnData;

          getHealthHistory().then(function (resp) {
            if (resp.data != null) {
              var data = resp.data;
              
              let fSelectList = document.getElementById('fSelectList');
              let dSelectList = document.getElementById('dSelectList');
              if (data.FHealthCategoryIDs.length>2) {
                var idString = data.FHealthCategoryIDs;
                idString = idString.substring(1,idString.length-1);
                idString = idString.replace(" ","");
                var idArray = idString.split(',');
                
                for(var i = 0; i < idArray.length; i++){
                  let eid = idArray[i];
                  let element = fSelectList.querySelector("li[id=\"\\31 "+ eid.substring(1,eid.length)+"\"]");
                  element.classList.add("active");
                }
              }
              
              if (data.DHealthCategoryIDs.length>2) {
                var idString = data.DHealthCategoryIDs;
                idString = idString.substring(1,idString.length-1);
                idString = idString.replace(" ","");
                var idArray = idString.split(',');

                let selectList = document.getElementById('dSelectList');
                for(var i = 0; i < idArray.length; i++){
                  let eid = idArray[i];
                  let element = dSelectList.querySelector("li[id=\"\\31 "+ eid.substring(1,eid.length)+"\"]");
                  element.classList.add("active");
                }
              }

              var li_t = fSelectList.querySelector("li[id=\"\\31 3676\"]");
              if (li_t.className == "active") {
                document.getElementById('diabetesBox').style.display = 'block';
              }
              var li_g = fSelectList.querySelector("li[id=\"\\31 3398\"]");
              if (li_g.className == "active") {
                document.getElementById('gxyBox').style.display = 'block';
              }

              //是否父母都有糖尿病史 true：是，false 否
              that.BothDiabetes = data.BothDiabetes;
              let element_t;
              let bothDiabetes = document.getElementById('diabetes_ul');
              if (that.BothDiabetes === 'true') {
                element_t = bothDiabetes.children[0];
              } else if (that.BothDiabetes === 'false') {
                element_t = bothDiabetes.children[1];
              }
              element_t.classList.add("active");

              //是否父母都有高血压史 true：是，false 否
              that.BothHypertensive = data.BothHypertensive;
              let element_g;
              let bothHypertensive = document.getElementById('gxy_ul');
              if (that.BothHypertensive === 'true') {
                element_g = bothHypertensive.children[0];
              } else if (that.BothHypertensive === 'false') {
                element_g = bothHypertensive.children[1];
              }
              element_g.classList.add("active");
            }else{
              Toast(resp.data.ReturnMessage);
            }
          }).catch(function(error){
            Toast(error.message);
          });
        }else{
          Toast(response.data.ReturnMessage);
        }
      }).catch(function(error){
        Toast(error.message);
      });
    },

    //提交家族数据
    setFamiliyData() {
      var fIDs = [], dIDs = [];
      let fNodeList = document.getElementById('fSelectList').querySelectorAll(".active");
      let dNodeList = document.getElementById('dSelectList').querySelectorAll(".active");

      for(var i = 0; i < fNodeList.length; i++){
        fIDs.push(fNodeList[i].id);
      }
      for(var i = 0; i < dNodeList.length; i++){
        dIDs.push(dNodeList[i].id);
      }

      let that = this;
      let upData={
        BothDiabetes: that.BothDiabetes,
        BothHypertensive: that.BothHypertensive,
        FHealthCategoryIDs: fIDs,
        DHealthCategoryIDs: dIDs,
      };
      console.log(upData);
      postHealthHistory(upData).then(function(response){
        if (response.data.data === "success") {
            Toast("保存成功！");
        }else{
          Toast(response.data.ReturnMessage);
          console.log(response);
        }
      }).catch(function(error){
        Toast(error);
      });
    },

  }
}
</script>

<style scoped>
div {
  width: 92%;
  margin: 0 auto;
  padding-top: 0.2rem;
}
div h4 {
  font-size: 0.4rem;
  color: #666;
  text-align: left;
  line-height: 0.6rem;
  font-weight: normal;
  display: inline-block;
  vertical-align: middle;
}

h5 {
  font-size: 0.4266666666666667rem;
  color: #ff9600;
  text-align: left;
  line-height: 1rem;
}
h5 span {
  font-size: 0.32rem;
  color: #999;
  line-height: 0.4rem;
}

.switchItemBox {
  margin-left: -30px;
  height: 0.8rem;
  padding-top: 0.1rem;
}

#gxyBox {
  margin-top: -10px;
}

.selections_ul {
  margin: 0;
  text-align: left;
  font-size: 0;
}
.switch_ul {
  margin: 0;
  text-align: left;
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
}

li {
  display: inline-block;
  padding: 0 0.25rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #888;
  border: solid 1px #d5d5d5;
  text-align: center;
  font-size: 0.3733333333333333rem;
  border-radius: 0.4rem;
  position: relative;
  margin: 0.2rem 0.2rem 0.15rem 0;
  cursor: pointer;
}
li:last-child {
  margin-right: 0;
}
li.active {
  border: solid 1px #008dfd;
  color: #008dfd;
}
li.active:before {
  content: '';
  width: 0.32rem;
  height: 0.32rem;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1;
  background-color: #008dfd;
  border-radius: 50%;
}
li.active:after {
  content: '';
  width: 0.2133333333333333rem;
  height: 0.1066666666666667rem;
  position: absolute;
  top: 1px;
  right: 1px;
  opacity: 1;
  border: 1px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
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
