import Layout from '@/layout'
export default {
  path: '/vm', // 路径
  name: 'vm', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '设备管理',
    icon: 'el-icon-data-analysis'
  },
  children: [{
    name: 'index',
    path: '/vm/index',
    component: () => import('@/views/vm/index'),
    meta: {
      title: '设备管理'
    }
  },
  {
    name: 'status',
    path: '/vm/status',
    component: () => import('@/views/vm/status'),
    meta: {
      title: '设备状态'
    }
  },
  {
    name: 'type',
    path: '/vm/type',
    component: () => import('@/views/vm/type'),
    meta: {
      title: '设备类型管理'
    }
  }
  ]
}

