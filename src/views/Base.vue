<template>
  <el-container class="base">
    <el-aside class="base-aside" width="200px">
      <div class="base-logo">EL-PRO</div>
      <div class="base-menu">
        <div
          class="base-menu-item"
          v-for="parent in BaseMenuConfig"
          :key="parent.id"
          @click="(e) => onMenuClick(e, parent)">
          <span>
            {{parent.title}}
          </span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BaseMenuConfig from './BaseMenuConfig'

export default {
  data() {
    return {
      BaseMenuConfig
    }
  },
  methods: {
    onMenuSelect(index) {
      switch (index) {
        case '1':
          this.$router.push('/table')
          break
      }
    },
    onMenuClick(e, parent) {
      this.addWave(e)
      this.$router.push({
        name: parent.link
      })
    },
    addWave(e) {
      let target = e.target
      let style = getComputedStyle(target)
      let width = parseInt(style.width) + parseInt(style.paddingLeft) + parseInt(style.paddingRight)
      let height = parseInt(style.height) + parseInt(style.paddingTop) + parseInt(style.paddingBottom)
      let size = width > height ? width : height
      let $el = document.createElement('div')
      $el.classList.add('wave')
      $el.style.width = 0
      $el.style.height = size + 'px'
      $el.style.opacity = 0.3
      $el.addEventListener('transitionend', () => {
        if ($el && $el.parentNode) {
          $el.parentNode.removeChild($el)
        }
      })
      target.appendChild($el)
      this.$nextTick(() => {
        $el.style.width = size + 'px'
        $el.style.height = size + 'px'
        $el.style.opacity = 0
      })
    }
  }
}
</script>
