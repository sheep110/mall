import Toast from './Toast.vue';

const obj = {}

// 执行安装
obj.install = function (Vue) {
    // 1. 创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    // 2.  new 的方式， 根据组件构造器 可以创建一个 组件对象
    const toast = new toastContrustor()
    // 3. 将 组件对象 手动挂载到 某一 元素上
    toast.$mount(document.createElement('div'))
    // 4. toast.$el  对应的 就是 div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj