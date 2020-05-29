/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/views/home.vue'
import Dashboard from '@/views/workbench/dashboard.vue'

import NotFound from '@/components/404.vue'

import transaction from '@/views/part1/transactionProject/transaction.vue'
import echarts from '@/views/part1/transactionProject/echarts'
import processQuery from '@/views/part1/transactionProject/processQuery'

import riskPredictionProject from '@/views/part1/riskPredictionProject/riskPredictionProject'
import riskPrediction from '@/views/part1/riskPredictionProject/riskPrediction'

import ConsoleManage from '@/views/part3/incentiveMechanism/Console/Console.vue'
import consoleHome from '@/components/part3/Console/mainHome'
import uploadResources from '@/views/part3/incentiveMechanism/Console/uploadResources'
import uploadDetail from '@/views/part3/incentiveMechanism/Console/uploadDetail'
import scoreDetail from '@/views/part3/incentiveMechanism/Console/scoreDetail'
import downloadDetail from '@/views/part3/incentiveMechanism/Console/downloadDetail'
import honorDetail from '@/views/part3/incentiveMechanism/Console/honorDetail'

// 下载中心
import downloadHome from '@/views/part3/incentiveMechanism/Download/home'
import resource from '@/views/part3/incentiveMechanism/Myresource/resource'
import myResource from '@/views/part3/incentiveMechanism/Myresource/myResource'
import mainDownload from "@/components/part3/Common/mainDownload";
import mainFavs from "@/components/part3/Common/mainFavs";
import mainScore from "@/components/part3/Common/mainScore";
import mainUpload from "@/components/part3/Common/mainUpload";

// 个人资料
import index from "@/components/part3/User/index"
import group from "@/components/part3/User/group"

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/dashboard',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: '首页',
          components: {
            default: Dashboard,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/transactionProject',
          components: {
            default: transaction,
            top: TopNav,
            aside: LeftNav
          },
          name: '网络图',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/transactionProject/echarts', component: echarts, name: '网络图', menuShow: true },
            { path: '/transactionProject/processQuery', component: processQuery, name: '搜索功能', menuShow: true }
          ]
        },
        {
          path: '/riskPredictionProject',
          components: {
            default: riskPredictionProject,
            top: TopNav,
            aside: LeftNav
          },
          name: '风险预测',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/riskPredictionProject/riskPrediction', component: riskPrediction, name: '风险预测图', menuShow: true }
          ]
        }
      ]
    },
    // 激励机制 
    // 上传中心
    {
      path: '/incentiveMechanism',
      type: 'incentive',
      name: 'incentive',
      component: Home,
      redirect: '/incentiveMechanism/home',
      menuShow: true,
      children: [
        {
          path: '/incentiveMechanism/home',
          name: '主页',
          components: {
            default: consoleHome,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: true
        },
        {
          path: '/incentiveMechanism/Console',
          components: {
            default: ConsoleManage,
            top: TopNav,
            aside: LeftNav
          },
          name: '下载管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/incentiveMechanism/uploadResources', component: uploadResources, name: '上传资源', menuShow: true },
            { path: '/incentiveMechanism/uploadDetail', component: uploadDetail, name: '上传明细', menuShow: true },
            { path: '/incentiveMechanism/scoreDetail', component: scoreDetail, name: '积分明细', menuShow: true },
            { path: '/incentiveMechanism/downloadDetail', component: downloadDetail, name: '下载明细', menuShow: true },
            { path: '/incentiveMechanism/honorDetail', component: honorDetail, name: '荣誉明细', menuShow: true }
          ]
        },
      ]
      
    },
    // 统计中心 
    {
      path: '/statisticalCenter',
      type: 'statistical',
      name: 'statistical',
      component: Home,
      redirect: '/statisticalCenter/home',
      menuShow: true,
      children: [
        {
          path: '/statisticalCenter/home',
          name: '主页',
          components: {
            default: consoleHome,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: true
        },
      ]
    },
        // 下载数据
        {
          path: '/download',
          type: 'download',
          name: 'download',
          component: Home,
          redirect: '/download/home',
          menuShow: true,
          children: [
            {
              path: '/download/home',
              name: '下载主页',
              components: {
                default: downloadHome,
                top: TopNav,
                aside: LeftNav
              },
              leaf: true,
              iconCls: 'el-icon-setting',
              menuShow: true
            },
            {
              path: '/incentiveMechanism/myResource',
              components: {
                default: resource,
                top: TopNav,
                aside: LeftNav
              },
              name: '我的资源',
              iconCls: 'el-icon-menu',
              menuShow: true,
              children: [
                { path: '/incentiveMechanism/myResource', component: myResource, name: '我的资源', menuShow: true },
                { path: '/incentiveMechanism/mainUpload', component: mainUpload, name: '上传资源', menuShow: true },
                { path: '/incentiveMechanism/mainDownload', component: mainDownload, name: '下载明细', menuShow: true },
                { path: '/incentiveMechanism/mainScore', component: mainScore, name: '积分明细', menuShow: true },
                { path: '/incentiveMechanism/mainFavs', component: mainFavs, name: '我的收藏', menuShow: true },
               
              ]
            },
            
          ]
        },
    // 个人资料
    {
      path: '/personal',
      type: 'personal',
      name: 'personal',
      component: Home,
      redirect: '/personal/index',
      menuShow: true,
      children: [
        {
          path: '/personal/index',
          name: '个人资料',
          components: {
            default: index,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: true
        },
        {
          path: '/personal/group',
          name: '我的群组',
          components: {
            default: group,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: true
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router
