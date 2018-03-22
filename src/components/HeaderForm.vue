<script>
import { getOriginData } from '@/util'
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
    return <el-form class="header-form" inline={true}>
      {this.$slots.prepend}
      {this.renderFormList(h)}
      {this.$slots.default}
    </el-form>
  },
  methods: {
    initForm() {
      let form = {}
      let map = {
        'input': '',
        'select': null,
        'checkbox': [],
        'checkbox-single': false,
        'date': new Date(),
        'radio': '',
        'switch': false
      }
      this.formList.forEach(item => {
        let defaultValue = ''
        defaultValue = item.defaultValue !== undefined ? item.defaultValue : map[item.type]
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
          case 'checkbox':
            content = this.renderCheckbox(h, item)
            break
          case 'checkbox-single':
            content = this.renderCheckboxSingle(h, item)
            break
          case 'date':
            content = this.renderDatePicker(h, item)
            break
          case 'radio':
            content = this.renderRadio(h, item)
            break
          case 'switch':
            content = this.renderSwitch(h, item)
            break
          default :
            content = item.renderContent(h, item, this.form)
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
      let tag = {
        tagName: 'el-input',
        h,
        item,
        props: {
          placeholder: item.placeholder
        }
      }
      return this.generateTag(tag)
    },
    // 渲染 select
    renderSelect(h, item) {
      let tag = {
        tagName: 'el-select',
        h,
        item,
        props: {
          clearable: item.clearable === false ? item.clearable : true
        },
        children: item.options.map(option => {
          return <el-option key={option.value} label={option.text} value={option.value}>
            {
              typeof item.renderOption === 'function'
                ? item.renderOption(h, option, item)
                : item.text
            }
          </el-option>
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 checkbox
    renderCheckbox(h, item) {
      let tag = {
        tagName: 'el-checkbox-group',
        h,
        item,
        children: item.options.map(option => {
          return <el-checkbox label={option.value}>{option.text}
          </el-checkbox>
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 单个 checkbox
    renderCheckboxSingle(h, item) {
      let tag = {
        tagName: 'el-checkbox',
        h,
        item,
        children: item.text
      }
      return this.generateTag(tag)
    },
    // 渲染 datepicker
    renderDatePicker(h, item) {
      let tag = {
        tagName: 'el-date-picker',
        h,
        item,
        props: {
          type: 'date',
          placeholder: item.placeholder || '请选择日期'
        }
      }
      return this.generateTag(tag)
    },
    // 渲染单选框
    renderRadio(h, item) {
      let tag = {
        tagName: 'span',
        h,
        item,
        children: item.options.map(option => {
          return <el-radio v-model={this.form[item.key]} label={option.value}>{option.text}
          </el-radio>
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 switch
    renderSwitch(h, item) {
      let tag = {
        tagName: 'el-switch',
        h,
        item
      }
      return this.generateTag(tag)
    },
    /*
    * 生成标签
    * tagName 标签名
    * h
    * item
    * props 配置参数
    */
    generateTag({tagName, h, item, props = {}, children}) {
      return h(tagName, {
        props: {
          value: this.form[item.key],
          ...props
        },
        on: {
          input: (value) => {
            this.form[item.key] = value
            this.onInput(item)
          }
        }
      }, children)
    },
    // 发布 input 事件
    onInput(item) {
      this.$emit('input', this.form[item.key], item.key, item)
    },
    // 清空 form 表单
    reset() {
      this.initForm()
    },
    // 根据 key 获取 value
    getFormBykey(key) {
      return this.form[key]
    },
    getForm() {
      return getOriginData(this.form)
    }
  }
}
</script>
