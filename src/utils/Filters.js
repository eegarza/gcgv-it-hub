import Vue from 'vue'
import moment from 'moment'

// Capitalize first word
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// Return uppercase
Vue.filter('uppercase', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
})

// Return Title Case
Vue.filter('titlecase', function (value) {
  if (!value) return ''
  return value.replace(
    /\w*\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    }
  )
})

// Format dates - using MomentJS
Vue.filter('formatDate', function (value, type) {
  switch (type) {
    case 'long':
      return moment(value).utc().format('MMM D, YYYY')
    case 'month':
      return moment(value).utc().format('MMMM')
    case 'day':
      return moment(value).utc().format('D')
    case 'weeekday':
      return moment(value).utc().format('ddd')
    case 'short':
      return moment(value).utc().format('MM.DD.YY')
    case 'hours':
      return moment(value).utc().format('hh:mm a')
  }
})

// Truncates text based on number of characters, and without cutting within words
Vue.filter('truncate', function (value, wordwise, max, tail) {
  if (!value) return ''

  max = parseInt(max, 10)
  if (!max) return value
  if (value.length <= max) return value

  value = value.substr(0, max)
  if (wordwise) {
    var lastspace = value.lastIndexOf(' ')
    if (lastspace !== -1) {
      // Also remove . and , so its gives a cleaner result.
      if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
        lastspace = lastspace - 1
      }
      value = value.substr(0, lastspace)
    }
  }
  return value + (tail || '…')
})
