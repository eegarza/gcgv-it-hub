<template>
  <!--
Badge component
https://unity.exxonmobil.com/components/sections/section.html
-->

  <span
    class="em-c-badge "
    :class=" `em-c-badge--${type}`"
    :style="{ background: bg, color: color }"
  >
    <vu-icon
    v-if="icon"
      size="small"
      :icon="icon"
      :color="color"
      :style="{ marginRight : checkText }"
    ></vu-icon>
    <slot></slot>
  </span>

  <!-- end em-c-section -->
</template>

<script>
import vuIcon from '../vuIcon/vuIcon'
export default {
  name: 'vuBadge',
  components: {
    vuIcon
  },
  props: {
    icon: {
      default: null,
      type: String
    },
    color: {
      default: null,
      type: String
    },
    bg: {
      default: null,
      type: String
    },
    type: {
      default: null,
      type: String
    }
  },
  computed: {
    // if text is present, add some space between icon and text
    checkText () {
      if (this.$slots.default) {
      return '0.5em'
      }
      return 0
    }
  }

}
</script>
<style scoped>
.em-c-badge {
  display: inline-flex;
  align-items: center;
}
</style>
