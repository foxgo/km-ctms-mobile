<template>
    <div class="member-list-box normal-page-box">
        <a class="km-header-bar" @click="addMember" style="color:white;">添加新成员</a>
        <ul>
            <li class="list-item" v-for="(item, index) in dataList" data-type="0" :key="index">
                <!-- item 内容 -->
                <div class="item-content-box" @touchstart.capture="touchStart" @touchmove.capture="touchMove" @touchend.capture="touchEnd" @click="itemClicked(item.MemberID)">
                    <div class="image-box"><img v-bind:src=defaultAvator></div>
                    <div class="label-box">
                        <p>{{item.Name}} <span>&nbsp;{{item.Age}}岁</span></p>
                        <h6>默认</h6>
                    </div>
                    <div class="phonenum-box">{{item.Phone}}</div>
                </div>
                <!--  删除按钮 -->
                <div class="delete" @click="deleteItem(item)" :data-index="index">取消关注</div>
            </li>
        </ul>
    </div>

    
</template>
    
<script>
import { MessageBox } from 'mint-ui'
import { getFamilyMemberList, createFamilyMember, deleteFamilyMember } from '@/api/familyMember.js'

export default {
    name: 'FamilyMembers',
    data() {
        return {
            defaultAvator: require('@/assets/images/home/profile.png'),
            dataList: [],

            startX: 0,
            endX: 0,
        }
    },
    mounted() {
        this.$store.state.app.pageTitle = "家庭成员"
        // this.loadData()
    },
    methods: {

        loadData() {
            const that = this
            this.$root.showLoading()

            getFamilyMemberList().then(response => {
                that.dataList = response.data.ReturnData
                this.$root.hideLoading()
            }).catch(error => {
                this.$root.hideLoading()
                Toast('网络错误')
            })
        },

        //跳转家庭成员档案
        memberArchieve(memberId) {
            //此处只能使用params传参，使用query会造成返回时找不到上级页面
            this.$router.push({name:'HealthArchives', params:{memberId}})
        },

        //新增成员
        addMember() {
            if (this.dataList.length >= 10) {
                Toast("家庭成员数量不能超过10人")
                return
            }
            this.$router.push('/healthArchives/addMember')
        },

        itemClicked(memberId) {
            if (this.checkSlide()) {
                this.resetSlide()
            }else {
                this.memberArchieve(memberId)
            }
        },

        // 滑动开始
        touchStart(e) {
            this.startX = e.touches[0].clientX
        },
        // 正在滑动
        touchMove(e) {
            // 当前滑动的父级元素
            // const parentElement = e.currentTarget.parentElement
            // 实时修改父级元素的位置
            //
            // if (parentElement.dataset.type == 0 && this.startX - this.endX > 10) {
            //     const element = e.currentTarget
            //     element.style.right = "30px"
            // }
        },
        // 滑动结束
        touchEnd(e) {
            // 当前滑动的父级元素
            const parentElement = e.currentTarget.parentElement
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX
            // 左滑
            if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
                this.resetSlide()
                parentElement.dataset.type = 1
            }
            // 右滑
            if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
                this.resetSlide()
                parentElement.dataset.type = 0
            }
            this.startX = 0
            this.endX = 0
        },

        // 判断当前是否有滑块处于滑动状态
        checkSlide() {
            const listItems = document.querySelectorAll('.list-item')
            // 复位
            for (var i = 0; i < listItems.length; i ++) {
                if (listItems[i].dataset.type == 1) {
                    return true
                }
            }
            return false
        },

        // 复位滑动状态
        resetSlide() {
            const listItems = document.querySelectorAll('.list-item')
            // 复位
            for (var i = 0; i < listItems.length; i ++) {
                listItems[i].dataset.type = 0
            }
        },

        // 删除
        deleteItem(item) {
            const target = event.currentTarget
            MessageBox.confirm('取消关注家庭成员').then(action => {
                deleteFamilyMember(item.PersonFamilyID).then(response => {
                    // 当前索引
                    const index = target.dataset.index
                    // 复位
                    this.resetSlide
                    // 删除
                    this.dataList.splice(index,1)
                })
            }).catch(error => { });
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.loadData()
        });
    }
}
</script>

<style lang="scss" scoped>
    $cell-height: 2.0rem;
    $img-box-height: 1.4rem;
    $label-box-height: 1.3rem;

    .member-list-box {
        // 此设置用于阻止手机上的侧滑删除出现全屏横滑问题
        overflow-x:hidden; 
        width:100%;
    }

    ul {
        padding-top: 0.2rem;
        background-color: white;
    }

    li {
        position: relative;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;

        height: $cell-height;
        text-align: left;
        border-bottom: solid 0.5px #f3f0f0;

        &[data-type="0"] {
            transform: translate3d(0,0,0);
            -webkit-transform: translate3d(0,0,0);
        }

        &[data-type="1"]{
            transform: translate3d(-2.4rem,0,0);
            -webkit-transform: translate3d(-2.4rem,0,0);
        }

        .image-box {
            display: inline-block;
            float: left;

            width: $img-box-height;
            height: $img-box-height;
            border-radius: 50%;
            margin-left:0.4rem;

            // 垂直居中
            position:relative;
            top: ($cell-height - $img-box-height)/2;            

            img {
                margin: 0 auto;
                width: auto;
                height: 100%;
            }
        }

        .label-box {
            float: left;

            display: flex;
            flex-direction: column;
            justify-content: center;
            
            width: 40%;
            height: $label-box-height;
            // background-color: red;
            margin-left:0.3rem;

            // 垂直居中
            position:relative;
            top: ($cell-height - $label-box-height)/2;

            vertical-align: center;

            p {
                font-size: 0.42rem;
                font-weight: 400;

                span {
                    font-size: 0.4rem;
                    font-weight: 50;
                    color: rgb(65, 63, 63);
                }
            }

            h6 {
                font-size: 0.35rem;
                color: #999;
                padding-top: 0.2rem;
            }
        }

        .phonenum-box {
            float: right;
            margin-right:0.3rem;

            font-size: 0.42rem;
            line-height: 0.4rem;
            // font-weight: lighter;
            width: 30%;
            color: #666;
            text-align: right;

            // 垂直居中
            position:relative;
            top: ($cell-height - 0.4rem)/2;
        }

        .delete {
            position: absolute;
            top:0;
            right: -2.4rem;
            overflow: hidden;

            width: 2.4rem;
            height: $cell-height;
            background: #ccc;
            font-size: 0.42rem;
            color: #fff;
            text-align: center;
            line-height: $cell-height;
            
        }
    }
    
</style>