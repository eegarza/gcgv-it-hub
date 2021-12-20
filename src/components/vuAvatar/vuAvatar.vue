<template>
  <div
    v-bind="$attrs"
    :style="avatarStyle"
    :class="avatarClass"
    class="con-vs-avatar"
    v-on="$listeners">
    <div
      v-if="badge && badge > 0"
      :style="badgeStyle"
      :class="badgeClass"
      class="dot-count vs-avatar--count">
      {{ typeof badge != 'boolean' ? badge : null }}
    </div>
    <div
      v-if="src"
      class="con-img vs-avatar--con-img">
      <img
        :src="src"
        :alt="text"
      >
    </div>
    <span
      v-else
      :title="text"
      :style="{ 'color': textColor }"
      :class="[{ 'vs-avatar--text' : text }, { 'vs-avatar--icon' : icon }]"
      translate="no"
      class="notranslate"
    >
      <vu-icon v-if="!text" size="small" :icon="icon"></vu-icon>
      {{ text ? returnText : ''  }}
    </span>

  </div>
</template>

<script>
import vuIcon from '../vuIcon/vuIcon'
export default {
  name: 'vuAvatar',
  components: {
    vuIcon
  },
  props: {
    badge: {
      type: [Boolean, String, Number],
      default: false
    },
    badgeColor: {
      default: 'black',
      type: String
    },
    size: {
      type: String,
      default: null
    },
    src: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPack: {
      type: String,
      default: 'material-icons'
    },
    textColor: {
      type: String,
      default: 'rgb(255, 255, 255)'
    },
    text: {
      type: [String, Number],
      default: null
    },
    color: {
      type: String,
      default: 'rgb(195, 195, 195)'
    }
  },
  computed: {
    avatarClass () {
      const classes = {}
      classes[this.size] = true
      return classes
    },
    avatarStyle () {
      const style = {
        width: /[px]/.test(this.size) ? this.size : null,
        height: /[px]/.test(this.size) ? this.size : null,
        background: this.color
      }
      return style
    },
    badgeClass () {
      const classes = {
        badgeNumber: (typeof badge !== 'boolean')
      }
      classes[`dot-count-${this.badgeColor}`] = true
      return classes
    },
    badgeStyle () {
      const style = {}
      style.background = this.badgeColor
      return style
    },
    textClass () {
      const classes = {}
      classes[`vs-avatar-text-${this.textColor}`] = true
      return classes
    },
    textStyle () {
      const style = {
        transform: `translate(-50%,-50%) scale(${this.returnScale})`
      }
      style.color = this.textColor
      return style
    },
    returnText () {
      if (this.text.length <= 5) {
        return this.text
      }
      let exp = /\s/g
      var letras = ''
      if (exp.test(this.text)) {
        this.text.split(exp).forEach((word) => {
          letras += word[0].toUpperCase()
        })
      } else {
        letras = this.text[0].toUpperCase()
      }
      return letras.length > 5 ? letras[0] : letras
    },
    returnScale () {
      if (!this.text) return 1
      let lengthx = this.returnText.length
      if (lengthx <= 5 && lengthx > 1) {
        console.log('here')
        return lengthx / (lengthx * 1.5)
      } else {
        return 1
      }
    }
  }
}
</script>
<style lang="css" scoped>
.con-vs-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
}
.con-vs-avatar.large {
  width: 50px;
  height: 50px;
}
.con-vs-avatar.small {
  width: 24px;
  height: 24px;
}
.con-vs-avatar.small .vs-avatar-text {
  font-size: 0.9375em;
}
.vs-avatar--count {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  z-index: 100;
}
.vs-avatar--count.badgeNumber {
  width: auto;
  height: auto;
  top: -3px;
  right: 0px;
  border-radius: 4px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 0.625em;
  color: #fff;
}
.vs-avatar--text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)l
}
.vs-avatar--icon {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

.vs-avatar--con-img {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.vs-avatar--con-img img {
  width: 100%;
}
</style>
