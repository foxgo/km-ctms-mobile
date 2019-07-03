
const healthArchivesRouter =
  {
    path: '/healthArchives',
    component: { template: '<router-view />' },
    children: [
      {
        path: '',
        component: () => import('@/views/healthArchives'),
        meta: { title: '健康档案', noCache: true },
      },
      {
        path: 'basicArchives',
        name: 'BasicArchives',
        component: () => import('@/views/healthArchives/modules/basicArchives'),
        meta: { title: '基础档案', noCache: true },
      },
      {
        path: 'lifeHabits',
        component: { template: '<router-view />' },
        children: [
          {
            path: '',
            name: 'lifeHabits',
            component: () => import('@/views/healthArchives/modules/lifeHabits'),
            meta: { title: '生活习惯', noCache: true },
          },
          {
            path: 'eatingHabits',
            name: 'eatingHabits',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/eatingHabits'),
            meta: { title: '饮食习惯', noCache: true },
          },
          {
            path: 'labor',
            name: 'labor',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/labor'),
            meta: { title: '体力活动与运动', noCache: true },
          },
          {
            path: 'Drinking&Smoking',
            name: 'Drinking&Smoking',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/Drinking&Smoking'),
            meta: { title: '吸烟饮酒', noCache: true },
          }
        ]
      },
      {
        path: 'healthHistory',
        component: () => import('@/views/healthArchives/modules/healthHistory'),
        meta: { title: '健康史', noCache: true },
      }
    
    ]
  }

import HealthArchives from '@/views/healthArchives/index2'

const healthArchivesRouter2 = {
        path: '/healthArchives',
        name: "健康问卷",
        component: HealthArchives,
        children: [
          {
            path: 'basicArchives',
            name: 'BasicArchives',
            component: () => import('@/views/healthArchives/modules/basicArchives'),
            meta: { title: '基础信息', noCache: true },
          },
          {
            path: 'eatingHabits',
            name: 'EatingHabits',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/eatingHabits'),
            meta: { title: '饮食', noCache: true },
          },
          {
            path: 'labor',
            name: 'Labor',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/labor'),
            meta: { title: '运动', noCache: true },
          },
          {
            path: 'drinking&Smoking',
            name: 'Drinking&Smoking',
            component: () => import('@/views/healthArchives/modules/lifeHabits/modules/Drinking&Smoking'),
            meta: { title: '吸烟饮酒', noCache: true },
          },
          {
            path: 'healthHistory',
            name: 'HealthHistory',
            component: () => import('@/views/healthArchives/modules/healthHistory'),
            meta: { title: '健康史', noCache: true },
          }
        ]
      }

export { healthArchivesRouter,healthArchivesRouter2 }
