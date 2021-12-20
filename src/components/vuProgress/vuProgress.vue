<template>
  <!--
Progress Bar Component
https://unity.exxonmobil.com/components/messaging/progress-bar.html
-->
  <div
    v-if="active"
    ng-bind="$attrs"
    class="em-c-field em-c-progress-bar em-u-max-width-15"
    :class="[`em-c-progress-bar--${indt}`, `em-c-progress-bar--${thintype}`]"
  >
    <div class="em-c-progress-bar__label">
      <label>
        <slot></slot>
      </label>
      <span
        v-if="!indeterminate"
        class="em-u-margin-left-half"
        ref="percentlabel"
      >{{ percent + '%' }} </span>
    </div>
    <div class="em-c-progress-bar__bar">
      <span
        class="em-c-progress-bar__value"
        :style="{ width: (percent + '%') , backgroundColor: bg}"
      ></span>
      <span
        v-if="indeterminate"
        class="em-c-progress-bar--indeterminate__value"
      ></span>
    </div>
  </div>

</template>
<script>

export default {
  name: 'vuProgress',
  props: {
    percentage: {
      type: [Number, String],
      default: 0,
    },
    bg: {
      type: String,
      default: '#0c69b0'
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    thin: {
      type: Boolean,
      default: false
    },
    active: {
      type: [Boolean, String],
      default: true
    },
  },
  data () {
    return {
      percent: parseInt(this.percentage),
      indt: (this.indeterminate) ? 'indeterminate' : '',
      thintype: (this.thin) ? 'thin' : '',
    }
  }
}
</script>
<style scoped>
</style>
