import HealthEvaluate from '@/views/healthEvaluate'

const healthEvaluateRouter =
  {
    path: '/healthEvaluate',
    name: '健康评估',
    component: HealthEvaluate,
    // redirect: '/healthEvaluate/eattingSuggest',
    /*children: [
      {
        path: 'eattingSuggest',
        component: () => import('@/views/healthEvaluate/components/EattingSuggest'),
        name: 'EattingSuggest',
        props: true,
        meta: { noCache: true }
      },
      {
        path: 'sportSuggest',
        component: () => import('@/views/healthEvaluate/components/SportSuggest'),
        name: 'SportSuggest',
        props: true,
        meta: { noCache: true }
      },
      {
        path: 'mentalSuggest',
        component: () => import('@/views/healthEvaluate/components/MentalSuggest'),
        name: 'MentalSuggest',
        props: true,
        meta: { noCache: true }
      },
      {
        path: 'societySuggest',
        component: () => import('@/views/healthEvaluate/components/SocietySuggest'),
        name: 'SocietySuggest',
        props: true,
        meta: { noCache: true }
      }
    ]*/

  }

export default healthEvaluateRouter
