/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import {Indicator} from "mint-ui"

let tempImage;

let globalMixin = {
    data() {
        return {}
    },
    computed: {},
    beforeCreate() {
        this.$options.computed = Object.assign(this.$utils.mapState(this), this.$options.computed);
    },
    mounted() {},
    methods: {
        // 加载loading
        showLoading(text = "正在加载……") {
            Indicator.open({
                text,
                spinnerType: "fading-circle"
            });
        },
        // 隐藏 loading
        hideLoading() {
            Indicator.close();
        },
        // 设置标题
        setPageTitle(title) {
            this.$store.state.app.pageTitle = title;
        },
        //获取路由
        getRouterPath(routerObj) {
            let routes = this.$router.options.routes;
            let path = "", router, params, query;

            if(typeof routerObj == "object") {
                router = routes.find((n) => n.name === routerObj.name);
                params = routerObj.params;
                query = routerObj.query;

                path = router.path;

                if(params) {
                    for(let [key, value] of Object.entries(params)){
                        path = path.replace(new RegExp(`:${key}(?=([/\:]|$))`), value);
                    }
                }

                if(query) {
                    let queryStr = [];

                    for(let [key, value] of Object.entries(query)){
                        queryStr.push(`${key}=${value}`);
                    }

                    path += "?" + queryStr.join("&");
                }
            } else {
                router = routes.find((n) => n.name === routerObj);
                path = router.path;
            }

            return path;
        },
        setTempImage(img) {
            tempImage = img;
        },
        getTempImage() {
            return tempImage;
        },
        // 对原生统一调用方式
        actionToNative(action, title, url) {
            const obj = {
                'action': action,
                'title': title,
                'url': url
            }
            alert(JSON.stringify(obj))
        }
    }
};

export default globalMixin;
