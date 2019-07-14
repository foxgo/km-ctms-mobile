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
                            this.$goto({
                                name: "foodInput"
                            });
                        }
                    }
                ];
            },
            //上传
            upload(path) {
                let self = this;
                let img = new Image();

                img.onload = function () {
                    let width = this.width;
                    let height = this.height;
                    //let scale = width / height;

                    /*width = 480 || width;
                     height = width / scale;*/

                    //生成canvas
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(this, 0, 0, width, height);

                    let base64 = canvas.toDataURL("image/jpeg", 1);

                    self.$ajax({
                        type: "post",
                        apiType: self.apiType,
                        request: {
                            name: "getCalorieFromPicForHealth"
                        },
                        data: {
                            imageFile: btoa(base64)//	--所传图片转换的base64格式
                        }
                    }).then((res) => {
                        self.$root.setTempImage(base64);

                        self.$goto({
                            name: "foodInput"
                        });
                    });
                };

                img.src = path;
            },
            //拍照
            cameraChange() {
                let inputCameraFile = this.$refs.inputCamera;

                if(inputCameraFile.files[0]) {
                    let url = URL.createObjectURL(inputCameraFile.files[0]);

                    this.upload(url);
                }

                this.emitComplete();
            },
            //选择
            multipleChange() {
                let inputMultiple = this.$refs.inputMultiple;

                if(inputMultiple.files) {
                    for(let file of inputMultiple.files) {
                        let url = URL.createObjectURL(file);

                        this.upload(url);
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
