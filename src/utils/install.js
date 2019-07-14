/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import {Toast, MessageBox} from "mint-ui";
import Swiper from "@/assets/js/swiper/swiper.js";
import api from "../apiConfig";
import notTokenApi from "../apiConfig/not-token-api";
import sentTokenApi from "../apiConfig/sent-token-api";
import ajax from "./ajax";
import utils from "./utils";
import "@/assets/js/swiper/swiper.min.css";

export default {
    install: (Vue, options) => {
        Vue.prototype.$api = api;

        Vue.prototype.$notTokenApi = notTokenApi;

        Vue.prototype.$sentTokenApi = sentTokenApi;

        Vue.prototype.$utils = utils;

        Vue.prototype.$createSwiper = function(el, options) {
            return new Swiper(el, options);
        };

        Vue.prototype.$ajax = function(options) {
            let promise = window.requestPromise = ajax(options, this);
            
            return promise;
        };
    
        // 中断请求
        Vue.prototype.$abortRequest = function(options) {
            if(window.requestPromise) {
                window.requestPromise.abort();
            }
        };

        Vue.prototype.$goto = function(name, method = "push") {
            let option, route;

            if(typeof name === "string") {
                option = {
                    name
                }
            } else if(typeof name === "object") {
                option = name;
            }

            if(option.target) {
                route = this.$root.$router.resolve(option);

                window.open(route.href, option.target);
            } else {
                this.$root.$router[method](option);
            }
        };

        //
        Vue.prototype.$MessageBox = MessageBox;

        //弹出提示消息
        Vue.prototype.$toast = function(message) {
            Toast(message);
        };

        //弹出成功提示消息
        Vue.prototype.$toastSuccess = function(message) {
            Toast({
                message,
                //iconClass: "icon mui-icon mui-icon-checkmarkempty",
                //duration: 150000
            });
        };
    }
};
