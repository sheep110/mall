<template>
    <div class="tab-control">
        <div v-for="(v, index) in titles" :key="v.id" :class="{active:index == currentIndex}"   @click="tabClick(index)" class="tab-control-item">
            <span>{{v}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        tabClick (index) {
            this.currentIndex = index
            this.$emit('tabClick',index)
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }

    .tab-control-item {
        flex: 1;
    }

    .tab-control-item span {
        padding: 5px;
    }

    .active {
        color: var(--color-high-text);    
    }
    .active span {
        border-bottom: 3px solid var(--color-tint);
    }
</style>
