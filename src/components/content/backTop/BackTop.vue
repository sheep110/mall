<template>
    <div class="back-top" >
        <img src="~assets/images/common/top.png" alt="" srcset="">
    </div>
</template>
<script>
export default {
    name: 'BackTop', 
}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    .back-top {
        position: fixed;
        right: 6px;
        bottom: 53px;
    }
    .back-top img {
        width: 43px;
        height: 43px;
    }
</style>
