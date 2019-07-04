/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import axios from "axios";

import code from "../map/code";
import apiTypeMap from "../apiRoot";

let requests = [];

let utils = {
    vm: null,
    getApi({name, params}, apiType = 0) {
        let path = this.vm.$api[name];

        if(!path) {
            path = this.vm.$sentTokenApi[name];
        }

        if (!path) {
            path = this.vm.$notTokenApi[name];
        }

        if(this.vm.$root.apiRoot) {
            path = this.vm.$root.apiRoot[apiType].api + path;
        } else {
            path = apiTypeMap[apiType].api + path;
        }
        
        if (params) {
            for (let [key, value] of Object.entries(params)) {
                path = path.replace(new RegExp(`:${key}(?=(/|$))`), value);
            }
        }
        
        return path;
    },
    toast(message) {
        this.vm.$root.$toast(message);
    },
    showLoading(text) {
        this.vm.$root.showLoading(text);
    },
    hideLoading() {
        this.vm.$root.hideLoading();
    },
    goLogin() {
        return this.vm.$goto({
            name: "login",
            query: {
                redirect: location.pathname
            }
        });
    },
    fail(error) {
        let message = "请求出错！";
        if (error && error.message) {
            message = error.message;
        }
        
        if (typeof error == "string") {
            message = error;
        }
        this.hideLoading();
        this.toast(message);
        
        return {
            message
        };
    },
    param(data) {
        let array = [];

        for(let pro in data) {
            array.push(`${pro}=${data[pro]}`);
        }

        return array.join("&");
    },
    getRequestOption(options) {
        let request = options.request;
        let url = this.getApi(request, options.apiType);
        let token = this.vm.$utils.getToken();
        let data = options.data;
        let method = options.type.toLowerCase();
        let fetchOptions = {};
        
        let headers = Object.assign({
            "Content-Type": "text/plain"
        }, options.headers);
        
        if(this.vm.$api[request.name]) {
            if(!token) {
                this.goLogin();

                return;
            }

            headers.token = `${token}`;
        }

        if(this.vm.$sentTokenApi[request.name]) {
            headers.token = token ? `${token}` : "";
        }
        
        if(method === "post" && typeof FormData !== "undefined" && data instanceof FormData) {
            
        } else if (method === "post") {
            headers["Content-Type"] = "application/json"; //application/x-www-form-urlencoded application/json
            
            //data = this.param(data);
        } else if (method !== "get" && data) {
            data = JSON.stringify(data);
        } else if (data) {
            url += "?" + this.param(data);
        }
    
        fetchOptions = {
            url,
            headers,
            method,
            data
        };
        
        return fetchOptions;
    },
    fetch(options) {
        let fail = () => {
            this.fail("服务器请求错误");
        };
        let time = 60000;
        let p, timeout, promise, fetchOption, abort, abortPromise, fetchPromise;
        
        options = Object.assign({
            showLoading: true,
            apiType: 0,
            needReject: false
        }, options);
        
        fetchOption = this.getRequestOption(options);

        if(fetchOption) {
            fetchOption.timeout = time;
        }
        
        if(options.showLoading) {
            this.showLoading();
        }
        
        abortPromise = new Promise((resolve, reject) => {
            abort = () => {
                reject();
                console.log("请求中断");
            };
            
            timeout = setTimeout(() => {
                reject();
                
                this.toast("请求超时");
            }, time);
        });
        
        fetchPromise = new Promise((resolve, reject) => {
            if(!fetchOption) {
                return reject({
                    message: "token已被清除，请重新登录"
                });
            }

            axios(fetchOption).then((res) => {
                clearTimeout(timeout);
                return res.data;
            }, (err) => {
                clearTimeout(timeout);
                reject(fail(err));
            }).then((res) => {
                if([code.tokenInvalid.code, code.tokenLose.code, code.tokenLose.tokenTimeout].indexOf(res.code) !== -1) {
                    //this.vm.$root.clearTokenAndProfiles();
                    this.vm.$goto({
                        name: "login"
                    });
                    
                    return reject(res);
                }

                if(res.code === code.fail.code) {
                    return reject(res);
                }
                
                return resolve(res);
            }).catch(() => {
                console.log("请求出错");
            });
        });
        
        promise = new Promise((resolve, reject) => {
            p = Promise.race([
                fetchPromise,
                abortPromise
            ]).then((res) => {
                resolve(res);
            }, (res) => {
                if(!options.needReject) {
                    for(let pro in code) {
                        if(code[pro].code === res.code) {
                            this.toast(res.message || code[pro].message || code.fall.message);
                            break;
                        }
                    }

                } else {
                    reject(res);
                }
            });
            
            requests.push(p);
        });
        
        Promise.all(requests).then(() => {
            requests = [];
            this.hideLoading();
        }, () => {
            this.hideLoading();
        });
        
        promise.abort = abort;
        
        return promise;
    }
};

function ajax(options, vm) {
    options = Object.assign({
        type: "get"
    }, options);
    
    /*if(!utils.vm) {
        utils.vm = vm;
    }*/

    utils.vm = vm;
    
    return utils.fetch(options);
}

export default ajax;
