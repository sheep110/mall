<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
        <scroller class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" >
            <detail-swiper :banner="banner" ref="base"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop :shop="shop"></detail-shop>
            <detail-info :detail-info='detailInfo' @imgLoad="imgLoad"></detail-info>
            <detail-params :goods-params="goodsParams" ref="params"></detail-params>
            <detail-comment :comment-info="commentInfo" ref="comment"></detail-comment>
            <!-- <detail-recom :detail-recom="recommends" ref="recommend"></detail-recom> -->
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroller>
        <backTop @click.native="backClick"  v-show="backShow"/>
        <detail-bottom @addToCart="addToCart" ></detail-bottom>
    </div>
</template>
<script>
import DetailNavBar from './childComp/DetailNavBar'
import DetailSwiper from './childComp/DetailSwiper'
import DetailBaseInfo from './childComp/DetailBaseInfo'
import DetailShop from './childComp/DetailShop'
import DetailInfo from './childComp/DetailInfo'
import DetailParams from './childComp/DetailParams'
import DetailComment from './childComp/DetailComment'
import DetailBottom from './childComp/DetailBottom'
// import DetailRecom from './childComp/DetailRecommend'

import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'

import Scroller from 'components/common/scroller/Scroller'
import BackTop from 'components/content/backTop/BackTop'
import {debounce}  from 'common/utils'
import {itemListenerMixin, backTopMixin} from "common/mixin";
import {BACKTOP_DISTANCE} from "common/const";

import { mapActions } from  'vuex'

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShop,
        DetailInfo,
        DetailParams,
        DetailComment,
        DetailBottom,
        // DetailRecom,
        GoodsList,
        Scroller,
        BackTop,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data () {
        return {
            id: null,
            banner: [],
            goods: {},
            shop: {},
            detailInfo: {},
            goodsParams: {},
            commentInfo: {},
            recommends: [],
            moduleHeigth: [],
            getModuleY: null,
            currentIndex: 0,
            // backShow: false,
        }
    },
    created () {
        this.id = this.$route.query.id
        this.__getDetailData()
        this.__getRecommendData()
        // 防抖  获取模块的高度
        this.getModuleY = debounce( ()=>{
             // 获取各个模块的  高度
            this.moduleHeigth = []
            this.moduleHeigth.push(0)
            this.moduleHeigth.push(this.$refs.params.$el.offsetTop)
            this.moduleHeigth.push(this.$refs.comment.$el.offsetTop)
            this.moduleHeigth.push(this.$refs.recommend.$el.offsetTop)
            this.moduleHeigth.push(Number.MAX_VALUE) //hack 做法 赋最大值
        },100)
    },
    methods: {
        imgLoad () {
            // this.$refs.scroll.refresh()
            this.newRefresh()
            this.getModuleY()
        },
        titleClick (index) {
            let yh = this.moduleHeigth[index]
            this.$refs.scroll.scrollTo(0,-yh,100)
        },
        contentScroll (position) {
            // 获取实时Y值
            const positionY = -position.y
            //实时  对应  标题和对应模块的
            let  current_y = this.moduleHeigth.length -1
            for (let i = 0; i < current_y; i++) {
                if ( this.currentIndex !== i && ( positionY >= this.moduleHeigth[i] && positionY < this.moduleHeigth[i+1] ) ){
                    this.currentIndex = i
                    this.$refs.detailNav.current_index = i
                }

                // if ( this.currentIndex !== i 
                //     &&  (
                //             ( i < current_y -1 && positionY >= this.moduleHeigth[i] && positionY < this.moduleHeigth[i+1] ) 
                //         || (i === current_y -1 && positionY >= this.moduleHeigth[i] )
                //     )
                // ){
                //     this.currentIndex = i
                //     this.$refs.detailNav.current_index = i
                // }
            }
            // this.backShow = positionY > BACKTOP_DISTANCE
            this.listenBackTop(positionY)
        },
        // backClick () {
        //     this.$refs.scroll.scrollTo()
        // },
        ...mapActions(['addCart']),
        addToCart () {
            // 所需信息
            const product = {}
            product.id = this.id
            product.image = this.banner[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            
            // vuex（store） 全局变量存储  commit->mutations , dispatch->actions
            // 使用映射 mapActions
            this.addCart(product).then(res => {
                this.$toast.show(res)
            })
            //正常逻辑
            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res)
            // })
            // this.$router.push({
            //     path: '/cart',
            //     query:  {}
            // })
        },
        // 网络请求数据
        __getDetailData () {
            getDetail(this.id).then( (res, err) => {
                if (err) return
                const data = res.result
                this.banner = data.itemInfo.topImages
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                this.shop = new Shop(data.shopInfo)
                this.detailInfo = data.detailInfo
                this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
                }
                //页面数据渲染完后  （只渲染了 DOM，图片还没有 加载完） ， 执行 nextTick
                this.$nextTick( () => {
                    // 获取各个模块的  高度
                    // this.moduleHeigth = []
                    // this.moduleHeigth.push(0)
                    // this.moduleHeigth.push(this.$refs.params.$el.offsetTop)
                    // this.moduleHeigth.push(this.$refs.comment.$el.offsetTop)
                    // this.moduleHeigth.push(this.$refs.recommend.$el.offsetTop)
                })
            })
        },
        __getRecommendData () {
            getRecommend().then((res, error) => {
                if (error) return
                this.recommends = res.data.list
            })
        }
    },
    mounted () {
        // // 1. 监听item中图片加载完成
        // const refresh = debounce(this.$refs.scroll.refresh,200)
        // this.detailItemListener = () => {
        //     // 刷新 从新计算高度
        //     refresh() 
        // }
        // this.$bus.$on('goodsItemImageLoad', this.detailItemListener)
    },
    updated () {
        // 获取各个模块的  高度
        // this.moduleHeigth = []
        // this.moduleHeigth.push(0)
        // this.moduleHeigth.push(this.$refs.params.$el.offsetTop-44)
        // this.moduleHeigth.push(this.$refs.comment.$el.offsetTop-44)
        // this.moduleHeigth.push(this.$refs.recommend.$el.offsetTop-44)
    },
    destroyed () {
        this.$bus.$off('itemImgListener',this.itemImgListener)
    }

}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    #detail {
        position: relative;
        z-index: 1;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        background-color: #fff;
        z-index: 999;
    }
    .content {
        /* height: calc(100% - 44px -49px); */

        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        right: 0;
        left: 0;
    }
</style>
