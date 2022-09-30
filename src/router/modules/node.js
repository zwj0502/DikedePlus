import Layout from '@/layout'
export default {
  path: '/node', // 路径
  name: 'node', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '点位管理',
    icon: 'el-icon-map-location'
  },
  children: [{
    name: 'region',
    path: '/node/region',
    component: () => import('@/views/node/region'),
    meta: {
      title: '区域管理'
    }
  },
  {
    name: 'node',
    path: '/node/node',
    component: () => import('@/views/node/node'),
    meta: {
      title: '点位管理'
    }
  },
  {
    name: 'partner',
    path: '/node/partner',
    component: () => import('@/views/node/partner'),
    meta: {
      title: '合作商管理'
    }
  }
  ]
}
