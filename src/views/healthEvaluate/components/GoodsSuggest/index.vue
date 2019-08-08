<template>
    <div class="goods-list-box">
        <ul>
            <li v-for="(item, index) in dataList" v-bind:key="index" @click="gotoProductURL(item.ProductName, item.ProductURl)">
                <div class="img-box"><img v-bind:src="item.Image" /></div>
                <h2>{{item.ProductName}}</h2>
                <p class="mark">{{item.Remark}}</p>
                <div class="price-box" v-if="item.Price"><h6>￥{{item.Price || '-'}}&nbsp;&nbsp;<strike>{{item.originalcost ? '￥'+item.originalcost : ''}}</strike></h6></div>
                <p class="sales">{{item.Specifications}}<span>已卖出{{item.Salesvolume || '-'}}件</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "GoodsList",
    props: {
        suggestionData: '',
        dataList:{
            type: Array,
            // required: true,
            default: function() {
                return [
                    {
                        'Image': 'http://5b0988e595225.cdn.sohucs.com/c_fill,w_150,h_100,g_faces,q_70/images/20180323/b78eb3f67ee64f8b844651fa62b92978.jpeg',
                        'ProductName': '神器',
                        'Specifications': '1盒/10克',
                        'Remark': '好东西',
                        'Price': '123',
                        'originalcost': '223',
                        'Salesvolume': '101'
                    },
                    {
                        'Image': 'http://5b0988e595225.cdn.sohucs.com/c_fill,w_150,h_100,g_faces,q_70/images/20180323/b78eb3f67ee64f8b844651fa62b92978.jpeg',
                        'ProductName': '神器',
                        'Specifications': '1盒/10克',
                        'Remark': '好东西',
                        'Price': '123',
                        'originalcost': '223',
                        'Salesvolume': '101'
                    },
                    {
                        'Image': 'http://5b0988e595225.cdn.sohucs.com/c_fill,w_150,h_100,g_faces,q_70/images/20180323/b78eb3f67ee64f8b844651fa62b92978.jpeg',
                        'ProductName': '神器',
                        'Specifications': '1盒/10克',
                        'Remark': '好东西',
                        'Price': '123',
                        'originalcost': '223',
                        'Salesvolume': '101'
                    }
                ]
            }

        }
    },
    methods:{
        gotoProductURL:function(title, url){
            if (!!url) {
                this.$root.actionToNative('', title, url)
            }
       }
    }
}
/* 
Dimensions: {
    Image
    ProductName
    Specifications
    Remark
    Price
    originalcost
    Salesvolume
}
*/
</script>

<style lang="scss" scoped>
    .goods-list-box ul {
        margin-left: 2%;
    }
    .goods-list-box li {
        width: 96%;
        height: 2.4rem;
        text-align: left;
        padding: 0.4rem 0;
        border-bottom: solid 1px #e2e0e0;
    }
    li .img-box {
        width: 2.4rem;
        height: 2.4rem;
        display: inline-block;
        float: left;
        // background: #ff4848;
        // border: solid 1px #d2d2d2;
        
        position: relative;
    }
    
    li .img-box img {
        width: 100%;
        height: auto;

        position: absolute;
        top:50%; 
        left:50%;
        transform: translate(-50%,-50%);
    }
    li h2 {
        width: 69%;
        display: inline-block;
        float: left;
        font-size: 0.36rem;
        font-weight: 600;
        line-height: 0.36rem;
        text-indent: 0.4rem;
    }
    li p {
        width: 69%; 
        display: inline-block;
        float: left;
        font-size: 0.32rem;
        line-height: 0.6rem;
        color: #999;
        text-indent: 0.4rem;
        white-space: nowrap;
        overflow: hidden;
    }

    p.mark {
        color: #666;
        padding: 0.1rem 0 0.2rem 0;
    }

    li p span {
        // float: right;
        padding-left: 0.5rem;
        text-align: left;
        font-size: 0.32rem;
        margin-right: 5%;
    }

    .price-box {
        display: inline;
        float: left;
        width: 69%;
        text-indent: 0.4rem;
    }
    .price-box > h6 {
        width: 100%;
        font-size: 0.42rem;
        font-weight: 500;
        line-height: 0.7rem;
        color: #f04040;

        // padding-top: 0.12rem;
    }
    .price-box > h6 > strike {
        color: rgb(211, 206, 206);
        font-size: 0.3466666666666667rem;
        margin-left: 0.1rem;
    }

</style>