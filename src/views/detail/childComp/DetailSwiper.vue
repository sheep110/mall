<template>
    <swiper class="detail_swiper">
        <swiper-item v-for="(item) in banner" :key="item" >
            <img :src="item" alt="" >
        </swiper-item>
    </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper';

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        banner: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .detail_swiper {
        height: 300px;
        overflow: hidden;
    }
</style>
