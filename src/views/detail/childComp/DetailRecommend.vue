<template>
    <div crecommend-info>
        <div class="info-header">热门推荐</div>
        <grid-view>
            <goods-list-item v-for="(item, index) in detailRecom" :key="index" :goods-item="item"></goods-list-item>
        </grid-view>
    </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
    name: "DetailRecommend",
    props: {
        detailRecom: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        GridView,
        GoodsListItem
    }
}
</script>

<style>
    .recommend-info {
        padding: 5px;
    }

    .info-header {
        line-height: 40px;
        padding-left: 8px;
        font-size: 15px;
        color: #333;
    }
</style>