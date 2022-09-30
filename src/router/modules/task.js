import Layout from '@/layout'
export default {
  path: '/task', // 路径
  name: 'task', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '工单管理',
    icon: 'el-icon-s-management'
  },
  children: [{
    name: 'business',
    path: '/task/business',
    component: () => import('@/views/task/business'),
    meta: {
      title: '运营工单'
    }
  },
  {
    name: 'operation',
    path: '/task/operation',
    component: () => import('@/views/task/operation'),
    meta: {
      title: '运维工单'
    }
  }
  ]
}
