import Layout from '@/layout'
export default {
  path: '/policy', // 路径
  name: 'policy', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '策略管理',
    icon: 'el-icon-s-opportunity'
  },
  children: [{
    name: 'policy',
    path: '/policy/index',
    component: () => import('@/views/policy/index'),
    meta: {
      title: '策略管理'
    }
  }
  ]
}
