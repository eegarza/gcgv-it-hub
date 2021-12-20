<template>
  <!--
Tooltip Component
https://unity.exxonmobil.com/components/messaging/tooltip.html
-->
  <transition name="tooltip-fade">
    <span
      class="em-c-tooltip em-js-tooltip"
      :class="[ `em-c-tooltip--${position}`, `em-c-tooltip--${theme}`] "
    >
      <span class="em-c-tooltip__trigger em-js-tooltip-trigger">
        <div class="em-c-text-passage">
          <a href='#'>
            <slot></slot>
          </a>
        </div>
      </span>
      <span
        class="em-c-tooltip__content"
        :style="cssProps"
      >
        <slot name="content"></slot>
      </span>
    </span>
    <!-- end em-c-tooltip -->
  </transition>
</template>
<script>
export default {
  name: 'vuTooltip',
  props: {
    position: {
      default: '',
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
    theme: {
      default: null,
      type: String
    }
  },
  computed: {
    cssProps () {
      return {
        '--bg': this.theme ? 'initial' : this.bg,
        'color': this.color,
        'backgroundColor': this.bg
      }
    }
  }
}
</script>
<style>
.em-c-tooltip--below .em-c-tooltip__content:after {
  top: -6px;
  border-top: 0;
  border-bottom: 6px solid var(--bg);
}
</style>
<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.tooltip-fade-enter,
.tooltip-fade-leave-to {
  opacity: 0;
}
.tooltip-fade-enter.vs-tooltip-top,
.tooltip-fade-leave-to.vs-tooltip-top {
  transform: translate(0, -10px);
}
.tooltip-fade-enter.vs-tooltip-bottom,
.tooltip-fade-leave-to.vs-tooltip-bottom {
  transform: translate(0, 10px);
}
.tooltip-fade-enter.vs-tooltip-left,
.tooltip-fade-leave-to.vs-tooltip-left {
  transform: translate(-10px, 0%);
}
.tooltip-fade-enter.vs-tooltip-right,
.tooltip-fade-leave-to.vs-tooltip-right {
  transform: translate(10px, 0%);
}
</style>
