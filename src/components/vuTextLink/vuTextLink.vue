<template>
<!-- https://unity.exxonmobil.com/components/text/text-link.html -->
  <a
    v-bind="$attrs"
    class="em-c-text-link em-u-clickable"
    :style="{ color: color }"
    v-on="listeners"
    :rel="computedRel"
  >
    <slot></slot>
  </a>
</template>
<script>
export default {
  name: 'vuTextLink',
  props: {
    href: {
      default: null,
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String
    },
    to: {
      default: null,
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String
    },
    target: {
      default: false,
      type: [Boolean, String]
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        click: (event) => this.clickButton(event)
      }
    },
    computedRel () {
      return (this.target == '_blank') ? 'noopener noreferrer' : ''
    }
  },
  methods: {
    routerPush () {
      this.$router.push(this.to).catch(err => { this.$emit('routeErr', err) })
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
</style>