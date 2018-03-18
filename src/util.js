import axios from 'axios'
import qs from 'qs'

const $ajax = axios.create({
  baseURL: '/api',
  timeout: 10000
})

$ajax.interceptors.response.use(function(response) {
  let data = response.data
  if (data.code === 200) {
    if (!data.data) data.data = {}
    return data.data
  } else {
    if (data.message) {
      notify('error', '请求失败', data.message)
    } else {
      notify('error', '请求失败', '未知错误')
    }
    return Promise.reject({code: data.code, data: data.data})
  }
}, function(error) {
  notify('error', '请求失败', error.request.status)
  return Promise.reject(error)
})

const ajaxPost = (api, data = null) => $ajax.post(api, qs.stringify(data))
const ajaxGet = (api, data = null) => $ajax.get(api)
const jsonPost = (api, data = null) => $ajax.post(api, data)

const notify = (type, title, message, primary) => {
  let m = primary ? `<span class="font-red">${primary}</span> ${message}。` : `${message}。`
  window.app.$notify({
    title,
    message: m,
    type,
    dangerouslyUseHTMLString: true
  })
}

const formatCurrency = (num, hasSymbol) => {
  if (!num) num = 0
  num = num.toFixed(2)
  // 若小数位为 00 取整
  if (num * 100 % 100 === 0) num = ~~num
  return ((hasSymbol ? '￥' : '') + num)
}

const formatDate = (value, hasTime) => {
  if (!value) return ''
  if (typeof value === 'string') {
    value = value.replace(/-/g, '/')
  }
  value = new Date(value)
  let result = ''
  let year = value.getFullYear()
  let month = value.getMonth() + 1
  let day = value.getDate()

  month = plusZero(month)
  day = plusZero(day)

  result = year + '-' + month + '-' + day

  if (hasTime) {
    let hour = value.getHours()
    let minute = value.getMinutes()
    hour = plusZero(hour)
    minute = plusZero(minute)
    result += ' ' + hour + ':' + minute
  }

  return result
}

const plusZero = (value) => {
  return value < 10 ? '0' + value : value
}

const getOriginData = (data) => {
  return JSON.parse(JSON.stringify(data))
}

const getRandom = (min = 0, max = 1) => {
  return Math.round(Math.random() * (max - min) + min)
}

const _import = file => () => import('@/views/' + file + '.vue')

const getCurrMonthDate = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(1)
  return [start, end]
}

const dateConfig = {
  shortcuts: [{
    text: '本月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setDate(1)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

export {
  $ajax,
  ajaxGet,
  ajaxPost,
  jsonPost,
  notify,
  formatCurrency,
  formatDate,
  getOriginData,
  getRandom,
  _import,
  getCurrMonthDate,
  dateConfig
}
