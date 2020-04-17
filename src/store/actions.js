import {ADD_CART, ADD_COUNTER}  from './mutations-type'

export default {
    addCart (context, payload) {
        return new Promise((resolve, reject) => {
            // 查找 是否已有该商品
            let product = context.state.cartList.find(item => item.id === payload.id)
            if (product) {
                context.commit(ADD_COUNTER, product)
                resolve('当前商品数量加一')
            } else {
                payload.count = 1
                context.commit(ADD_CART, payload)
                resolve('添加商品成功')
            }
        })
    }
}