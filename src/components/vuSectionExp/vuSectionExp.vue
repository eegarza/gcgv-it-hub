<template>
  <!--
Expandable section component
https://unity.exxonmobil.com/components/sections/expandable-section.html
-->
  <section class="em-c-section em-c-section--expandable">
    <header class="em-c-section__header em-js-section-trigger">
      <vu-icon
        :icon="icon"
        size="medium"
        custom-class="em-c-section__icon"
      ></vu-icon>
      <h2 class="em-c-section__title ">
        <slot></slot>
      </h2>
    </header>
    <!-- end em-c-section-header -->
    <div class="em-c-section__body em-js-section-target">
      <slot name="content"></slot>
    </div>
    <!-- end em-c-section__body -->
  </section>
  <!-- end em-c-section -->
</template>

<script>
import vuIcon from '../vuIcon/vuIcon'
export default {
  name: 'vuSectionExp',
  components: {
    vuIcon
  },
  props: {
    icon: {
      default: 'caret-down',
      type: String
    }
  }

}
</script>
