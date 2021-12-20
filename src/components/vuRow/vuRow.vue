<template lang="html">
  <div
    :style="{
      'align-items':vsAlign,
      'justify-content':vsJustify,
      'display':vsType,
      'overflow': vsType === 'block' ? 'hidden' : null,
      'width':vsW*100/12+'%'}"
    class="vs-row">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'vuRow',
  props: {
    vsType: {
      default: 'flex',
      type: String
    },
    vsW: {
      type: [Number, String],
      default: 12
    },
    vsJustify: {
      type: String,
      default: null
    },
    vsAlign: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="css">
.vs-row {
  clear: both;
  flex-flow: wrap;
}

.gridx .vs-row {
  border-top: 1px solid #d2d2d2;
}

.gridx .vs-row:last-child {
  border-bottom: 1px solid #d2d2d2;
}

.gridx .vs-col {
  color: #969696;
  background: #f5f5f5;
  border-left: 1px solid #d2d2d2;
}

.gridx .vs-col p {
  background: transparent !important;
  padding: 7px !important;
}

.gridx .vs-col:last-child {
  border-right: 1px solid #d2d2d2;
}

.gridx .vs-col h3 {
  font-weight: lighter;
  font-size: 16px !important;
}

.gridx .vs-col h3 a {
  display: none;
}
</style>
