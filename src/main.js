/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/colours.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faEllipsisVertical, faCircleCheck, faCircle, faPalette, faXmark, faPlus)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')