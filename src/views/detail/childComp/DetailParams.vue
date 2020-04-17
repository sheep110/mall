<template>
    <div v-if="Object.keys(goodsParams).length !== 0" class="params-info">
        <table  v-for="(item, index) in goodsParams.sizes" :key="index"  class="info-size">
            <tr v-for="(tr, index) in item" :key="index">
                <td v-for="(td, index) in tr" :key="index">{{td}}</td>
            </tr>
        </table>
        <table class="info-params">
            <tr v-for="(item, index) in goodsParams.infos" :key="index">
                <td class="info-params-key">{{item.key}}</td>
                <td class="info-params-value">{{item.value}}</td>
            </tr>
        </table>
        <div  v-if="goodsParams.image.length !== 0 " class="info-img">
            <img :src="goodsParams.image" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailParams',
    props: {
        goodsParams: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style>
    .params-info {
        padding: 20px 15px;
        font-size: 14px;
        border-bottom: 5px solid #f2f5f8;
    }

    .params-info table {
        width: 100%;
        border-collapse: collapse;
    }

    .params-info table tr {
        height: 42px;
    }

    .params-info table tr td {
        border-bottom: 1px solid rgba(100, 100, 100, .1);
    }

    .info-params {
        border-top: 1px solid rgba(0, 0, 0, .1);
    }

    .info-params-key {
        width: 95px;
    }

    .info-params-value {
        color: #eb4868;
    }

    .info-img img {
        width: 100%;
    }

</style>