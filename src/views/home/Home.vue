<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">{{title}}</div></nav-bar>
        <tab-control :titles="titles"  @tabClick="tabClick" ref="tabControlDemo" class="tab-control" v-show="isTabShow"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore" >
            <home-swiper :banner="banner" @swiperImageItem="swiperImageItem"></home-swiper>
            <home-recommend :recommend="recommend"></home-recommend>
            <home-feature ></home-feature>
            <tab-control :titles="titles"  @tabClick="tabClick" ref="tabControl"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>

        <backTop @click.native="backClick"  v-show="backShow"/>
    </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import  GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroller/Scroller';
import BackTop from 'components/content/backTop/BackTop';

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce}  from 'common/utils'
import {BACKTOP_DISTANCE}  from 'common/const'
import {itemListenerMixin, backTopMixin} from "common/mixin";

export default {
    name: 'Home',
    data () {
        return {
            title: '购物街',
            banner: [],
            recommend: [],
            titles: ['流行','新款','精选'],
            goods: {
                'pop':  {page: 0, list: []},
                'new':  {page: 0, list: []},
                'sell':  {page: 0, list: []}
            },
            currentType: 'pop',
            // backShow: false,
            tabOffsetTop: 0,
            isTabShow: false,
            saveY: 0,
        }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
        HomeSwiper,
        HomeRecommend,
        HomeFeature,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    created () {
        // 1. 请求多个数据
        this.getHomeMultidata()
        // 2. 请求商品信息
        this.getHomeGoods('pop') 
        this.getHomeGoods('new') 
        this.getHomeGoods('sell') 
    },
    mounted () {
        // // 1. 监听item中图片加载完成
        // const refresh = debounce(this.$refs.scroll.refresh,200)
        // // 监听事件的保存
        // this.homeItemListener = () => {
        //     // 刷新 从新计算高度
        //     refresh() 
        // }
        // this.$bus.$on('goodsItemImageLoad', this.homeItemListener)         
    },
    activated () {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        // this.$refs.scroll.refresh();
        this.newRefresh()
    },
    deactivated () {
        // 保存Y值
        this.saveY = this.$refs.scroll.getY()

        // 取消全局事件监听
        this.$bus.$off('itemImgListener',this.itemImgListener)
    },
    methods: {
        /*
        *   事件监听方法
        */
        tabClick (index) {
            switch (index) {
                case 0: 
                    this.getHomeGoods('pop');
                    this.currentType = 'pop';
                    break;
                case 1: 
                    this.getHomeGoods('new');
                    this.currentType = 'new';
                    break;
                case 2: 
                    this.getHomeGoods('sell');
                    this.currentType = 'sell';
                    break;
                default: break;
            }
            this.$refs.tabControl.currentIndex= index;
            this.$refs.tabControlDemo.currentIndex = index;
        },

        // backClick () {
        //     this.$refs.scroll.scrollTo()
        // },

        // 监听 滚动 高度
        contentScroll (position) {
            //  判断 backTop 是否显示
            // this.backShow = (-position.y)> BACKTOP_DISTANCE
            this.listenBackTop(-position.y)

            //  判断 tabControl 是否 吸顶
            this.isTabShow =  (-position.y) >= this.tabOffsetTop
        },

        loadMore () { 
            this.getHomeGoods(this.currentType)
        },

        swiperImageItem () {
            // 赋值  组件的$el
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop 
        },

        /*
        *网络请求
        */
        getHomeMultidata () {
            getHomeMultidata().then(res => {
                this.banner = res.data.banner.list
                this.recommend = res.data.recommend.list
            })
        },
        getHomeGoods (type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {               
                this.goods[type].page = page
                this.goods[type].list.push(...res.data.list)
                this.$refs.scroll.finishPullUp()  // 刷新 上 0拉 属性
                this.$refs.scroll.refresh()
            })
        }
    },
    computed : {
        showGoods () {
            return this.goods[this.currentType].list
        }

    }

}
</script>
<!--  @import url();引入css类  -->
<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;

        position: relative;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /* 原生的滑动时置顶效果 */
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 999; */
    }
    .content {
        /* height: calc(100% - 93px); */
        /* margin-top: 50px; */

        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        right: 0;
        left: 0;
    }

    .tab-control{
        position: relative;
        z-index: 999;
    }
</style>
