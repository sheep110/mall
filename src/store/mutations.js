import {ADD_CART, ADD_COUNTER}  from './mutations-type'

export default {
    // mutations  唯一目的是 修改 state 中的状态
    // mutations 中的 每一个方法 尽可能的完成的事件比较单一一点
    [ADD_COUNTER] (state, payload) {
        payload.count++
    },
    [ADD_CART] (state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}