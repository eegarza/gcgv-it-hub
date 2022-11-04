<template>
  <!--
Section component
https://unity.exxonmobil.com/components/sections/section.html
-->
  <section class="em-c-section "
    :class=" { 'em-c-section em-c-section--split' : split }">
    <header
      v-bind="$attrs"
      class="em-c-section__header "
      :class="[
      { 'em-c-section__header--underline' : under_ }, 
      { 'em-c-section__header--underline em-c-section__header--underline-blue' : blue_ },
     ]">
      <h2 class="em-c-section__title ">
        <slot></slot>
        <span
          v-if="under_"
          class="em-c-section__title-underline"
          :style="{ background: bg }"
        ></span>
      </h2>
    </header>
    <!-- end em-c-section-header -->
    <div class="em-c-section__body">
      <slot name="content"></slot>
    </div>
    <!-- end em-c-section__body -->
  </section>

</template>

<script>
export default {
  name: 'vuSection',
  props: {
    icon: {
      default: 'caret-down',
      type: String
    },
    underline: {
      default: false,
      type: Boolean
    },
    blue: {
      default: false,
      type: Boolean
    },
    bg: {
      default: null,
      type: String
    },
    split: {
      default: false,
      type: Boolean
    },
  },
  mounted () {
    if (this.blue_ && !this.under_) { this.under_ = true }
  },
  data () {
    return {
      under_: this.underline,
      blue_: this.blue
    }
  }

}
</script>

<style scoped>
.em-c-section__header--underline-blue .em-c-section__title .em-c-section__title-underline {
  background-color: rgb(130, 188, 0);
  background-image: none;
}
</style>