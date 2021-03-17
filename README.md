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

#开发日志：

###2020.6.25 llx
* 添加登录逻辑 
<br> 1 安装包js-cookie
<br> 2 创建@/utils/auth.js 实现存取cookie的方法
<br> 3 创建@/permission.js 实现前端拦截器功能
<br> 4 增加进度条效果 安装包nprogress 并添加效果逻辑到拦截器逻辑中
<br> 5 在store中加入user模块 处理用户相关状态


###2020.6.26 llx
* 因为后台需要前端以application / x-www-form-urlencoded格式发送数据，根据axios官网说明
在浏览器中，可以使用URLSearchParams API，如下所示：
```javascript
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```
请注意，所有浏览器都不支持URLSearchParams（请参阅caniuse.com），但可以使用polyfill（确保填充全局环境）。

或者，可以使用qs库编码数据：
```javascript
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```
或者以另一种方式（ES6），
```javascript
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```
* 加入动态路由相关代码
* 登录界面加入用户角色选项
* 删除修改冗余代码

###2020.6.27 llx

* 加入管理员对动态路由的增删查改 等待后端联调

 
 
