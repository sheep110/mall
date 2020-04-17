<template>
    <div id="HomeRec" class="homeRec">
        <div v-for="v in recommend" :key="v.id" class="homeRec-item">
            <a :href="v.link">
                <img :src="v.image" alt="" srcset="">
                <div>{{v.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomeRec',
    props: {
        recommend: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .homeRec {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom: 10px solid #eee;
    }
    .homeRec-item {
        flex: 1;
    }
    .homeRec-item img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
</style>
