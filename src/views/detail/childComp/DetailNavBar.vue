<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/images/common/back.svg" alt="">
            </div>
            <div slot="center" class="titles">
                <div v-for="(item, index) in titles" :key="item.id" 
                    class="titles_item" :class="{active: index === current_index}"
                    @click="titleClick(index)"
                >
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            titles: ['商品','详情','评论','推荐'],
            current_index: 0,
        }
    },
    methods: {
        titleClick (index) {
            this.current_index = index
            this.$emit('titleClick',index)
        },
        backClick () {
            this.$router.back()
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .titles {
        display: flex;
        font-size: 13px;
    }
    .titles_item {
        flex: 1; 
    }
    .active {
        color: var(--color-high-text);
        font-weight:bold;
    }
    .back {
        margin-top: 5px;
    }
</style>
