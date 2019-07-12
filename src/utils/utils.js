/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import api from "../apiConfig";
import notTokenApi from "../apiConfig/not-token-api";
import sentTokenApi from "../apiConfig/sent-token-api";
import apiTypeMap from "../apiRoot";
import {getToken} from "@/utils/auth";

let utils = {
    getToken,
    getSearchParam(paramName) {
        let search = location.href.substring(location.href.indexOf("?") + 1, location.href.length);
        let array = search.split("&");
        let tempArray;
        let param = {};

        array.forEach((item) => {
            tempArray = item.split("=");
            param[tempArray[0]] = unescape(tempArray[1]);
        });

        return paramName ? param[paramName] : param;
    },
    getApiPath({name, params}, apiType = 0) {
        let path = api[name];

        if(!path) {
            path = sentTokenApi[name];
        }

        if (!path) {
            path = notTokenApi[name];
        }

        if(apiTypeMap) {
            path = apiTypeMap[apiType].api + path;
        }

        if (params) {
            for(let [key, value] of Object.entries(params)) {
                path = path.replace(new RegExp(`:${key}(?=(/|$))`), value);
            }
        }

        return path;
    },
    //末尾补0
    padEnd(a, padLen) {
        let length = padLen;
        let array = a.toString().split(".");
        let tempArray = [];

        if(array.length > 1) {
            tempArray = array[1].split("");
        }
        
        for(let i = 0; i < length; i ++) {
            tempArray.push("0");
        }
        
        a = array[0]  + tempArray.join("");

        return a;
    },
    //小数转换成整数
    getIntFormat(a, b) {
        let baseNum, baseNum1, baseNum2, padLen;
        
        try {
            baseNum1 = a.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }

        try {
            baseNum2 = b.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }

        baseNum = Math.max(baseNum1, baseNum2);
        
        if(!baseNum) {
            return {
                a: parseInt(a),
                b: parseInt(b),
                baseNum: baseNum
            };
        }
        
        if(baseNum1 == baseNum2) {
            a = a.toString().replace(".", "");
            b = b.toString().replace(".", "");
        }
        
        if(baseNum == baseNum1) {
            padLen = baseNum - baseNum2;
            b = this.padEnd(b, padLen);
            a = a.toString().replace(".", "");
        }
        
        if(baseNum == baseNum2) {
            padLen = baseNum - baseNum1;
            a = this.padEnd(a, padLen);
            b = b.toString().replace(".", "");
        }
        
        return {
            a: parseInt(a),
            b: parseInt(b),
            baseNum: Math.pow(10, baseNum)
        };
    },
    //加法
    add(a, b) {
        let obj = this.getIntFormat(a, b);
        let result = obj.a + obj.b;

        if(obj.baseNum) {
            result = result / obj.baseNum;
        }

        return result;
    },
    //减法
    reduce(a, b) {
        let obj = this.getIntFormat(a, b);
        let result = obj.a - obj.b;

        if(obj.baseNum) {
            result = result / obj.baseNum;
        }

        return result;
    },
    //乘法
    multiply(a, b) {
        let obj = this.getIntFormat(a, b);
        let result = obj.a * obj.b;

        if(obj.baseNum) {
            result = result / (obj.baseNum * obj.baseNum);
        }
        
        return result;
    },
    //除法
    divide(a, b) {
        let obj = this.getIntFormat(a, b);
        let  result = obj.a / obj.b;
        
        return result;
    },
    // 是否为空对象
    isEmpty(obj) {
        return !obj || JSON.stringify(obj) === "{}";
    },
    //时间格式化
    formatTime(value) {
        return value < 10 ? "0" + value : value;
    },
    // 格式化时间
    getCurrentTime(current) {
        if(!current) {
            current = new Date(); //获取系统当前时间
        }
        
        let year = this.formatTime(current.getFullYear());
        let month = this.formatTime(current.getMonth() + 1);
        let date = this.formatTime(current.getDate());
        let hours = this.formatTime(current.getHours()); //时
        let minutes = this.formatTime(current.getMinutes()); //分
        let seconds = this.formatTime(current.getSeconds()); //秒
        let day = current.getDay();
        
        let weekday = {
            "0": "天",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        };
        
        return {
            year,
            month,
            date,
            hours,
            minutes,
            seconds,
            day,
            dateStr: `${year}-${month}-${date}`,
            dayStr: `星期${weekday[day]}`,
            alias: `周${weekday[day]}`,
        };
    },
    capitalize(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    },
    mapState(vm) {
        let self = this;
        let state = vm.$store.state;
        let computed = {};
        
        for(let pro in state) {
            computed[pro] = {
                get() {
                    return vm.$store.state[pro];
                },
                set(val) {
                    vm.$store.dispatch("set" + self.capitalize(pro), val);
                }
            };
        }
        
        return computed;
    },
    getMapProp(map, key, pro) {
        let prop = key;

        if(typeof prop !== "string") {
            prop += "";
        }

        if(!map || !map[prop]) {
            return "";
        }

        return map[prop][pro];
    },
    getMapText(map, key) {
        return this.getMapProp(map, key, "text");
    },
    getMapKey(map, key) {
        return this.getMapProp(map, key, "key");
    },
    getMapKeyByValue(map, pro, value) {
        let key;

        for(let prop in map) {
            if(map[prop][pro] === value) {
                key = prop;

                break;
            }
        }

        return key;
    }
};

export default utils;
