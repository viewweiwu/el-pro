<template>
  <Container>
    <HeaderForm
      ref="headerForm"
      :formList="formList">
      <el-button type="danger" @click="getFormData">获取 headerForm 值</el-button>
    </HeaderForm>
  </Container>
</template>

<script>
import HeaderForm from '~/HeaderForm'
export default {
  components: {
    HeaderForm
  },
  data() {
    return {
      formList: [
        {
          title: '姓名',
          key: 'name',
          type: 'input',
          required: true,
          placeholder: '请输入姓名'
        },
        {
          key: 'flower',
          defaultValue: '❀',
          renderTitle: (h, item) => {
            return <span class="font-red">接下来我要渲染好多花</span>
          },
          renderContent: (h, item, form) => {
            let colorList = ['red', 'blue', 'orange', 'purple', 'green']
            setTimeout(() => {
              if (form.flower.length < colorList.length) {
                form.flower += '❀'
              }
            }, 500)
            return <span class={'max-big font-' + colorList[form.flower.length - 1]}>{form.flower}</span>
          }
        },
        {
          title: 'select',
          key: 'select',
          type: 'select',
          defaultValue: 1,
          clearable: true,
          renderTitle: (h, item, value) => {
            let target = item.options.find(option => option.value === value)
            return <span>
              {
                target
                  ? <i class={'el-icon-star-on font-' + target.color}></i>
                  : <i class="el-icon-star-off"></i>
              }
            </span>
          },
          renderOption: (h, option) => <div>
            <i class={'el-icon-star-on mr font-' + option.color}></i>
            {option.text}
          </div>,
          options: [
            {
              value: 1,
              text: '米饭',
              color: 'purple'
            },
            {
              value: 2,
              text: '苹果',
              color: 'orange'
            }
          ]
        },
        {
          title: '性别',
          type: 'checkbox',
          key: 'sex',
          options: [
            {
              value: 0,
              text: '男',
              color: 'purple'
            },
            {
              value: 1,
              text: '女',
              color: 'orange'
            }
          ]
        },
        {
          title: '年龄',
          type: 'checkbox',
          key: 'age',
          options: [
            {
              value: 17,
              text: '17',
              color: 'purple'
            },
            {
              value: 18,
              text: '18',
              color: 'orange'
            }
          ]
        },
        {
          title: '',
          type: 'checkbox-single',
          key: 'marry',
          text: '是否已婚'
        },
        {
          title: '生日',
          type: 'date',
          key: 'birthday',
          placeholder: '请选择生日日期'
        },
        {
          title: '是否毕业',
          type: 'radio',
          key: 'college',
          options: [
            {
              value: 1,
              text: '是'
            },
            {
              value: 0,
              text: '否'
            }
          ],
          defaultValue: 1
        },
        {
          title: '是否工作',
          type: 'switch',
          key: 'job',
          defaultValue: true
        }
      ]
    }
  },
  methods: {
    getFormData() {
      console.log(this.$refs.headerForm.getForm())
    }
  }
}
</script>
