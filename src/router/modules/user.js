import Layout from '@/layout'
export default {
  path: '/user', // 路径
  name: 'user', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '人员管理',
    icon: 'el-icon-s-custom'
  },
  children: [{
    name: 'index',
    path: '/user/index',
    component: () => import('@/views/user/index'),
    meta: {
      title: '人员列表'
    }
  },
  {
    name: 'user-task-stats',
    path: '/user/user-task-stats',
    component: () => import('@/views/user/user-task-stats'),
    meta: {
      title: '人效统计'
    }
  },
  {
    name: 'user-work',
    path: '/user/user-work',
    component: () => import('@/views/user/user-work'),
    meta: {
      title: '工作量列表'
    }
  }
  ]
}

