<template>
  <div class="health-record">
    <img v-bind:src="require('@/assets/images/home/profile.png')"></img>
    <div class="toggle" @click="togglePerson()">{{name}} ▼</div> 
    <div class="space"></div>
    <div class="health-info" @click="pushPage()">健康档案</div>
    <mt-actionsheet 
	    :actions="personActions"
	    v-model="personSheetVisible"
	    cancel-text="新增家庭成员">
	  </mt-actionsheet>
  </div>
</template>

/* ▲ ▼ */ 
<script>
import { Toast,Actionsheet } from 'mint-ui'
import { getSwitchFamilyMember } from '@/api/person'
export default {
  name: 'HealthRecord',
  data() {
    return {
    	name:"梁小明",
    	infoDegree:"80%",
    	personActions: [],
      personSheetVisible: false,
    }
  },
  mounted() {
    
  },
  methods: {
    pushPage() {
      this.$router.push({ path: '/healthArchives' })
    },
    togglePerson(){
    	let that = this;
    	getSwitchFamilyMember(27299).then(response => {
        if (response.data.IsSuccess) {
          this.personActions = [];
	      	this.personActions.push(response.data.ReturnData);
	      	this.personSheetVisible = true;
        }else {
          Toast(response.data.ReturnMessage);
        }
      }).catch(error => {
        Toast(error);
      })
    },
    selectperson(value){
    	this.name = value.name;
    },
    Cancel(){
      alert("取消")
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .health-record
       height:px2rem(120px)
       line-height:px2rem(35px)
       border:1px solid #eee
       border-left:none
       border-right:none
       background:#fff
       display:flex
       align-items:center
    &>img
       width:px2rem(90px)
       height:px2rem(90px)
       padding-left:10px
    &>div
      font-size:px2rem(28px)
      flex:1
      &>.toggle{
      	margin-left: px2rem(20px);
        color: #008dfd;
        border: 1px solid #008dfd;
        flex:0 0 px2rem(140px);
        height: px2rem(50px);
        line-height:px2rem(50px);
      }
    &>div.space{
      flex:1;
    }
    &>div.health-info{
      color:#fff
      flex:0 0 px2rem(200px);
      height:px2rem(60px);
      line-height:px2rem(60px);
      background:#008dfd
    	border-radius:px2rem(30px);
    	margin-right: px2rem(14px);
    }
</style>
