<template>
    <div ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroller",
        data() {
            return {
                scroller: {
                    type:Object,
                    default() {
                        return {}
                    }
                }
            }
        },
        //接收父组件来的值
        props:{
            probeType: {
                type:Number,
                default:0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // 创建 bscroll 对象
            this.scroller = new BScroll(this.$refs.wrapper, {
                click: true,  //组件点击
                probeType:this.probeType,   //实时位置
                pullUpLoad: this.pullUpLoad  // 上拉加载更多
            })

            //实时位置传递
            if (this.probeType === 2 || this.probeType === 3) {
                this.scroller.on ('scroll', (postion) => {
                    //console.log(postion);
                    this.$emit('scroll', postion)
                })
            }

            //监听上啦事件
            if (this.pullUpLoad) {
                this.scroller.on ('pullingUp', () => {
                    this.$emit('pullingUp')
                })
            }    
        },
        methods:{
            // 回到顶部
            scrollTo (x=0, y=0, time=300) {              
                this.scroller && this.scroller.scrollTo(x, y, time)
            },

            //一次加载结束
            finishPullUp () {
                this.scroller.finishPullUp()
            },

            //刷选
            refresh () {
                this.scroller && this.scroller.refresh()
            },

            // 获取当前 Y  值
            getY () {
                return this.scroller ? this.scroller.y : 0
            }
        }
    }
</script>

<style scoped>

</style>
