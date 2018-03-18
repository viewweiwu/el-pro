<script>
export default {
  props: {
    formList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: this.initForm()
    }
  },
  render(h) {
    return <div>
      <el-form inline={true}>
        {this.renderFormList(h)}
      </el-form>
    </div>
  },
  methods: {
    initForm() {
      let form = {}
      let map = {
        'input': '',
        'select': null
      }
      this.formList.forEach(item => {
        let defaultValue = ''
        defaultValue = item.defaultValue !== undefined ? item.defaultValue : map[item.key]
        form[item.key] = defaultValue
      })
      return form
    },
    // 渲染 formList
    renderFormList(h) {
      return this.formList.map(item => {
        let content
        switch (item.type) {
          case 'input':
            content = this.renderInput(h, item)
            break
          case 'select':
            content = this.renderSelect(h, item)
            break
        }
        return <el-form-item>
          { this.renderTitle(h, item) }
          <div class="el-form-item__content">
            {content}
          </div>
        </el-form-item>
      })
    },
    // 渲染 title
    renderTitle(h, item) {
      return <label class="el-form-item__label">
        {
          item.required === true
            ? <span class="font-red middle">*</span>
            : ''
        }
        {
          typeof item.renderTitle === 'function'
            ? <span slot={'label'}>{item.renderTitle(h, item, this.getFormBykey(item.key))}</span>
            : <span slot={'label'}>{item.title}</span>
        }
      </label>
    },
    // 渲染 input
    renderInput(h, item) {
      return <el-input
        onInput={this.onInput(item)}
        v-model={this.form[item.key]}
        placeholder={item.placeholder}>
      </el-input>
    },
    // 渲染 select
    renderSelect(h, item) {
      return <el-select
        v-model={this.form[item.key]}
        onInput={this.onInput(item)}
        clearable={item.clearable === false ? item.clearable : true}>
        {item.options.map(option => {
          return <el-option key={option.value} label={option.text} value={option.value}>
            {
              typeof item.renderOption === 'function'
                ? item.renderOption(h, option, item)
                : item.text
            }
          </el-option>
        })}
      </el-select>
    },
    // 清空 form 表单
    reset() {
      this.initForm()
    },
    // 根据 key 获取 value
    getFormBykey(key) {
      return this.form[key]
    },
    // 发布 input 事件
    onInput(item) {
      this.$emit('input', this.form[item.key], item.key, item)
    }
  }
}
</script>
