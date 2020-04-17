# mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# git 
# 本地链接远程
1. git remote add origin https://github.com/sheep110/mall.git
# psuh
2. git push -u origin master

# 划分目录结构  src
1. src
    1. assets
    2. components  公共组件
        1. common  完全（可分享）组件
        2. content  本项目公共组件
    3. views    视图
    4. router   路由
    5. store    状态 （个人信息等）
    6. network   网络请求
    7. common   公共 js  (const.js 常量、 utils.js 工具)


# css  文件 统一属性
1. normalize.css   
2. base.css

# 配置全局文件变量 和 代码编写规范
1. vue.config.js
2. .editorconfig

#  项目的 模块划分：  tabbar   router 路由映射

# npm install better-scroll --save


# 直接输入
1. ul>li{$}*4；

# 如果想输入两位数的话
1. ul>li{$$}*5 在按下Tab键位即可

# bset-scroll

# vh -> viewh 

# 事件总线 
1. // 创建事件总线 $bus
    Vue.prototype.$bus =  new Vue()   
2. this.$bus.$emit('事件名称',参数)  发送
3. this.bus.$on('事件名称',回调函数[参数])   接受（监听）

# 防抖函数 
1. debounce   （防抖）
2. throttle (节流)

# 监听函数
1. @load = ""

# 改变函数
1. @change

#  tabControl 的吸顶效果
1.  滚动多高，出现吸顶效果   offsetTop