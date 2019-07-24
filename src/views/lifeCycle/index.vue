<template>
    <div class="life-cycle">
        <div class="info-box">
            <span>您目前处于生命周期</span><span>中年期</span>
            <h6>女 62岁</h6>
        </div>

        <div class="common-questions-box">
            <div>
                <img src="" alt=""><span>常见健康问题</span>
            </div>
            <div class="questions-box">
                <span v-for="(item, index) in diseases">{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lifeCycle',
    components: {},
    data(){
        return {
            diseases:['骨质疏松','肺癌','直肠癌','乳腺癌','胃癌','结肠癌','高血压','冠心病','肩周炎','糖尿病','带状疱疹','宫颈癌','脑卒中'],
        }
    },
}
</script>

<style lang="stylus">
@import '~@/assets/styles/varibles.styl'
.life-cycle{
    background-color #F6F6F6
    padding-top px2rem(10)
}
.info-box {
    background url(../../assets/images/lifeCycle/icon_lifecycle_bg.png) no-repeat
    background-size 100% 100%
    text-align left 
    height px2rem(120)
    width 96%
    margin-left 2%
    padding-top px2rem(20)
    margin-bottom px2rem(20)
    border-radius px2rem(10)
    
    &>span:nth-child(1) {
        margin-top px2rem(40)
        padding-left px2rem(40)
        font-size px2rem(25)
        color #999
    }
    &>span:nth-child(2) {
        padding-top px2rem(20)
        padding-left px2rem(20)
        color $bgColor
        font-size px2rem(36)
    }
    &>h6 {
        padding-left px2rem(40)
        height px2rem(60)
        line-height px2rem(60)
        font-size px2rem(25)
    }
}

.common-questions-box {

}
</style>
