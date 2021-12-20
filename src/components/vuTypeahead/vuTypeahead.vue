<template>

  <div
    class="em-c-field"
    v-bind="$attrs"
    :class="[{ 'em-is-disabled' : disabled }, returnStatus , { 'em-has-error' : ( results.length === 0 && isDirty && internalquery.length > minChars && loading && !finished ) }]"
  >
    <label class="em-c-field__label">{{ label }}</label>
    <div class="em-c-field__body">
      <input
        class="em-c-input em-js-typeahead"
        :disabled="disabled"
        v-model="internalquery"
        :placeholder="placeholder"
        v-on:input="searchContent($event, internalquery)"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.enter="hit"
        @keydown.esc="reset"
      />
      <vu-icon v-if="disabled"
        icon="ban"
        size="medium"
        color="grey"
        customClass="em-c-field__icon"
      ></vu-icon>
      <vu-icon
        v-if="results.length === 0 && isDirty && internalquery.length > minChars && loading && !finished"
        icon="warning"
        size="medium"
        color="red"
        customClass="em-c-field__icon"
      ></vu-icon>

      <div
        class="em-c-field__menu  em-js-typeahead-menu"
        :class="{ 'em-is-active' : results.length > 0 }"
      >
        <ul class="em-c-typeahead-list">
          <li
            class="em-c-typeahead-list__item em-u-clickable"
            v-for="(result, $item) in results"
            :class="activeClass($item)"
            :key="$item"
            @mousedown="hit"
            @mousemove="setActive($item)"
          >
            <span
              :inner-html.prop="result[displayField] | highlight(internalquery)"
              ref="typeaheadlistitem"
              class="em-c-typeahead__suggestion"
            >{{ result.DisplayText }} </span>
          </li>

        </ul>
      </div>
      <!--end em-c-field__menu-->
    </div>

    <!-- end em-c-field__body -->
    <div class="em-c-field__note"> {{ note }} </div>

  </div>
  <!-- end em-c-field -->

</template>
<script>
import debounce from 'lodash.debounce'
import Vue from 'vue'

// Highlight search criteria
Vue.filter('highlight', function (value, searchitem) {
  if (!value) return ''

  let reg = new RegExp(searchitem, 'gi');
  return value.replace(reg, (str) => {
    return `<strong>${str}</strong>`  })

})

export default {
  name: 'vuTypeahead',
  props: {
    label: {
      default: null,
      type: String
    },
    placeholder: {
      default: null,
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    note: {
      default: null,
      type: String
    },
    status: {
      default: null,
      type: String
    },
    resetSearch: {
      default: false,
      type: Boolean
    },
    content: {
      default: () => {
        return []
      },
      type: Array,
      required: true
    },
    fieldNames: {
      default: () => {
        return []
      },
      type: Array,
      required: true
    },
    displayField: {
      default: '',
      type: String,
      required: true
    },
    minChars: {
      default: 3,
      type: Number
    }
  },
  data () {
    return {
      internalquery: null,
      results: [],
      searchArray: this.content,
      current: -1,
      loading: false,
      finished: false
    }
  },
  computed: {
    returnStatus () {
      switch (this.status) {
        case 'valid':
          return 'em-is-valid'
        case 'error':
          return 'em-has-error'
        default:
          return ''
      }
    },
    hasItems () {
      return this.results.length > 0
    },
    isEmpty () {
      return !this.internalquery
    },
    isDirty () {
      return !!this.internalquery
    }
  },
  watch: {
    resetSearch: function (newVal) { // watch it
      if (newVal) {
        // if flag received, reset search
        this.reset()
      }
    }
  },
  methods: {
    searchContent: debounce(function (event, data) {

      this.finished = false
      this.loading = true
      this.results = []

      // exit function if not enough chars
      if (this.minChars && data.length < this.minChars) {
        return
      }

      this.results = this.content.filter((item) => {
        // Iterates throught he elements based on properties selected for searching
        for (let index = 0; index < this.fieldNames.length; index++) {
          let fieldname = this.fieldNames[index].toString()
          return item[fieldname].toLowerCase().indexOf(data.toLowerCase()) !== -1
        }
        this.loading = false

      })

      //   }) 
    }, 500),
    up () {
      if (this.current > 0) {
        this.current--
      } else if (this.current === -1) {
        this.current = this.results.length - 1
      } else {
        this.current = -1
      }
    },
    down () {
      if (this.current < this.results.length - 1) {
        this.current++
      } else {
        this.current = -1
      }
    },
    reset () {
      this.results = []
      this.loading = false
      this.internalquery = ''
    },
    setActive (index) {
      this.current = index
    },
    activeClass (index) {
      return {
        'em-item-active': this.current === index
      }
    },
    hit () {
      if (this.current !== -1) {

        this.internalquery = this.results[this.current][this.displayField]
        this.$emit('itemselected', this.results[this.current])
        this.results = []
        this.finished = true

      }
    }
  }
}
</script>
<style scoped>
.em-item-active {
  color: #fff !important;
  background: #0c69b0 !important;
}
.em-c-typeahead-list__item:hover,
.em-c-typeahead-list__item:focus {
  color: initial;
  background: initial;
}
</style>