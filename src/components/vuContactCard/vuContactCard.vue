<template>
  <ul
    class="em-c-contact-card-list em-l-grid "
    :class="`em-l-grid--${columns}up`"
  >
    <li
      v-if="!loaded"
      class="em-c-contact-card-list__item em-l-grid__item em-u-padding"
    >
      <content-loader
        :width="300"
        :height="160"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect
          x="105"
          y="12"
          rx="3"
          ry="3"
          width="88"
          height="6"
        />
        <rect
          x="105"
          y="27"
          rx="3"
          ry="3"
          width="52"
          height="6"
        />
        <rect
          x="22"
          y="90"
          rx="3"
          ry="3"
          width="180"
          height="6"
        />
        <rect
          x="22"
          y="110"
          rx="3"
          ry="3"
          width="180"
          height="6"
        />
        <rect
          x="22"
          y="130"
          rx="3"
          ry="3"
          width="180"
          height="6"
        />
        <circle
          cx="50"
          cy="35"
          r="35"
        />
        <rect
          x="105"
          y="42"
          rx="3"
          ry="3"
          width="47"
          height="6"
        />
        <rect
          x="22"
          y="150"
          rx="3"
          ry="3"
          width="180"
          height="6"
        />
      </content-loader>
    </li>

    <li
      class="em-c-contact-card-list__item em-l-grid__item"
      v-for="contact in results"
      :key="contact.GUID"
      v-show="loaded"
    >
      <div class="em-c-card vcard">

        <div class="em-c-card__body">
          <div class="em-c-media-block em-c-media-block--small">
            <div class="em-c-media-block__media">
              <img
                v-show="contact.data[0].Email"
                :src=" 'https://api.hoe.na.xom.com/apps-cp-emit/picture/v1/api/user/' + contact.data[0].Email"
                :alt="contact.data[0].Name"
                class="em-c-media-block__img em-c-avatar photo media-object"
              />
            </div>
            <!-- end em-c-media-block__media -->
            <div class="em-c-media-block__body">
              <h2
                class="em-c-media-block__headline fn"
                v-show="contact.data[0].Name"
              >
                {{ contact.data[0].Name | titlecase }}
              </h2>
              <p class="em-c-media-block__desc"><span
                  class='org'
                  v-show="contact.data[0].Organization"
                > {{ contact.data[0].Organization }}</span>
                <br /><span
                  class='adr locality'
                  v-show="contact.data[0].Location"
                >{{ contact.data[0].Location }}</span></p>

              <vu-skype-status :email="contact.data[0].Email"></vu-skype-status>

              <!-- end em-c-status-->
            </div>
            <!-- end em-c-media-block__body -->
          </div>
          <!-- end em-c-media-block -->
        </div>
        <!-- end em-c-card__body -->
        <div
          class="em-c-card__footer"
          v-show="contact.data[0].Email"
        >
          <ul class="em-c-link-list em-c-link-list--small em-c-link-list--has-icons">
            <li class="em-c-link-list__item">
              <a
                :href=" 'mailto:' + contact.data[0].Email "
                class="em-c-link-list__link email"
              >
                <svg class="em-c-icon em-c-icon--small em-c-link-list__icon">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="../../../public/images/em-icons.svg#envelope-closed"
                  ></use>
                </svg>
                <span class="em-c-link-list__text">{{ contact.data[0].Email }}</span>
              </a>
            </li>
            <!-- end em-c-link-list__item -->
            <li
              class="em-c-link-list__item"
              v-show="contact.data[0].Email"
            >
              <a
                :href=" 'tel:' + contact.data[0].Phone"
                class="em-c-link-list__link tel"
              >
                <svg class="em-c-icon em-c-icon--small em-c-link-list__icon">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="../../../public/images/em-icons.svg#phone"
                  ></use>
                </svg>
                <span class="em-c-link-list__text">{{ contact.data[0].Phone }}</span>
              </a>
            </li>
            <!-- end em-c-link-list__item -->
            <li
              class="em-c-link-list__item"
              v-show="contact.data[0].Email"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="'http://mysite.na.xom.com/Person.aspx?user=' + contact.data[0].Email"
                class="em-c-link-list__link url"
              >
                <svg class="em-c-icon em-c-icon--small em-c-link-list__icon">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="../../../public/images/em-icons.svg#link"
                  ></use>
                </svg>
                <span class="em-c-link-list__text">MySite</span>
              </a>
            </li>
            <!-- end em-c-link-list__item -->
            <li
              class="em-c-link-list__item"
              v-show="contact.data[0].Email"
            >
              <a
                :href=" 'sip:' + contact.data[0].Email "
                class="em-c-link-list__link "
              >
                <svg class="em-c-icon em-c-icon--small em-c-link-list__icon">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="../../../public/images/em-icons.svg#comment"
                  ></use>
                </svg>
                <span class="em-c-link-list__text">Send IM</span>
              </a>
            </li>
            <!-- end em-c-link-list__item -->
          </ul>
          <!-- end em-c-link-list -->
        </div>
        <!-- end em-c-card__footer -->
      </div>
      <!-- end em-c-card -->
    </li>
    <!-- end em-c-card-list__item -->
  </ul>
  <!-- end em-c-card-list -->
</template>
<script>
import '../../utils/Filters'
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import vuSkypeStatus from '../vuSkypeStatus/vuSkypeStatus.vue'
// eslint-disable-next-line no-unused-vars
import vuIcon from '../vuIcon/vuIcon.vue'

// Uses the ITSM API to lookup users
const itsm = axios.create({
   baseURL: 'https://ticket/api/',
   withCredentials: true
})

export default {
  name: 'vuContactCard',
  components: {
    vuSkypeStatus,
    ContentLoader
  },
  props: {
    contacts: {
      type: Array,
      default: null
    },
    columns: {
      type: Number,
      default: 3,
      validator: value => {
        // Only accepts valid grid column #s.
        return value >= 2 && value < 7
      }
    }
  },
  data () {
    return {
      searchcontacts: this.contacts,
      requests: [],
      results: [],
      loaded: false
    }
  },
  async mounted () {

    // create a request for each email submitted
    for (let index = 0; index < this.searchcontacts.length; index++) {
      if (this.validateEmail(this.searchcontacts[index])) {
        this.requests.push(itsm.get('user/all?query=' + this.searchcontacts[index]))
      }
    }

    // Take advantage of Axios promise.all to handle multiple requests
    axios.all(this.requests).then(axios.spread((...results) => {
      this.results = results
      this.loaded = true
    }))

  },
  methods: {
    validateEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>
<style scoped>
/* ensures profile pictures display nicely */
.media-object {
  height: 100px;
  width: 100px;
  object-fit: contain;
  background-color: #e3e3e3;
  font-family: "object-fit: contain;";
}
</style>
