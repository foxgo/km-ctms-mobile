/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import { Indicator } from 'mint-ui'
import { getHealthArchivesInfo } from '@/api/healthArchives'

let tempImage

const globalMixin = {
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
        showLoading(text = '正在加载……') {
            Indicator.open({
                text,
                spinnerType: 'fading-circle'
            })
        },
        // 隐藏 loading
        hideLoading() {
            Indicator.close()
        },
        // 设置标题
        setPageTitle(title) {
            this.$store.state.app.pageTitle = title
        },
        //获取路由
        getRouterPath(routerObj) {
            const routes = this.$router.options.routes
            let path = "", router, params, query

            if(typeof routerObj === 'object') {
                router = routes.find((n) => n.name === routerObj.name)
                params = routerObj.params
                query = routerObj.query

                path = router.path

                if(params) {
                    for(const [key, value] of Object.entries(params)) {
                        path = path.replace(new RegExp(`:${key}(?=([/\:]|$))`), value)
                    }
                }

                if(query) {
                    const queryStr = []

                    for(const [key, value] of Object.entries(query)) {
                        queryStr.push(`${key}=${value}`)
                    }

                    path += '?' + queryStr.join('&')
                }
            } else {
                router = routes.find((n) => n.name === routerObj)
                path = router.path
            }

            return path
        },
        //获取档案信息请求
        getHealthArchivesInfo() {
            return getHealthArchivesInfo().then((res) => {
                this.$store.state.personInfo.info = res.data.ReturnData;

                return this.$store.state.personInfo.info;
            });
        },
        //获取档案信息
         getPersonInfo() {
            return new Promise(async (resolve, reject) => {
                let personInfo = this.$store.state.personInfo.info;

                if(this.$utils.isEmpty(personInfo)) {
                    personInfo = await this.getHealthArchivesInfo();

                    if(personInfo.Birthday) {
                        let startTime = new Date(personInfo.Birthday); // 开始时间
                        let endTime = new Date(); // 结束时间
                        let usedTime = endTime - startTime; // 相差的毫秒数
                        let usedYears = usedTime/(1000*60*60*24*365);

                        personInfo.Age = parseInt(usedYears);
                    }
                }

                if(this.$utils.isEmpty(personInfo)) {
                    reject(personInfo);
                } else {
                    resolve(personInfo);
                }
            }).catch(() => {});
        },
        //设置缓存的图片文件（食物录入）
        setTempImage(img) {
            tempImage = img
        },
        //设获取缓存的图片文件（食物录入）
        getTempImage() {
            return tempImage
        },
        
        /* 对原生统一调用方式
           有以下4种事件类型：
            - gotoNative -- 'X'关闭按钮点击后退出H5页面
            - gotoShoppingMall -- 原生跳转到健康商城
            - gotoOuterSiteURL -- 跳转到外部站点
            - gotoDoctorOnline -- 在线问诊
        */
        actionToNative(action, title, url, paramObj) {
            const obj = {
                'action': action,
                'title': title,
                'url': url,
                'params': paramObj
            }
            alert(JSON.stringify(obj))
        },

        // 禁止事件
        forbidEvent(e) {
            e.preventDefault && e.preventDefault()
            e.returnValue = false
            e.stopPropagation && e.stopPropagation()
            return false
        },

        // 禁止滑动事件
        forbidScroll() {
            document.querySelector('html').classList.add('lock')
            window.addEventListener('mousewheel', this.forbidEvent)
            window.addEventListener('touchmove', this.forbidEvent, { passive: false })
        },

        enableScroll() {
            document.querySelector('html').classList.remove('lock')
            window.removeEventListener('mousewheel', this.forbidEvent)
            window.removeEventListener('touchmove', this.forbidEvent, { passive: false })
        },
    }
}

export default globalMixin
