<template>
    <div class="goods-list-box">
        <ul>
            <li v-for="(item, index) in suggestionData" v-bind:key="index" @click="gotoProductURL(item)">
                <div class="img-box"><img v-bind:src="item.Image" /></div>
                <h2>{{item.ProductName}}</h2>
                <p class="mark">{{item.Remark}}</p>
                <div class="price-box"><h6>{{item.Price ? '￥' + item.Price : ' ' }}&nbsp;&nbsp;<strike>{{item.originalcost ? '￥'+item.originalcost : ''}}</strike></h6></div>
                <p class="sales">{{item.Specifications ? (item.Specifications + '已卖出' + item.Salesvolume + '件') : ''}}<span></span></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "GoodsList",
    props: ['suggestionData'],
    //      [
    //          {
    //             "ID": 1411,
    //             "DimensionTypeCode": "CM05.01.01",
    //             "DimensionTypeName": "疾病",
    //             "DimensionID": 0,
    //             "DimensionName": "脑卒中",
    //             "ProductType": "设备",
    //             "ProductID": 53,
    //             "ShoppingMallProductID": null,
    //             "ProductURl": null,
    //             "ProductName": "电脑中频",
    //             "Specifications": null,
    //             "Price": null,
    //             "originalcost": null,
    //             "Salesvolume": null,
    //             "Remark": "用于治疗康复理疗保健的一种先进医疗设备",
    //             "Image": "http://hc003teststore.blob.core.chinacloudapi.cn/productimg/20190808115148276.jpg",
    //             "GroupID": 2,
    //             "OrganizationID": 32,
    //             "OrganizationName": null,
    //             "CreatedBy": -1,
    //             "CreatedTime": "2019-08-08T11:51:49",
    //             "ModifiedBy": -1,
    //             "ModifiedTime": "2019-08-08T11:51:49",
    //             "IsDeleted": false,
    //             "Order": 0,
    //             "Status": false
    //         }
    //     ]
    methods:{
        gotoProductURL:function(item){
            if (!!item) {
                this.$root.actionToNative('gotoShoppingMall', item.ProductName, item.ProductURl, {'gooID': item.ID})
            }
       }
    }
}
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
        border-bottom: solid 1px #f1eeee;
    }
    li .img-box {
        width: 2.4rem;
        height: 2.4rem;
        display: inline-block;
        float: left;
        margin-left: 0.2rem;
        // background: #ff4848;
        // border: solid 1px #dad6d6;
        
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
        font-weight: 400;
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