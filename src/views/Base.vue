<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    onMenuSelect(index) {
      switch (index) {
        case '1':
          this.$router.push('/table')
          break
      }
    }
  }
}
</script>
