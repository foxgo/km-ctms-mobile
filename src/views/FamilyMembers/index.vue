<template>
    <div class="normal-page-box">
        <ul>
            <li v-for="(item, index) in dataList" v-bind:key="index"  @click="memberArchieve()">
                <div class="image-box"><img v-bind:src=defaultAvator></div>
                <div class="label-box">
                    <p>{{item.Name}} <span>&nbsp;{{item.Age}}岁</span></p>
                    <h6>默认</h6>
                </div>
                <div class="phonenum-box">{{item.Phone}}</div>
            </li>
        </ul>
    </div>
</template>
    
<script>
import { getFamilyMemberList, createFamilyMember, deleteFamilyMember } from '@/api/familyMember.js'

export default {
    name: 'FamilyMembers',
    data() {
        return {
            defaultAvator: require('@/assets/images/home/profile.png'),
            dataList: [],
        }
    },
    mounted() {
        this.$store.state.app.pageTitle = "家庭成员"
        this.loadData()
    },
    methods: {

        loadData() {
            const that = this
            getFamilyMemberList().then(response => {
                that.dataList = response.data.ReturnData
                console.log(that.dataList)
            }).catch(error => {
                Toast('网络错误')
            })
        },

        //跳转家庭成员档案
        memberArchieve() {

        },

        //新增成员
        addMember() {

        }
    }
}
</script>

<style lang="scss" scope>
    $cell-height: 2.0rem;
    $img-box-height: 1.5rem;
    $label-box-height: 1.3rem;

    li {
        height: $cell-height;
        text-align: left;
        border-bottom: solid 0.5px #f3f0f0;
        background-color: white;

        .image-box {
            display: inline-block;
            float: left;

            width: $img-box-height;
            height: $img-box-height;
            border-radius: 50%;
            margin-left:0.3rem;

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
            margin-left:0.2rem;

            // 垂直居中
            position:relative;
            top: ($cell-height - $label-box-height)/2;

            vertical-align: center;

            p {
                font-size: 0.5rem;
                font-weight: 500;

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

            font-size: 0.4rem;
            line-height: 0.4rem;
            width: 30%;
            color: #333;
            text-align: right;

            // 垂直居中
            position:relative;
            top: ($cell-height - 0.4rem)/2;
        }
    }
    
</style>