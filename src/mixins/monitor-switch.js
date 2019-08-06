/**
 * Created by HamiltonTan on 2019/08/06.
 */

const mixinswitch = {
    computed:{
        memberId:function(){
          return this.$store.state.user.memberId
        }
      }
};

export default mixinswitch;
