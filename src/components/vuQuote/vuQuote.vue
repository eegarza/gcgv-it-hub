<template>
  <!--
Quote component
https://unity.exxonmobil.com/components/text/pullquote.html
-->
  <blockquote class="em-c-pullquote">
    <vu-icon
      class="em-c-pullquote__icon"
      size="large"
      icon="quote-left"
    ></vu-icon>
    <div class="em-c-pullquote__quote">
      <slot></slot>
    </div>
    <cite class="em-c-pullquote__citation">
      <slot name="author"></slot>
    </cite>
  </blockquote>
  <!-- end em-c-blockquote -->
</template>

<script>
import vuIcon from '../vuIcon/vuIcon'
export default {
  name: 'vuQuote',
  components: {
    vuIcon
  },
  props: {
    author: {
      default: null,
      type: String
    }
  }
}
</script>
