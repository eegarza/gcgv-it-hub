<template>

  <div
    v-bind="$attrs"
    class="em-c-hero"
    :style="{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundPosition: (this.bgImage) ? 'center': '', 
        backgroundSize: (this.bgImage) ? 'cover': '', 
        backgroundColor: bg }"
    :class=" { 'em-c-hero--bare' : bare, 'em-c-hero--tinted': tinted } "
  >
    <div class="em-c-hero__body">
      <div class="em-l-container">
        <h1
          v-if="title"
          class="em-c-hero__title"
          v-html="title"
        ></h1>
        <p
          v-if="title"
          class="em-c-hero__desc"
          v-html="desc"
        ></p>
        <slot></slot>
      </div>
    </div>
    <!-- end em-c-hero__body -->
  </div>
  <!-- end em-c-hero -->
</template>
<script>
export default {
  name: 'vuHero',
  props: {
    bgImage: {
      type: String,
      default: null
    },
    bg: {
      type: String,
      default: null
    },
    bare: {
      type: Boolean,
      default: false
    },
    tinted: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    desc: {
      type: String,
      default: null
    }
  }
}
</script>