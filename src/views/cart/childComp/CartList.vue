<template>
    <div class="cart-list">
        <scroller class="content" ref="scroll">
            <cart-item v-for="(item, index) in lists" :key="index" :product="item"></cart-item>
        </scroller>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import Scroller from 'components/common/scroller/Scroller'
import CartItem from './CartItem'

export default {
    name: 'CartList',
    components: {
        Scroller,
        CartItem
    },
    computed: {
        ...mapGetters({
            lists: 'cartList'
        })
    },
    activated () {
        this.$refs.scroll.refresh()
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .cart-list {
        height: calc(100% - 44px - 40px - 49px);
    }

    .content {
        overflow: hidden;
        height: 100%;
    }
</style>
