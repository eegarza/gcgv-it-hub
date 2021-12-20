<template>
<!-- https://unity.exxonmobil.com/components/icons-and-media/image-with-caption.html -->
  <figure class="em-c-figure">
    <div class="em-c-figure__media">
      <img :src="src" :alt="alt" class />
    </div>
    <!-- end em-c-figure__media -->
    <figcaption class="em-c-figure__caption"><slot></slot></figcaption>
  </figure>
  <!-- end em-c-figure -->
</template>
<script>
export default {
    name: 'vuImage',
    props: {
        src: {
            type: String,
            default: null,
            required: true
        },
        alt: {
            type: String,
            default: null
        },
        width: {
            type: String,
            default: null
        },
        height: {
            type: String,
            default: null
        }
    }
};
</script>
<style scoped>
</style>