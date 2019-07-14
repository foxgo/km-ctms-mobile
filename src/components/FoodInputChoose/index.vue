<template>
    <div class="clearfix">
        <div class="hidden">
            <input ref="inputCamera" class="inputPhoto" type="file" accept="image/*" capture="camera" @change="cameraChange" />

            <input ref="inputMultiple" class="inputPhoto" type="file" accept="image/*" @change="multipleChange" />
        </div>

        <mt-actionsheet :actions="actions" v-model="visible"></mt-actionsheet>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                apiType: 1,
                actions: []
            };
        },
        model: {
            prop: "show",
            event: "change"
        },
        computed: {
            visible: {
                get() {
                    return this.show;
                },
                set(val) {
                    this.$emit("change", val);
                }
            }
        },
        props: {
            show: false,
            date: {
                type: String,
                default: ""
            }
        },
        watch: {
            show(val) {
                if(val) {
                    this.clear();
                }
            }
        },
        components: {},
        mounted() {
            this.init();
        },
        methods: {
            //初始化
            init() {
                this.actions = [
                    {
                        name: "拍摄",
                        method: () => {
                            this.$refs.inputCamera.click();
                        }
                    },
                    {
                        name: "从相册选择",
                        method: () => {
                            this.$refs.inputMultiple.click();
                        }
                    },
                    {
                        name: "手动录入食物",
                        method: () => {
                            this.goFoodInput();
                        }
                    }
                ];
            },
            //跳转到食物录入
            goFoodInput(file) {
                if(file) {
                    this.$root.setTempImage(file);
                }

                this.$goto({
                    name: "foodInput"
                });
            },
            //拍照
            cameraChange() {
                let inputCameraFile = this.$refs.inputCamera;

                if(inputCameraFile.files[0]) {
                    let file = inputCameraFile.files[0];

                    this.goFoodInput(file);
                }

                this.emitComplete();
            },
            //选择
            multipleChange() {
                let inputMultiple = this.$refs.inputMultiple;

                if(inputMultiple.files) {
                    for(let file of inputMultiple.files) {
                        this.goFoodInput(file);
                    }

                    this.emitComplete();
                }
            },
            //完成
            emitComplete() {
                this.$emit("complete");

                this.close();
            },
            //关闭
            close() {
                this.$emit("change", false);
            },
            //清空
            clear() {
                if(this.$refs.inputMultiple) {
                    this.$refs.inputMultiple.value = "";
                }

                if(this.$refs.inputCamera) {
                    this.$refs.inputCamera.value = "";
                }
            }
        }
    }
</script>

<style scoped></style>
