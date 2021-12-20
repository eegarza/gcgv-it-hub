<template>
  <!--
Modal component
https://unity.exxonmobil.com/components/messaging/modal.html
-->
  <transition name="popup-t">

    <div
      v-show="active"
      tabindex="0"
      v-bind="$attrs"
      ref="con"
      class="em-c-modal con-vs-popup"
      @keyup.esc="$emit('update:active', false)"
      @click="close($event,true)"
    >
      <div
        class="em-c-modal__window vs-popup--background"
        :class="{'modal-large':large}"
      >
        <div
          class="em-c-modal__header"
          ref="popupx"
        >
          <h3 class="em-c-modal__title">{{ title }}</h3>
          <button
            ref="btnclose"
            @click="$emit('update:active', false)"
            class="em-c-btn em-c-btn--bare em-c-modal__close-btn "
          >
            <span
              class="em-c-btn__text"
              ref="btnclosespan"
            >Close</span>
          </button>
          <!-- end em-c-btn -->
        </div>
        <!-- end em-c-modal__header -->
        <div class="em-c-modal__body em-c-text-passage em-c-text-passage--small">
          <slot></slot>
        </div>
        <!-- end em-c-modal__body -->
        <div class="em-c-modal__footer em-c-text-passage em-c-text-passage--small">
          <slot name="footer"></slot>
        </div>
        <!-- end em-c-modal__footer -->
      </div>
      <!-- end em-c-modal__window -->
    </div>
    <!-- end em-c-modal -->

  </transition>
</template>

<script>
export default {
  name: 'vuModal',
  props: {
    active: {
      default: false,
      type: Boolean
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    bg: {
      default: null,
      type: String
    },
    title: {
      default: 'popup',
      type: String
    },
    buttonCloseHidden: {
      default: false,
      type: Boolean
    },
    large: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    this.insertBody()
  },
  beforeDestroy () {
    // close the left open prompt
    let elx = this.$refs.con
    if (document.body) {
      document.body.removeChild(elx)
    }
  },
  methods: {
    close (event, con) {
      if (con) {
        if (
          event.target.className.indexOf('con-vs-popup') === -1) {
          this.$emit('close', false)
        } else if (event.srcElement === this.$refs.btnclose || this.$refs.btnclosespan) {
          this.$emit('update:active', false)
          this.$emit('close', false)
        }
      }
    },
    insertBody () {
      let elx = this.$refs.con
      document.body.insertBefore(elx, document.body.firstChild)
    }
  }
}
</script>
<style scoped>
.em-js .em-c-modal__window.modal-large {
   width: 60em;
}
.em-js .em-c-modal__window {
  z-index: 25;
}
.popup-t-enter,
.popup-t-leave-to {
  opacity: 0 !important;
}
.popup-t-enter .vs-popup {
  transform: scale(0.9) !important;
}
.popup-t-leave-to .vs-popup {
  transform: scale(0.9) !important;
}
.popup-t-enter .vs-popup-cancel,
.popup-t-leave-to .vs-popup-cancel {
  border-radius: 50% !important;
}
.con-vs-popup {
  transition: all 0.2s;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
.con-vs-popup.fullscreen .vs-popup {
  width: 100%;
  height: 100%;
}
.con-vs-popup .vs-popup {
  transition: all 0.2s;
  z-index: 100;
  width: 600px;
  margin: 10px;
  max-width: calc(100% - 30px);
  max-height: calc(100% - 30px);
  border-radius: 6px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  animation: rebound 0.3s;
}

@-moz-keyframes rebound {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes rebound {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes rebound {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes rebound {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>
