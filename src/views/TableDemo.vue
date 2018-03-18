<template>
  <Container class="full">
    <el-button @click="update" size="small" slot="right">修改</el-button>
    <SelectTable
      ref="selectTable"
      url="/select/table"
      :columns="columns">
    </SelectTable>
  </Container>
</template>

<script>
import '@/mock/SelectTableData'
import SelectTable from '~/SelectTable'

export default {
  components: {
    SelectTable
  },
  data() {
    return {
      columns: [{
        title: '姓名',
        key: 'name'
      }, {
        title: '年龄',
        key: 'age'
      }, {
        title: '身高',
        key: 'height',
        filter: (value) => value + 'cm'
      }, {
        title: '性别',
        key: 'sex',
        filter: (value) => value === 0 ? '女' : '男'
      }, {
        title: '地址',
        key: 'address',
        width: 400,
        render: (h, param) => {
          return h('el-button', param.row.address)
        }
      }]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$refs['selectTable'].getData()
    },
    update() {
      let data = this.$refs['selectTable'].getSelection().map(item => item.name).join(', ')
      if (data.length) {
        this.$info('你选择了: ' + data)
      } else {
        this.$info('请选择一个人')
      }
    }
  }
}
</script>
