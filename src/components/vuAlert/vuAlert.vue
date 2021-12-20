<template>
  <!--
Alert Component
https://unity.exxonmobil.com/components/messaging/alert.html
  -->
  <transition name="fade" mode="out-in">
    >
    <div
      v-if="checkActive"
      class="em-c-alert"
      v-bind="$attrs"
      :class=" `em-c-alert--${type}`"
      :style="{ color: color, backgroundColor: bg, borderColor: bg }"
      role="alert"
      ref="alert"
    >
      <vu-icon :icon="customIcon ? customIcon : icon" size="small"></vu-icon>

      <div class="em-c-alert__body em-u-margin-left-half">
        <slot></slot>
      </div>
      <div class="em-c-alert__actions" v-if="canClose">
        <button
          :style="{ color: color }"
          @click="$emit('update:active',false)"
          class="em-c-text-btn"
        >Close</button>
        <!-- end em-c-btn -->
      </div>
    </div>
    <!-- end em-c-alert -->
  </transition>
</template>

<script>
import vuIcon from "../vuIcon/vuIcon";

export default {
  name: "vuAlert",
  components: {
    vuIcon
  },
  props: {
    type: {
      default: 'success',
      type: String
    },
    active: {
      type: [Boolean, String],
      default: true
    },
    color: {
      default: null,
      type: String
    },
    customIcon: {
      default: null,
      type: String
    },
    bg: {
      default: null,
      type: String
    },
    closeable: {
      default: true,
      type: Boolean
    },
    autoClose: {
      default: null,
      type: [Number, String]
    }
  },
  mounted() {
    switch (this.type) {
      case "success":
        this.icon = "circle-check";
        break;
      case "warning":
        this.icon = "warning";
        break;
      case "error":
        this.icon = "circle-exclamation-mark";
        break;
    }
  },
  methods: {
    closeAlert() {
      // Closes the alert in autoClose * 1000 (for seconds)
      setTimeout(() => {
        this.$emit("update:active", false);
      }, parseInt(this.autoClose) * 1000);
    }
  },
  data() {
    return {
      icon: "info",
      canClose: this.closeable
    }
  },
  computed: {
    checkActive() {
      // If active and auto close, then run closeAlert method
      if (this.active && this.autoClose) {
        this.closeAlert();
      }
      if (this.active) {
        return true
      }
      return false
    }
  }
};
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
