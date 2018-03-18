<template>
  <div class="ps">
    <el-table
      border
      @selection-change="onSelectionChange"
      :data="tableData">
      <el-table-column
        align="center"
        type="selection">
      </el-table-column>
      <el-table-column
        v-for="column in columns"
        ref="c"
        :key="column.id"
        :type="column.type"
        :prop="column.key"
        :width="column | width"
        :label="column.title">
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr mt"
      background
      layout="prev, pager, next"
      @current-change="changeCurrentPage"
      :total="totalItem"
      :page-size="pageSize"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SelectTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: ''
    },
    dataFilter: {
      type: Function
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      pageSize: 20,
      totalItem: 0,
      currentPage: 1,
      selection: []
    }
  },
  filters: {
    width(column) {
      if (column.type) return 35
      else if (column.width) return column.width
      else return ''
    }
  },
  mounted() {
    this.initRender()
  },
  methods: {
    initRender() {
      this.columns.forEach((cell, i) => {
        if (typeof cell.render === 'function') {
<<<<<<< HEAD
          this.$refs.c[i].columnConfig.renderCell = (h, param) => {
            return h('div', {
              class: 'cell'
            }, [
              cell.render(h, param)
            ])
          }
=======
          this.$refs.c[i].columnConfig.renderCell = (h, param) => cell.render(h, param)
>>>>>>> 3af4bd9264230b099756bcc1d45cf8cac5e5a6af
        }
      })
    },
    onSelectionChange(val) {
      this.selection = val
    },
    changeCurrentPage(num) {
      this.currentPage = num
      if (this.hasHeaderForm) {
        this.$emit('page')
      } else {
        this.getData()
      }
    },
    getSelection() {
      return this.selection
    },
    getData(form) {
      if (!this.url || this.loading) return
      let param = {
        ...form
      }
      if (this.hasPager) {
        param.pageSize = this.pageSize
        param.currentPage = this.currentPage
      }

      this.loading = true
      this.$ajaxGet(this.url, param).then(data => {
        // 取到所有过滤器
        let columnsFilter = this.columns.filter(item => typeof item.filter === 'function')
        // 是否拥有自定义数据
        if (this.dataFilter) {
          data.content = this.dataFilter(data.content)
        } else {
          data.content = data.content || []
        }
        // 循环过滤
        data.content = data.content.map(item => {
          let extra = {}
          // 遍历返回数据源的 key
          Object.keys(item).forEach(k => {
            let target = columnsFilter.find(cf => cf.key === k)
            if (target) {
              // 存一个备份
              extra['_' + k] = item[k]
              item[k] = target.filter.call(this, item[k])
            }
          })
          return {
            ...extra,
            ...item
          }
        })
        // 避免 mock 抽风
        // this.currentPage = data.currentPage
        this.totalItem = data.totalItem
        this.pageSize = data.pageSize
        this.tableData = data.content
        this.loading = false
      }).catch(() => this.loading = false)
    }
  }
}
</script>
