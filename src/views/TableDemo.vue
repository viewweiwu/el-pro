<template>
  <Container class="full">
    <HeaderForm :formList="formList" slot="header">
      <el-button type="primary" @click="onSearch">查询</el-button>
    </HeaderForm>
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
import HeaderForm from '~/HeaderForm'
import SelectTable from '~/SelectTable'

export default {
  components: {
    HeaderForm,
    SelectTable
  },
  data() {
    return {
      formList: [{
        title: '关键字',
        type: 'input',
        key: 'keyword'
      }, {
        title: '性别',
        type: 'select',
        key: 'sex',
        options: [{
          value: 0,
          text: '男'
        }, {
          value: 1,
          text: '女'
        }]
      }],
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
          return <el-button size="small">{param.row.address}</el-button>
        }
      }]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    onSearch() {
      this.getData()
    },
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
