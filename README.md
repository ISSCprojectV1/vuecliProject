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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



技术栈

vue-cli

axios

vue-router 

vuex 

git

版本尽量用新的


代码文件结构




```
.
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.vue
│   ├── api
│   │   ├── part1
│   │   ├── part2
│   │   └── part3
│   │       └── index.js
│   ├── assets
│   │   ├── part1
│   │   ├── part2
│   │   └── part3
│   │       ├── badge1.png
│   │       ├── badge3.png
│   │       ├── down1.png
│   │       ├── logo.png
│   │       ├── seu.png
│   │       └── userprofile.jpg
│   ├── components
│   │   ├── part1
│   │   ├── part2
│   │   └── part3
│   │       ├── Common
│   │       │   ├── header.vue
│   │       │   ├── mainDownload.vue
│   │       │   ├── mainFavs.vue
│   │       │   ├── mainScore.vue
│   │       │   ├── mainUpload.vue
│   │       │   ├── mainUpload2.vue
│   │       │   └── profileBar.vue
│   │       ├── Console
│   │       │   ├── editorial.vue
│   │       │   ├── mainHome.vue
│   │       │   ├── mainuploadDetail.vue
│   │       │   ├── mainuploadResource.vue
│   │       │   └── sidebar.vue
│   │       ├── Download
│   │       │   ├── comment.vue
│   │       │   ├── detailBar.vue
│   │       │   ├── filterBar.vue
│   │       │   ├── header.vue
│   │       │   ├── profileBar.vue
│   │       │   └── searchBar.vue
│   │       └── User
│   │           ├── download.vue
│   │           ├── footer.vue
│   │           ├── group.vue
│   │           ├── index.vue
│   │           ├── score.vue
│   │           └── sidebar.vue
│   ├── main.js
│   ├── router
│   │   ├── index.js
│   │   ├── part1
│   │   │   └── index.js
│   │   ├── part2
│   │   │   └── index.js
│   │   └── part3
│   │       └── index.js
│   ├── store
│   │   └── index.js
│   ├── utils
│   │   ├── part1
│   │   ├── part2
│   │   ├── part3
│   │   │   ├── cookie.js
│   │   │   └── index.js
│   │   └── request.js
│   └── views
│       ├── part1
│       ├── part2
│       └── part3
│           ├── Home.vue
│           ├── Login.vue
│           ├── NOTFOUND.vue
│           ├── Registry.vue
│           └── incentiveMechanism
│               ├── Console
│               │   ├── home.vue
│               │   └── uploadResources.vue
│               ├── Download
│               │   ├── home.vue
│               │   ├── myDownload.vue
│               │   └── resourceDetail.vue
│               ├── User
│               │   └── userinfo.vue
│               ├── module_1
│               │   ├── view_1_1.vue
│               │   └── view_1_1_detail.vue
│               ├── module_2
│               │   └── view_2_1.vue
│               └── module_3
│                   ├── slot-test-peer.vue
│                   ├── slot-test.vue
│                   └── test.vue
└── vue.config.js
```
设计思路主要是将代码每个组成成分
划分为三个part
对应三个前端学生
part1：张琪琪
part2：叶杨展
part3：李凌潇


主要的文件夹说明：

api:主要用来设计axios请求来获得后端接口数据
api:结构如下（代码编写可以参考part3里我已经整合的代码）
```
│   ├── api
│   │   ├── part1
│   │   ├── part2
│   │   └── part3
│   │       └── index.js
```

assets:主要用于放一些静态资源 图片等
assets:结构如下
```
│   ├── assets
│   │   ├── part1
│   │   ├── part2
│   │   └── part3
│   │       ├── badge1.png
│   │       ├── badge3.png
│   │       ├── down1.png
│   │       ├── logo.png
│   │       ├── seu.png
│   │       └── userprofile.jpg
```
components:主要用于组件开发
components:结构如下(代码编写可以参考part3里我已经整合的代码)
```
│   ├── components
│   │   ├── part1
│   │   ├── part2
│   │   └── part3
│   │       ├── Common
│   │       │   ├── header.vue
│   │       │   ├── mainDownload.vue
│   │       │   ├── mainFavs.vue
│   │       │   ├── mainScore.vue
│   │       │   ├── mainUpload.vue
│   │       │   ├── mainUpload2.vue
│   │       │   └── profileBar.vue
│   │       ├── Console
│   │       │   ├── editorial.vue
│   │       │   ├── mainHome.vue
│   │       │   ├── mainuploadDetail.vue
│   │       │   ├── mainuploadResource.vue
│   │       │   └── sidebar.vue
│   │       ├── Download
│   │       │   ├── comment.vue
│   │       │   ├── detailBar.vue
│   │       │   ├── filterBar.vue
│   │       │   ├── header.vue
│   │       │   ├── profileBar.vue
│   │       │   └── searchBar.vue
│   │       └── User
│   │           ├── download.vue
│   │           ├── footer.vue
│   │           ├── group.vue
│   │           ├── index.vue
│   │           ├── score.vue
│   │           └── sidebar.vue
```

router：主要编写路由代码
router:结构如下有一个主路由和三个分路由(代码编写可以参考part3里我已经整合的代码)
注意点:分路由不需要配置直接写路径即可 具体可参考我的part3

```
│   ├── router
│   │   ├── index.js//主路由
│   │   ├── part1
│   │   │   └── index.js
│   │   ├── part2
│   │   │   └── index.js
│   │   └── part3
│   │       └── index.js
```

store:主要是利用vuex对一些全局状态进行管理
store:结构如下
注意点:尽量少使用或不使用，因为可能会影响到其他part正常运行
```
│   ├── store
│   │   └── index.js
```

utils:主要是编写一些工具方法
utils:结构如下
```
│   ├── utils
│   │   ├── part1
│   │   ├── part2
│   │   ├── part3
│   │   │   ├── cookie.js
│   │   │   └── index.js
│   │   └── request.js
```
views:主要是编写页面代码
views:结构如下(可以参考part3里我已经整合的代码)
```
│   └── views
│       ├── part1
│       ├── part2
│       └── part3
│           ├── Home.vue
│           ├── Login.vue
│           ├── NOTFOUND.vue
│           ├── Registry.vue
│           └── incentiveMechanism
│               ├── Console
│               │   ├── home.vue
│               │   └── uploadResources.vue
│               ├── Download
│               │   ├── home.vue
│               │   ├── myDownload.vue
│               │   └── resourceDetail.vue
│               ├── User
│               │   └── userinfo.vue
│               ├── module_1
│               │   ├── view_1_1.vue
│               │   └── view_1_1_detail.vue
│               ├── module_2
│               │   └── view_2_1.vue
│               └── module_3
│                   ├── slot-test-peer.vue
│                   ├── slot-test.vue
│                   └── test.vue
```

vue.config.js
是vue-cli脚手架封装好用于配置webpack相关属性的 可以自行添加

