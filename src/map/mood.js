/**
 * Created by huangyh(黄永号) on 2019/07/12.
 */

//可选	int心情,1.高兴,2.愉快,3.平和,4.低落,5.生气,0.未填写心情记录（可选,需求修改该字段时传值即可）
export default {
    "0": {
        key: "none",
        text: "未填写",
        value: 0,
        icon: "",
        activeIcon: ""
    },
    "1": {
        key: "happy",
        text: "高兴",
        value: 1,
        icon: "icon-happy",
        activeIcon: "icon-happy-on"
    },
    "2": {
        key: "cheerful",
        text: "愉快",
        value: 2,
        icon: "icon-cheerful",
        activeIcon: "icon-cheerful-on"
    },
    "3": {
        key: "peaceful",
        text: "平和",
        value: 3,
        icon: "icon-peaceful",
        activeIcon: "icon-peaceful-on"
    },
    "4": {
        key: "low",
        text: "低落",
        value: 4,
        icon: "icon-low",
        activeIcon: "icon-low-on"
    },
    "5": {
        key: "angry",
        text: "生气",
        value: 5,
        icon: "icon-angry",
        activeIcon: "icon-angry-on"
    }
};
