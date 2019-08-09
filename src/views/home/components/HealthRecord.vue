<template>
  <div class="health-record">
    <img v-bind:src="actionSheetData.avatarUrl"></img>
    <div class="toggle" @click="togglePerson()"><span>{{actionSheetData.name}} ▼</span></div> 
    <div class="space"></div>
    <div class="health-info" @click="pushPage()">健康档案</div>
    <mt-actionsheet 
	    :actions="actionSheetData.actionsDataSource"
	    v-model="actionSheetData.actionSheetVisible"
	    cancel-text="取消">
	  </mt-actionsheet>
    <!--<picker :slot-data="yearSlot" :selected-value="person.Gender" text-name="ItemName" value-name="ItemCode" @change="onChange"/>-->
  </div>
</template>

/* ▲ ▼ */ 
<script>
import Picker from '@/components/Picker'
import { Toast, Actionsheet } from 'mint-ui'
import { getFamilyMemberList, getSwitchFamilyMember } from '@/api/familyMember'
import { getBasicHealthArchivesInfo } from '@/api/healthArchives'
import { getPersonInfo } from '@/api/km360App'
import { setToken_H5, setToken_360App, getToken_H5, getToken_360App } from '@/utils/auth'

export default {
  name: 'HealthRecord',
  components: { Picker },
  data() {
    return {
    	actionSheetData: {
        name:"未登录",
    	  actionsDataSource: [],
        actionSheetVisible: false,
        avatarUrl: require('@/assets/images/home/profile.png'),
      },

      yearSlot: [{
        flex: 1,
        values: [],
        className: 'slot1',
        defaultIndex: 0
      }],
    }
  },
  mounted() {
    if(this.$store.state.user.name && this.$store.state.user.name !== 'Admin'){
      this.actionSheetData.name = this.$store.state.user.name
    }else{
      // 获取当前用户的基础信息
      getPersonInfo().then(response => {
        // console.log(JSON.stringify(response))
        const userData = response.data.Data
        this.storeUserInfo(userData)
      })
    }
  },
  methods: {
    
    pushPage() {
      this.$router.push({ path: '/healthArchives' })
    },

    togglePerson(){
      let that = this;
      getFamilyMemberList().then(response => {
        if (response.data.IsSuccess) {
          that.actionSheetData.actionsDataSource = [];

         // 遍历ReturnData，按格式处理好数据后sheet才能显示
          var memberList = response.data.ReturnData
          memberList.map(member => 
            that.actionSheetData.actionsDataSource.push(
              {name: member.Name, memberID: member.MemberID, phone:member.Phone, gender:member.Gender, method: this.actionSheetClicked }
            )
          )
          // 新增家庭成员
          that.actionSheetData.actionsDataSource.push({name: "新增家庭成员", memberID: -1, method: this.actionSheetClicked})
          that.actionSheetData.actionSheetVisible = true;
        }else {
          Toast(response.data.ReturnMessage);
        }
      }).catch(error => {
        Toast(error);
      })
    },

    actionSheetClicked(member,index) {
      // console.log('member == '+ JSON.stringify(member)  + ' index == '+index)
      if(index == this.actionSheetData.actionsDataSource.length-1){
        if(this.actionSheetData.actionsDataSource.length >= 10){
          Toast("家庭成员数量不能超过10人");
          return;
        }

        this.$router.push('/healthArchives/addMember')
        return;
      }

      let that = this;
      getSwitchFamilyMember(member.memberID).then(response => {
        if (response.data.IsSuccess) {
          console.log('切换成员成功: ' + member.name + ' ' + member.phone + ' ' + member.gender)
            
          // 更新H5-token
          const token = response.data.ReturnData.Token
          setToken_H5(token)
          console.log('new token === ' + token)

          // 先暂时使用member带过来的数据更新用户名
          that.$store.state.user.name = that.actionSheetData.name = member.name
          that.$store.state.user.phone = member.phone
          that.$store.state.user.gender = member.gender
          that.$store.state.user.memberId = member.memberID

          // 获取切换后用户的信息，正式更换用户数据（包含了头像、生日）
          getBasicHealthArchivesInfo().then(response => {
            const data = response.data.ReturnData
            console.log(data)

            if(data) {
              that.storeUserInfo({
                'UserName' : data.Name,
                'PhoneNumber' : member.phone,
                'PhotoPath' : require('@/assets/images/home/profile.png'),
                'Sex' : data.Gender,
                'Birthday' : data.Birthdate,
              })
            }
          }).catch(error => {
            Toast(error);
          })
          
        }else {
          Toast(response.data.ReturnMessage);
        }
      }).catch(error => {
        Toast(error);
      })
    },

    storeUserInfo(userData) {
      const name = userData.UserName
      const phone = userData.PhoneNumber
      const avatar = userData.PhotoPath
      const gender = userData.Sex
      const birthDate = userData.Birthday
      
      // 保存当前用户的基础信息
      this.$store.state.user.name = this.actionSheetData.name = name
      this.$store.state.user.avatar = this.actionSheetData.avatarUrl = avatar
      this.$store.state.user.phone = phone
      this.$store.state.user.gender = gender
      this.$store.state.user.birthDate = birthDate
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
        flex:0 0 px2rem(200px);
        &>span{
          color: #008dfd;
          border: 1px solid #008dfd;
          margin-left: 0.1rem;
          padding-left 0.2rem
          padding-right 0.1rem
          padding-top 0.05rem
          padding-bottom  0.05rem
          height: px2rem(50px);
          line-height:px2rem(50px);
        }
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
