/*
健康档案页面有两套方案，现在使用的是第二套 `@/views/healthArchives/index2.vue`
但是新增成员时🈶需要用到填写基础信息页面。

所以根据实际情况声明了2套路由：
`healthArchivesRouter`、`healthArchivesRouter2`
现在用的：
`healthArchivesRouter`
*/

const healthArchivesRouter =
  {
    path: '/healthArchives',
    component: { template: '<keep-alive> <router-view /> </keep-alive>' },
    children: [
      {
        path: '',
        name: 'HealthArchives',
        component: () => import('@/views/healthArchives'),
        meta: { title: '健康档案' }
      },
      /*
        需要传 pagetype 参数，用于区分新增成员和问卷调查
        新增成员： addMember
        问卷调查： 可以不用传
        查看档案： edit
      */
      {
        path: 'basicArchives',
        name: 'BasicArchives',
        component: () => import('@/views/healthArchives/modules/basicArchives'),
        meta: { title: '基础档案' }
      },
      {
        path: 'addMember',
        name: 'AddMember',
        component: () => import('@/views/healthArchives/modules/basicArchives/addMember'),
        meta: { title: '新增成员' }
      },
      {
        path: 'lifeHabits',
        component: { template: '<router-view />' },
        children: [
          {
            path: '',
            name: 'lifeHabits',
            component: () => import('@/views/healthArchives/modules/lifeHabits'),
            meta: { title: '生活习惯', noCache: true }
          },
          {
            path: 'eatingHabits',
            name: 'eatingHabits',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/eatingHabits'),
            meta: { title: '饮食习惯', noCache: true }
          },
          {
            path: 'labor',
            name: 'labor',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/labor'),
            meta: { title: '体力活动与运动', noCache: true }
          },
          {
            path: 'Drinking&Smoking',
            name: 'Drinking&Smoking',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/Drinking&Smoking'),
            meta: { title: '吸烟饮酒', noCache: true }
          }
        ]
      },
      {
        path: 'healthHistory',
        component: () => import('@/views/healthArchives/modules/healthHistory'),
        meta: { title: '健康史', noCache: true }
      }
    ]
  }

import HealthArchives from '@/views/healthArchives/index2'

const healthArchivesRouter2 = {
  path: '/healthArchives2',
  name: '健康问卷',
  component: HealthArchives,
  children: [
    {
      path: 'basicArchives',
      name: 'BasicArchives2',
      component: () => import('@/views/healthArchives/modules/basicArchives'),
      meta: { title: '基础信息', noCache: true }
    },
    {
      path: 'eatingHabits',
      name: 'EatingHabits2',
      component: () => import('@/views/healthArchives/modules/lifeHabits/modules/eatingHabits'),
      meta: { title: '饮食', noCache: true }
    },
    {
      path: 'labor',
      name: 'Labor2',
      component: () => import('@/views/healthArchives/modules/lifeHabits/modules/labor'),
      meta: { title: '运动', noCache: true }
    },
    {
      path: 'drinking&Smoking',
      name: 'Drinking&Smoking2',
      component: () => import('@/views/healthArchives/modules/lifeHabits/modules/Drinking&Smoking'),
      meta: { title: '吸烟饮酒', noCache: true }
    },
    {
      path: 'healthHistory',
      name: 'HealthHistory2',
      component: () => import('@/views/healthArchives/modules/healthHistory'),
      meta: { title: '健康史', noCache: true }
    }
  ]
}

export { healthArchivesRouter, healthArchivesRouter2 }
