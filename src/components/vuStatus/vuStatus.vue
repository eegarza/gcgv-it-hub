<template>
  <!--
Status Label Component
https://unity.exxonmobil.com/components/messaging/status.html
-->
  <div
    class="em-c-status"
    :class="statusClass"
  >
    <vu-icon
      :icon="customIcon ? customIcon : statusIcon "
      size="small"
      custom-class="em-c-status__icon"
      :color="customIconColor"
    ></vu-icon>
    <span class="em-c-status__label">
      <slot></slot>
    </span>
  </div>
  <!-- end em-c-status-->

</template>
<script>
import vuIcon from '../vuIcon/vuIcon'
export default {
  name: 'vuStatus',
  components: {
    vuIcon
  },
  props: {
    status: {
      default: null,
      type: String
    },
    customIcon: {
      default: null,
      type: String
    },
    customIconColor: {
      default: null,
      type: String
    }
  },
  data () {
    return {
      statusClass: '',
      statusIcon: ''
    }
  },
  methods: {
    getStatus () {
      switch (this.status) {
        case 'positive':
          this.statusClass = 'em-c-status--positive'
          this.statusIcon = 'triangle-up-filled'
          break
        case 'caution':
          this.statusClass = 'em-c-status--caution'
          this.statusIcon = 'square-filled'
          break
        case 'negative':
          this.statusClass = 'em-c-status--negative'
          this.statusIcon = 'triangle-down-filled'
          break
        case 'inactive':
          this.statusClass = 'em-c-status--inactive'
          this.statusIcon = 'x-filled'
          break
      }
    }
  },
  mounted () {
    this.getStatus()
  },
  updated () {
    this.getStatus()

  }
}
</script>
