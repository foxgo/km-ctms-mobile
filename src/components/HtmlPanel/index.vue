<template>
    <div>
        <div v-html="html"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    // props:{
    //     url: {
    //         required: true
    //     }
    // },
    data() {
        return {
            html: '',
            loading: false
        }
    },
    // watch: {
    //     url(val) {
    //         this.load(val)
    //     }
    // },
    mounted() {
        if (this.$route.query.url) {
            this.load(this.$route.query.url)
        }
    },
    methods: {
        load(url) {
            console.log(url)
            if(url && url.length > 0) {
                // 加载中
                this.$root.showLoading()
                let param = {
                    accept: '*/*',
                }
                axios.get(url).then((response) => {
                    this.$root.hideLoading()
                    // 处理HTML显示
                    this.html = response.data
                }).catch(error => {
                    this.html = '加载失败'
                    this.$root.hideLoading()
                })
            }
        }
    }
}
</script>