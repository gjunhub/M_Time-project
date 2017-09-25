# Movie---Vue
vue,vuex,vue-router,vux,vue-scroller,better-scroll,Axios,Muse UI等，移动端APP，API接口数据来自时光网，网易云音乐等
# 说明

> 本项目是基于时光网提供的电影和图片等api编写的移动端的app。 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^ 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目 如有问题请直接在 Issues 中提;

# 克隆到本地

```
https://github.com/gjunhub/M_Time-project.git
```

# 进入文件夹
```
cd Movie---Vue
```

# 安装依赖
```
npm install
或者
yarn install
```
# 运行，自动打开服务器
```
npm run dev  --本地服务器localhost:8080
```
# 发布环境
```
npm run build（开发环境不需要执行）
```

# 技术栈
```
vue,vuex,vue-router,vue-jsonp,fetch,axios,muse-ui,webpack,vue-scroller,vux,Es6的解构赋值,扩展运算符,箭头函数
```


# 实现项目功能一览

### 跨域请求数据 => 已设置后端代理
- [x] axios
- [x] fetch

### 注册登录
- [x] 利用local Storage实现本地注册登录功能

### 用户手动切换城市
- [x] 在首页点击默认地区(北京)路由跳转到选择城市页面

### 搜索影片
- [x] 首页点击搜索按钮，跳转到搜索页，输入影片关键字可获取对应影片详情
- [x] 热门搜索 -点击热门推荐的影片名也可获取该影片信息
- [x] 影片详情 -点击搜索后的影片，可跳转到影片详情+影片评论

### 首页正在上映 & 即将上映影片 =>懒加载影片图片
- [x] 正在上映的影片/即将上映 -横向滑屏查看更多

### 上拉加载&下拉刷新
- [x] 影片详情+影片评论 -上拉加载更多评论数据
- [x] 发现页面新闻 -上拉加载更多新闻，下拉刷新数据

### 影片收藏
- [x] 影片详情页 -点击收藏按钮a)未登录 =>则提示登录并跳转到登录页。b)已登录 => 则弹出收藏成功
- [x] 在个人页面的我的收藏一栏中 显示用户登录后收藏的影片信息
- [x] 影片详情页 -点击购票 =>功能与逻辑和收藏功能一致

## 项目详情
> 1. 多个页面布局，vue-router跳转

> 2. 搭建好页面并分配好各个组件和跑通整个流程，

> 3. 开始编写入口文件和路由还有store仓库

> 4. 电影的首页,列表页,详情页的组件和功能，如下
     - loading的显示和隐藏用的vuex
     - vuex 的store 下，存储各组件共享数据，并管理和维护共享数据的更新，修改；分布式管理和统一导出，方便管理和维护
     - routers 放置配置好的路由
     - filters 放置过滤器(管道副)
     - components 放的是整个项目用到的自定义组件和项目组件
     - assets 是静态资源管理文件
     - 多页面上拉加载更多
     - 下拉刷新

> 5. 搜索/search实现了用户搜索功能

> 6. 购票的首页和列表页和详情页的逻辑和一些组件的封装

> 7. 用户登录与注册功能
       - 登录:/login
       - 注册:/register
> 8. 模拟收藏和购票功能 - 利用vuex来处理多页面共享同一状态
> 9. 首页，以及预告片/花絮页面，实现上拉加载更多
> 10. 接口获取方式采用fetch，axios,解决跨域问题

## 一些注意事项

项目中使用了时光网的接口，存在跨域请求的问题，在开发环境下需要在`config/index.js`中的`dev`下添加以下配置即可解决
```
 proxyTable: {
        '/api': {
            target: 'http://api-m.mtime.cn',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
            }
        },
        '/cpi': {
            target: 'http://m.mtime.cn',
            changeOrigin: true,
            pathRewrite: {
                '^/cpi': '/'
            }
        },
        '/mic': {
            target: 'http://localhost:3000',
            pathRewrite: {
                '^/mic': '/'
            }
        }
    }
```

实际环境中，请求数据时编写以下代码
```
 fetch('/api/Showtime/HotCitiesByCinema.api').then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data.p,'城市');
                    commit('updateLocationCitys',data.p);
                })
```

`vuex`状态管理位于`src/components/store`目录下

`vue-router`路由配置管理位于`src/components/router`目录下

自定义过滤器位于`src/components/filters/`目录下

时光网接口来源于[https://github.com/jokermonn/-Api/blob/master/Time.md](https://github.com/jokermonn/-Api/blob/master/Time.md)