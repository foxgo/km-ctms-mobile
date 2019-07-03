/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const surveyRouter =
{
  path: '/survey',
  name: 'Layout',
  component: Layout,
  redirect: '/survey/person',
  children: [
    {
      path: '/',
      component: () => import('@/views/survey/index'),
      redirect: 'survey/person',
      children: [
        {
          path: 'person',
          component: () => import('@/views/survey/person'),
          name: 'person',
          meta: { title: 'person', icon: 'person', noCache: true }
        },
        {
          path: 'health',
          component: () => import('@/views/survey/health'),
          name: 'health',
          meta: { title: 'health', icon: 'health', noCache: true }
        },
        {
          path: 'diet',
          component: () => import('@/views/survey/diet'),
          name: 'diet',
          meta: { title: 'diet', icon: 'diet', noCache: true }
        },
        {
          path: 'sport',
          component: () => import('@/views/survey/sport'),
          name: 'sport',
          meta: { title: 'sport', icon: 'sport', noCache: true }
        },
        {
          path: 'smoke',
          component: () => import('@/views/survey/smoke'),
          name: 'smoke',
          meta: { title: 'smoke', icon: 'smoke', noCache: true }
        }
      ]
    }
  ]
}

export default surveyRouter
