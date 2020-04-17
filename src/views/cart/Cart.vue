<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">{{title}}({{cartLength}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-buttom></cart-buttom>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComp/CartList'
import CartButtom from './childComp/CartButtom'

import {mapGetters} from 'vuex'

export default {
    name: 'Cart',
    data () {
        return {
            title: '购物车',
        }
    },
    components: {
        NavBar,
        CartList,
        CartButtom
    },
    computed: {
        // 两种展示方法
        ...mapGetters([
            'cartLength',
        ]),
        //
        ...mapGetters({
            lengths: 'cartLength',
        })
    }

}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .cart {
        position: relative;
        height: 100vh;
        background-color: #fff;
    }
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
</style>
