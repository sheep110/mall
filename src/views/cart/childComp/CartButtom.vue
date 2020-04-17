<template>
    <div class="bottom-bar">
        <div class="check-button">
            <check-button class="check-button-item" :value="isSelectedAll" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="total-price">
            合计：￥{{totalPrice}}
        </div>
        <div class="number" @click="clickPay">
            结算({{checkLength}})
        </div>
    </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
    name: 'CartButtom',
    components: {
        CheckButton
    },
    methods: {
        checkClick () {
            
            // 全选逻辑 
            if (this.isSelectedAll) {
                // 全选中 =》 全不选中
                this.cartList.forEach(item => item.checked = false)
            } else {
                //  未全选中 =》 全选中
                this.cartList.forEach(item => item.checked = true)
            }
        },
        clickPay () {
            if (!this.isSelectedAll) {
                this.$toast.show('请选择购买商品')
            }
        }
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice () {
            return this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return  preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength () {
            return this.cartList.filter(item => item.checked).length
        },
        isSelectedAll () {
            if (this.cartList.length === 0) return false
            // filter 循环
            // return !(this.cartList.filter( item => !item.checked).length)  

            // find 找到一个 即可
            return !this.cartList.find(item => !item.checked)
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;
        
        height: 40px;
        line-height: 40px;
        font-size: 14px;

        background-color: #eee;
    }
    .check-button {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 80px;
    }
    .check-button-item {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .total-price {
        margin-left: 20px;
        flex: 1;
    }
    .number {
        border-radius: 10%;
        width: 80px;
        background: rgb(255, 123, 0);
        color: #fff;
        text-align: center;
    }
</style>
