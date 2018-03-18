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
        }
      ]
    }
  }
}
</script>
