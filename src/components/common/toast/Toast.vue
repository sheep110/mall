<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>
<script>
export default {
    name: 'Toast',
    // props: {
    //     message: {
    //         type: String,
    //         default () {
    //             return ''
    //         }
    //     },
    //     isShow: {
    //         type: Boolean,
    //         default () {
    //             return false
    //         }
    //     }
    // },
    data () {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        // message  展示内容  ;   duration  消失时间
        show (message = '', duration = 3000) {
            this.isShow = true
            this.message = message
            setTimeout(() => {
                this.isShow = false
                this.message = ''
            }, duration)
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 8px 10px;
        border-radius: 5%;
        z-index: 999;

        color: #fff;
        background-color: rgba(0, 0, 0, .8)
    }
</style>
