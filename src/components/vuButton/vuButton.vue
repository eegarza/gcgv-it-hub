<template>
  <button
    v-bind="$attrs"
    :class="[`em-c-btn--${type}`,{
      'em-js-btn-selectable': selectable,
      'em-c-btn--disabled': disabled,
      'em-c-btn--round': round && /[px]/.test(size),
    }, `em-c-btn--${size}`]"
    :style="[{
      'width':/[px]/.test(size) ? `${size}` : null,
      'height':/[px]/.test(size) ? `${size}` : null
    }]"
    class="em-c-btn"
    name="button"
    v-on="listeners"
    :disabled="disabled"
  >
    <div
      class="em-c-btn__inner"
      v-if="icon"
    >
      <vu-icon
        :icon="icon"
        :custom-class="[ 'em-c-icon--small em-c-btn__icon', { 'em-u-margin-right-half' : icon && $slots.default  } ]"
      ></vu-icon>

      <span class="em-c-btn__text">
        <slot></slot>
      </span>

    </div>

    <span
      v-if="$slots.default && !icon"
      class="em-c-btn__text"
    >
      <slot />
    </span>

  </button>

</template>

<script>
import vuIcon from '../vuIcon/vuIcon'

export default {
  name: 'vuButton',
  inheritAttrs: false,
  components: {
    vuIcon
  },
  props: {
    type: {
      default: '',
      type: String
    },
    size: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    to: {
      default: null,
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String
    },
    href: {
      default: null,
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String
    },
    target: {
      default: false,
      type: [Boolean, String]
    },
    selectable: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    round: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    hoverx: false
  }),
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        click: (event) => this.clickButton(event),
        mouseover: (event) => this.mouseoverx(event),
        mouseout: (event) => this.mouseoutx(event)
      }
    }
  },
  methods: {
    routerPush () {
      this.$router.push(this.to).catch(err => { this.$emit('routeErr', err) })
    },
    is (which) {
      let type = this.type
      return type === which
    },
    mouseoverx (event) {
      this.$emit('mouseover', event)
      this.hoverx = true
    },
    mouseoutx (event) {
      this.$emit('mouseout', event)
      this.hoverx = false
    },
    clickButton (event) {
      this.$emit('click', event)
      if (this.to) {
        this.routerPush()
      }
      if (this.href) {
        if (typeof (this.href) === 'string') {
          this.target ? window.open(this.href) : window.location.href = this.href
        } else {
          this.target ? window.open(this.href.url) : window.location.href = this.href.url
        }
      }
    }
  }
}
</script>
<style scoped>
.em-c-btn--round,
.em-c-btn--round:before,
.em-c-btn--round:hover,
.em-c-btn--round:hover:before {
  border-radius: 50% !important;
}
</style>
