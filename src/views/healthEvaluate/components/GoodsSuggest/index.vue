<template>
    <div>
        <ul>
            <li v-for="(item, index) in dataList" v-bind:key="index" @click="gotoProductURL(item.ProductName, item.ProductURl)">
                <div class="img-box"><img v-bind:src="item.Image" /></div>
                <h6>{{item.ProductName}}</h6>
                <p>{{item.Specifications}}</p>
                <p>{{item.Remark}}</p>
                <div class="price-box" v-if="item.Price"><h6>￥{{item.Price || '-'}}<strike>{{item.originalcost ? '￥'+item.originalcost : ''}}</strike><span>已卖出{{item.Salesvolume || '-'}}件</span></h6></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "GoodsList",
    props: {
        dataList:{
            type: Array,
            default: [],
            required: true
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

<style lang="scss">
    li {
        width: 96%;
        height: 2.333333333rem;
        margin: 0.4rem auto;
        text-align: left;
    }
    li .img-box {
        width: 30%;
        height: 2.133333333333333rem;
        border-radius: 0.1066666666666667rem;
        border: solid 1px #d2d2d2;
        display: inline-block;
        float: left;
        overflow: hidden;
    }
    li .img-box img {
        width: auto;
        height: 100%;
        margin: 0 auto;
        display: table-cell;
        text-align: center;
        vertical-align: center;
    }
    li h6 {
        width: 69%;
        display: inline-block;
        float: left;
        font-size: 0.4rem;
        font-weight: normal;
        line-height: 0.55rem;
        text-indent: 0.2666666666666667rem;
    }
    li p {
        width: 69%; 
        display: inline-block;
        float: right;
        font-size: 0.32rem;
        line-height: 0.55rem;
        color: #999;
        text-indent: 0.2666666666666667rem;
        white-space: nowrap;
        overflow: hidden;
    }

    .price-box {
        display: inline;
        float: left;
        width: 69%;
    }
    .price-box > h6 {
        width: 100%;
        line-height: 0.7rem;
        color: #ff4848;
    }
    .price-box > h6 > strike {
        color: #999;
        font-size: 0.3466666666666667rem;
        margin-left: 0.1rem;
    }
    .price-box > h6 > span {
        float: right;
        text-align: right;
        font-size: 0.32rem;
        color: #999;
        margin-right: 5%;
    }

</style>