<template>
	<div class="health-questions">
		<div class="linkBox">
			<ul>
				<li v-for="item in linkerList">
					<router-link :to="{name:item.name,params:{isLink:1}}" active-class="seleted_li_a">{{item.title}}</router-link>
				</li>
			</ul>
		</div>
		<router-view/>
	</div>
</template>

<script>

export default {
	name: "HealthArchives",
	data() {
		return {
			linkerList: [
		        { title: '基础信息', name: 'BasicArchives' },
		        { title: '饮食', name: 'EatingHabits' },
		        { title: '运动', name: 'Labor' },
		        { title: '吸烟饮酒', name: 'Drinking&Smoking' },
		        { title: '健康史', name: 'HealthHistory' }
		      ],
		}
	},
	mounted() {
	    this.$store.state.app.pageTitle = '健康问卷';
	    this.$router.push({name:this.linkerList[0].name,params:{isLink:1}});
	},
	beforeRouteUpdate (to, from, next) {
	    //点击返回按钮后跳到首页
	    if (Object.keys(to.params).length <= 0) {
	      this.$router.back('/');
	    }else{
	      next();
	    }
	},
}

</script>

<style>
	.health-questions {
		margin-top: 40px;
	}
	.linkBox {
		width: 100%;
  		max-width: 10rem;
	  	margin: 0 auto;
	  	height: 0.8rem;
	}

	.linkBox ul li {
	    float: left;  /* 向左漂移，将竖排变为横排 */
	    width: 20%;
	    height: 0.8rem;
	    border-bottom: 0.5px rgb(200, 200, 200) solid;
	}

	.linkBox ul li a {
	    text-align: center;
	    color: rgb(102, 102, 102);
	    font-size: 0.35rem;
	    font-family: HiraginosansGB-W3;
	    display: block;
	    line-height: 0.8rem;
	    text-decoration: none;
	}

	.linkBox ul li a.seleted_li_a, .linkBox ul li a:active  {
	    color: rgb(0, 141, 253);
	    border-bottom: 2px rgb(0, 141, 253) solid;
	}
</style>
