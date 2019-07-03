/** When your routing table is too long, you can split it into small modules**/
import seeReport from '@/views/healthRecord/ReportIndex'

const seeReportRouter =
  {
    path: '/seeReport',
    name: 'seeReport',
    component: seeReport,
    redirect: '/healthRecord/BloodPressure',
    children: [
      {
        path: 'BloodPressure',
        component: () => import('@/views/healthRecord/BloodPressure'),
        name: 'BloodPressure',
        meta: { title: 'BloodPressure', noCache: true }
      },
      {
        path: 'BloodSugar',
        component: () => import('@/views/healthRecord/BloodSugar'),
        name: 'BloodSugar',
        meta: { title: 'BloodSugar', noCache: true }
      },
      {
        path: 'Pulse',
        component: () => import('@/views/healthRecord/Pulse'),
        name: 'Pulse',
        meta: { title: 'Pulse', noCache: true }
      },
      {
        path: 'Step',
        component: () => import('@/views/healthRecord/Step'),
        name: 'Step',
        meta: { title: 'Step', noCache: true }
      },
      {
        path: 'Oxygen',
        component: () => import('@/views/healthRecord/Oxygen'),
        name: 'Oxygen',
        meta: { title: 'Oxygen', noCache: true }
      },
      {
        path: 'VitalCapacity',
        component: () => import('@/views/healthRecord/VitalCapacity'),
        name: 'VitalCapacity',
        meta: { title: 'VitalCapacity', noCache: true }
      }
    ]

  }
export default seeReportRouter

