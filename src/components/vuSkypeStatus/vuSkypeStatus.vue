<template>
  <vu-status
    v-bind="$attrs"
    v-if="loaded && !NotIE"
    :customIcon="'square-filled'"
    :status.sync="status.mystatus"
  ><span v-html='defineStatus'></span>
  </vu-status>
  <vu-status v-else>{{ this.error ? this.error : 'Loading...'}}</vu-status>
</template>

<script>
import axios from 'axios'
import vuStatus from '../vuStatus/vuStatus.vue'

// Instantiates the SharePoint status API
const skypeAPI = axios.create({
  baseURL: 'https://api.hoe.na.xom.com/apps-cp-emit/presence/v1/api/presence/'
})

export default {
  name: 'vuSkypeStatus',
  components: {
    vuStatus
  },
  props: {
    email: {
      type: String,
      default: null,
      required: true
    },
    SIP: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loaded: false,
      status: null,
      error: null,
      NotIE: false,
    }
  },
  async mounted () {

       // if not using IE do not attempt to retrieve Skype status
    if (window.document.documentMode == undefined) {
      this.NotIE = true
      this.loaded = true
      this.error = 'Skype status only on IE'
      return
    }

    skypeAPI.get(this.email).then((response) => {
      this.status = response.data
      this.getStatus(this.status)
      this.loaded = true

    }).catch((err) => {
      this.error = 'Unable to retrieve status'
      console.log('Something went wrong', err)
    })
  },
  computed: {
    defineStatus () {
      if (this.SIP) {
        return `<a title='Send IM' href='sip:${this.email}'>${this.status.availability}</a>`
      } else {
        return this.status.availability
      }
    }
  },
  methods: {

    getStatus (status) {

      if (!status) {
        return 
      }
      switch (status.availability) {
        case 'Online':
          return this.status.mystatus = 'positive'
        case 'Busy':
          return this.status.mystatus = 'negative'
        case 'Away':
          return this.status.mystatus = 'caution'
        case 'Offline':
          return this.status.mystatus = 'inactive'
        default:
          return this.status.mystatus = 'inactive'
      }
    }
  }
}
</script>
<style scoped>
</style>
