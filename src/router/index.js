import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import surveyRouter from './modules/survey'
import healthRecordRouter from './modules/healthRecord'

import healthEvaluateRouter from './modules/healthEvaluate'
import { healthArchivesRouter, healthArchivesRouter2, BasicArchives } from './modules/healthArchives'
import seeReportRouter from './modules/seeReport'
import diseaseDistribution from "./modules/diseaseDistribution"; //疾病地理

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/

import Home from '@/views/home'

export const constantRouterMap = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/authredirect',
  //   component: () => import('@/views/login/authredirect'),
  //   hidden: true
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '全程健康管理', noCache: true }
  },
  {
    path: '/BloodPressureManual',
    component: () => import('@/views/healthRecord/BloodPressureManual'),
    name: 'BloodPressureManual',
    meta: { title: 'BloodPressureManual', noCache: true }
  }, // 手动输入
  {
    path: '/BloodSugarManual',
    component: () => import('@/views/healthRecord/BloodSugarManual'),
    name: 'BloodSugarManual',
    meta: { title: 'BloodSugarManual', noCache: true }
  }, // 血糖手动输入
  {
    path: '/PulseManual',
    component: () => import('@/views/healthRecord/PulseManual'),
    name: 'PulseManual',
    meta: { title: 'PulseManual', noCache: true }
  }, // 心率手动输入
  {
    path: '/StepManual',
    component: () => import('@/views/healthRecord/StepManual'),
    name: 'StepManual',
    meta: { title: 'StepManual', noCache: true }
  }, // 手动步数
  {
    path: '/OxygenManual',
    component: () => import('@/views/healthRecord/OxygenManual'),
    name: 'OxygenManual',
    meta: { title: 'OxygenManual', noCache: true }
  }, // 心率手动血氧
  {
    path: '/VitalCapacityManual',
    component: () => import('@/views/healthRecord/VitalCapacityManual'),
    name: 'VitalCapacityManual',
    meta: { title: 'VitalCapacityManual', noCache: true }
  }, // 心率手动肺活量
  {
    path: '/BloodPressureReport',
    component: () => import('@/views/healthRecord/BloodPressureReport'),
    name: 'BloodPressureReport',
    meta: { title: 'BloodPressureReport', noCache: true }
  }, // 查看报告
  {
    path: '/BloodSugarReport',
    component: () => import('@/views/healthRecord/BloodSugarReport'),
    name: 'BloodSugarReport',
    meta: { title: 'BloodSugarReport', noCache: true }
  }, // 查看血糖报告
  {
    path: '/Suggest',
    component: () => import('@/views/healthSuggest/Suggest'),
    name: 'Suggest',
    meta: { title: 'Suggest', noCache: true }
  }, // 生命周期健康建议
  {
    path: '/CareFamily',
    component: () => import('@/views/healthSuggest/CareFamily'),
    name: 'CareFamily',
    meta: { title: 'CareFamily', noCache: true }
  }, // 关爱家人
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // {
  //   path: '/dailyHealth',
  //   component: HealthEvaluate,
  //   meta: { title: '每日健康' }
  // },
  // {
  //   path: '/lifePeriodHealth',
  //   component: HealthEvaluate,
  //   meta: { title: '生命周期健康' }
  // },
  // {
  //   path: '/selfBodyCheck',
  //   component: HealthEvaluate,
  //   meta: { title: '部位自诊' }
  // },
  // {
  //   path: '/TCMphysique',
  //   component: HealthEvaluate,
  //   meta: { title: '中医体质' }
  // },
  // {
  //   path: '/deseaseGeography',
  //   component: HealthEvaluate,
  //   meta: { title: '疾病地理' }
  // },
  ...diseaseDistribution
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态路由表，在src/permission.js中动态添加，用以控制页面访问权限
export const asyncRouterMap = [
  surveyRouter,
  healthRecordRouter,
  healthEvaluateRouter,
  seeReportRouter,
  healthArchivesRouter2,
  BasicArchives,
  { path: '*', redirect: '/404', hidden: true }
]
