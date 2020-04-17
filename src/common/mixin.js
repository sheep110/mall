// 混入
import {POP, NEW, SELL, BACKTOP_DISTANCE} from "./const";

// 置顶效果
export const backTopMixin = {
  data: function () {
    return {
      // showBackTop: false
      backShow: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo();
    },
    listenBackTop (y) {
      this.backShow = y > BACKTOP_DISTANCE
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      // console.log(this.currentType);
    }
  }
}

// 自己写的 
import {debounce} from './utils'
// 监听 详情页 的 图片加载
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      newRefresh: null,
    }
  },
  mounted () {
    // 1. 监听item中图片加载完成   debounce 防抖
    // let refresh = debounce(this.$refs.scroll.refresh,200)
    this.newRefresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
        // 刷新 从新计算高度
        // refresh()
        this.newRefresh()
    }
    this.$bus.$on('itemImgListener', this.itemImgListener)
  }
}