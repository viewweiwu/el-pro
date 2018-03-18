<template>
<<<<<<< HEAD
  <el-container class="base">
    <el-aside class="base-aside" width="200px">
      <div class="base-logo"></div>
      <div class="base-menu">
        <div
          class="base-menu-item"
          v-for="parent in BaseMenuConfig"
          :key="parent.id"
          @click="onMenuClick(parent)">
          <span>
            {{parent.title}}
          </span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header></el-header>
=======
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
>>>>>>> 3af4bd9264230b099756bcc1d45cf8cac5e5a6af
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
<<<<<<< HEAD
import BaseMenuConfig from './BaseMenuConfig'

export default {
  data() {
    return {
      BaseMenuConfig
    }
  },
=======
export default {
>>>>>>> 3af4bd9264230b099756bcc1d45cf8cac5e5a6af
  methods: {
    onMenuSelect(index) {
      switch (index) {
        case '1':
          this.$router.push('/table')
          break
      }
<<<<<<< HEAD
    },
    onMenuClick(parent) {
      this.$router.push({
        name: parent.link
      })
=======
>>>>>>> 3af4bd9264230b099756bcc1d45cf8cac5e5a6af
    }
  }
}
</script>
