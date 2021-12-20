<template>
<!--
Loading indicator
https://unity.exxonmobil.com/components/messaging/loading.html
-->
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      class="em-c-loader"
      v-if="show"
      :style="{ width: width }"
    >
      <img
        :src="loaderPath"
        alt="Loading"
      />
    </div>
  </transition>
</template>

<script>
import loaderPath from '../../../public/images/icon-spinner.svg'

export default {
  name: 'vuLoading',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loaderPath
    }
  }
}
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.25s;
}

.fade-leave-active {
  transition: opacity 0.25s;
  opacity: 0;
}
</style>
