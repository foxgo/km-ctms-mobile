/**
 * Created by huangyh(黄永号) on 2019/07/10.
 */

let api = {
    //健康三秒模块 - [1]更新健康数据
    updateHealthData: "/api/EatCircle/UpdateHealthData",
    //健康三秒模块 - [2]更新饮食详情
    addDietDetails: "/api/EatCircle/AddDietDetails",
    //健康三秒模块 - [3]获取健康数据
    getHealthData: "/api/EatCircle/GetHealthData",
    //健康三秒模块 - [4]获取饮食详情
    getDietDetails: "/api/EatCircle/GetDietDetails",
    //健康三秒模块 - [5]图片查询食物
    getCalorieFromPicForHealth: "/api/EatCircle/GetCalorieFromPicForHealth",
    //健康三秒模块 - [6]分词查询食物
    getRecommendFoodList: "/api/EatCircle/GetRecommendFoodList",
    //健康三秒模块 - [7]删除饮食记录
    removeDietDetails: "/api/EatCircle/RemoveDietDetails",
    //健康三秒模块 - [8]健康数据统计
    getHealthDataStatistics: "/api/EatCircle/HealthDataStatistics",
    //健康三秒模块 - [9]实时联想查询
    getAssociationFood: "/api/EatCircle/GetAssociationFood",

    //获取个人资料
    getPatientInfo: "/api/Patient/Info",

   /* //HealthManager - 健康三秒钟评估接口（健康管理部门）
    getHealthThreeSecondRecord: "/api/HealthManager/GetHealthThreeSecondRecord"*/
};

export default api;
