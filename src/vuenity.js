// Imports all components for installation in Vue
import * as vuComponents from './components'

const install = (Vue) => {
  // Use Components
  Object.values(vuComponents).forEach((vuComponent) => {
    Vue.use(vuComponent)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install

export { default as vuAlert } from './components/vuAlert'
export { default as vuAvatar } from './components/vuAvatar'
export { default as vuBadge } from './components/vuBadge'
export { default as vuButton } from './components/vuButton'
export { default as vuCol } from './components/vuCol'
export { default as vuContainer } from './components/vuContainer'
export { default as vuContactCard } from './components/vuContactCard'
export { default as vuFileUpload } from './components/vuFileUpload'
export { default as vuHero } from './components/vuHero'
export { default as vuIcon } from './components/vuIcon'
export { default as vuImage } from './components/vuImage'
export { default as vuLoading } from './components/vuLoading'
export { default as vuLogo } from './components/vuLogo'
export { default as vuModal } from './components/vuModal'
export { default as vuPeoplePicker } from './components/vuPeoplePicker'
export { default as vuProgress } from './components/vuProgress'
export { default as vuQuote } from './components/vuQuote'
export { default as vuRow } from './components/vuRow'
export { default as vuSection } from './components/vuSection'
export { default as vuSectionExp } from './components/vuSectionExp'
export { default as vuSkypeStatus } from './components/vuSkypeStatus'
export { default as vuStatus } from './components/vuStatus'
export { default as vuTextLink } from './components/vuTextLink'
export { default as vuTextPassage } from './components/vuTextPassage'
export { default as vuTooltip } from './components/vuTooltip'
export { default as vuTypeahead } from './components/vuTypeahead'
