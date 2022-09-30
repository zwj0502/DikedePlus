import Layout from '@/layout'
export default {
  path: '/sku', // 路径
  name: 'sku', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '商品管理',
    icon: 'el-icon-s-shop'
  },
  children: [{
    name: 'sku-class',
    path: '/sku/sku-class',
    component: () => import('@/views/sku/sku-class'),
    meta: {
      title: '商品类型'
    }
  },
  {
    name: 'sku',
    path: '/sku/sku',
    component: () => import('@/views/sku/sku'),
    meta: {
      title: '商品状态'
    }
  }

  ]
}

