<template>
  <!--
Unity icons
https://unity.exxonmobil.com/components/icons-and-media/icons.html
-->
  <span class='em-c-icon-span' :class="[customBg, { 'em-c-avatar': round }]" :style="{ backgroundColor: bg }">
    <svg
      class='em-c-icon'
      :class="[sizeObject, customClass]"
      v-bind="$attrs"
      :style="{ width: width , height: height, color: color, backgroundColor: bg }"
    >
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :xlink:href="iconPath"
      ></use>
    </svg>
  </span>
</template>

<script>
import smIcons from '../../../public/images/em-icons.svg'
import mdIcons from '../../../public/images/24/em-icons.svg'
import lgIcons from '../../../public/images/48/em-icons.svg'

export default {
  name: 'vuIcon',
  props: {
    icon: {
      default: null,
      type: String,
      required: true
    },
    size: {
      default: 'small',
      type: String
    },
    width: {
      default: null,
      type: [Number, String]
    },
    height: {
      default: null,
      type: [Number, String]
    },
    color: {
      default: 'currentColor',
      type: String
    },
    customClass: {
      default: null,
      type: [String, Array]
    },
    bg: {
      default: null,
      type: String
    },
    round: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    sizeObject: function () {
      return {
        'em-c-icon--small': this.size === 'small',
        'em-c-icon--medium': this.size === 'medium',
        'em-c-icon--large': this.size === 'large'
      }
    },
    iconPath: function () {
      switch (this.size) {
        case 'small':
          return smIcons + '#' + this.icon
        case 'medium':
          return mdIcons + '#' + this.icon
        case 'large':
          return lgIcons + '#' + this.icon
        default:
          return smIcons + '#' + this.icon
      }
    },
    customBg () {
      return (this.bg) ? 'bgpadding' : ''
    }
  }
}
</script>

<style scoped>
.em-c-icon-span {
    display: inline-flex;
    align-content: center;
    justify-content: center;
}

.bgpadding {
    padding: 1.5em;
}

svg {
  display: inline-block;
  vertical-align: center;
}
</style>
