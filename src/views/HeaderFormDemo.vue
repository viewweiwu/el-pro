<template>
  <Container>
    <HeaderForm
      ref="headerForm"
      :formList="formList">
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
  }
}
</script>
