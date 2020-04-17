<template>
    <div>
        <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">
            <img src="~/assets/images/cart/tick.svg" alt="">
        </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
        props: {
            value: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                checked: this.value
            }
        },
        methods: {
            selectItem: function () {
                this.$emit('checkBtnClick')
            }
        },
        watch: {
            value: function (newValue) {
                this.checked = newValue;
            }
        }
	}
</script>

<style scoped>
    .icon-selector {
        position: relative;
        margin: 0;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #ccc;
        cursor: pointer;
    }

    .selector-active {
        /* ff8198 */
        background-color: red; 
        border-color: red;
    }
</style>
