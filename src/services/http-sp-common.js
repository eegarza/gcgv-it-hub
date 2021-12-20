import axios from 'axios'

// Initiates axios instance. By using instance, you can have multiple on your application
const spinstance = axios.create({
  baseURL: process.env.VUE_APP_SPURL
})

spinstance.defaults.headers.common['Accept'] = 'application/json;odata=verbose'
spinstance.defaults.headers.common['Content-Type'] = 'application/json;odata=verbose'
spinstance.defaults.headers.post['Accept'] = 'application/json;odata=verbose'
spinstance.defaults.headers.post['Access-Control-Allow-Origin'] = "*"
spinstance.defaults.headers.post['Access-Control-Allow-Headers'] = "Content-Type"
spinstance.defaults.headers.post['Content-Type'] = "application/json;odata=verbose"

export const setXRequestDigest = (digest) => {
  if (digest) {
    spinstance.defaults.headers.post['X-RequestDigest'] = digest;
  } else {
    delete spinstance.defaults.headers.post['X-RequestDigest'];
  }
}

export default spinstance