import Layout from '@/layout'
export default {
  path: '/order', // 路径
  name: 'order', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '订单管理',
    icon: 'el-icon-s-order'
  },
  children: [{
    name: 'order',
    path: '/order/index',
    component: () => import('@/views/order/index'),
    meta: {
      title: '订单管理'
    }
  }

  ]
}
