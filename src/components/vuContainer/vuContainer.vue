<template>
  <div class="em-l-container" :style="{ padding: padding }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'vuContainer',
  props: {
    padding: {
      type: String,
      default: '2rem 0'
    }
  }
}
</script>
