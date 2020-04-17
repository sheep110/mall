<template>
    <div id="HomeSwiper">
        <swiper>
            <swiper-item v-for= "v in banner" :key="v.id">
                <a :href="v.link">
                    <img :src="v.image" alt="" @load="swiperImageItem">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name: 'HomeSwiper',
    props: {
        banner: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            isLoad: false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        swiperImageItem () {
            if (!this.isLoad) {
                this.$emit('swiperImageItem')
                this.isLoad = true
            }
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>

</style>
