<template>
  <div class="base-container-page">
    <div class="page-header" v-show="hasHeader">
      <slot name="header"></slot>
    </div>
    <div class="page-body" :class="{'mt': !hasTop}">
      <div class="page-body-top" v-show="hasTop">
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="right" v-show="hasRight">
          <slot name="right"></slot>
        </div>
      </div>
      <slot></slot>
    </div>
    <div class="page-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  data() {
    return {
      hasHeader: !!this.$slots.header,
      hasRight: !!this.$slots.right,
      hasTop: !!this.$slots.right || !!this.$slots.left
    }
  }
}
</script>
