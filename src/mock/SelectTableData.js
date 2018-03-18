import Mock from 'mockjs'

Mock.mock('/api/select/table', {
  code: 200,
  data: {
    totalItem: 100,
    pageSize: 10,
    'currentPage|+1': 1,
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'content|10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      name: '@cname',
      'age|1-100': 1,
      'height|1-200': 1,
      'sex|0-1': 1,
      'address': '@county(true)'
    }]
  }
})
