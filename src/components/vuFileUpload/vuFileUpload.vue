<template>
  <form
    enctype="multipart/form-data"
    novalidate
  >
    <div
      v-bind="$attrs"
      class="em-c-field em-c-field--file-upload "
      :class="[ { 'em-is-valid' : isSuccess ,  'em-has-error' : isFailed , 'em-is-disabled' : isSaving || disabled }  ] "
    >
      <label
        for="file"
        class="em-c-field__label"
      >{{ label }}</label>
      <div
        class="em-c-field__body"
        :class="{ 'em-is-valid' : isSuccess }"
      >
        <svg class="em-c-icon em-c-icon--large em-c-field__block-icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="../../../public/images/48/em-icons.svg#upload"
          ></use>
        </svg>
        <input
          type="file"
          ref="fileupload"
          id="
          getfile"
          :disabled="isSaving || disabled"
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          class="em-c-file-upload"
          :accept="accept"
        />
        <ul
          class="em-c-field__list em-js-field-list"
          v-if="isInitial || isSaving || isSuccess"
        >
          <li class="em-c-field__item">Drag files here</li>
          <li class="em-c-field__item em-c-field__item--small em-u-padding-bottom">Or click to choose file</li>

          <li
            class="em-js-field-item"
            :class="{ 'em-is-valid' : isSuccess }"
            v-show="filename && isSaving"
          >{{ currentMessage }} {{ filename }}</li>
          <li
            class="em-js-field-item"
            :class="{ 'em-is-valid' : isSuccess }"
            v-show="uploadedFiles.length > 0 "
            v-for="(file, index) in uploadedFiles"
            :key="index"
          >{{ file.text }}</li>

        </ul>
      </div>
      <!-- end em-c-field__body -->
      <div class="em-c-field__note">{{ note }}</div>
    </div>
    <!-- end em-c-field -->
  </form>
</template>
<script>
// Inspired by:
// https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/upload-a-file-by-using-the-rest-api-and-jquery

// eslint-disable-next-line no-unused-vars
import vuIcon from '../vuIcon/vuIcon.vue'
import SharePointService from '../../services/SharePointService'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'vuFileUpload',
  props: {
    accept: {
      type: String,
      // you can specify 'image/*' to accept images only. Full list of accepted file types at http://www.iana.org/assignments/media-types/media-types.xhtml#application
      default: '*/*'
    },
    label: {
      type: String,
      default: 'Upload a file'
    },
    note: {
      type: String,
      default: null
    },
    library: {
      type: String,
      default: null,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      currentMessage: null,
      filename: null
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
    },
    // Get the local file as an array buffer.
    async getFileBuffer (fileInput) {

      let reader = new FileReader();

      const getReader = new Promise((resolve) => {
        reader.readAsArrayBuffer(fileInput.files[0])
        reader.onloadend = (e) => {
          resolve(e.target.result)

        }
      }).catch((reject) => {
        reader.onerror = function (e) {
          reject(e.target.error);
        }
      })

      // Run promise then execute save vommand
      getReader.then(() => {
        this.save(this.library, reader.result, this.filename);

      }).catch(err => {
        console.error(err)
      })

    },
    save (folder, formData, filename) {

      SharePointService.fileUpload(folder, formData, filename).then((res) => {
        this.currentStatus = STATUS_SUCCESS;
        this.currentMessage = 'Upload complete:'
        this.uploadedFiles = [{
          'text': 'Completed: ' + filename,
          'path': res.d.ServerRelativeUrl
        }]
        this.$emit('fileuploaded', this.uploadedFiles)

      })
        .catch(err => {
          console.log(err)
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange (fieldName, fileList) {

      this.reset()

      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      this.currentMessage = 'Now saving: '

      let fileInput = this.$refs.fileupload

      // get file name from file added
      this.filename = fileList[0].name

      // Runs get File Buffer, then triggers save
      this.getFileBuffer(fileInput)

    }
  },
  mounted () {
    this.reset()
  },
}

</script>
<style scoped>
.em-c-field--file-upload .em-c-field__body.em-is-valid {
  border: 2px dashed #00b04f;
}
.em-js-field-item.em-is-valid {
  color: #00b04f;
}
</style>