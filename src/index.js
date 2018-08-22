import Vuedl from 'vuedl'
import DialogLayout from './components/DialogLayout.vue'
import Confirm from './components/Confirm.vue'
import Toast from './components/Toast.vue'
import Prompt from './components/Prompt.vue'

const Plugin = {
  install (Vue, options = {}) {
    const property = options.property || '$dialog'
    Vue.use(Vuedl, options)
    const manager = Vue.prototype[property]
    manager.layout('default', DialogLayout)

    manager.template('confirm', Confirm, {
      waitForResult: true,
      buttons: {
        'false': 'Cancel',
        'true': 'OK'
      }
    })

    manager.template('warning', Confirm, {
      type: 'warning',
      waitForResult: true,
      buttons: {
        'false': 'Cancel',
        'true': 'OK'
      }
    })

    manager.template('error', Confirm, {
      type: 'error',
      waitForResult: true,
      buttons: ['Close']
    })

    manager.template('toast', Toast, {
      waitForResult: true
    })

    manager.message = {
      info: (message, options) => manager.toast({ text: message, type: 'info', ...options }),
      error: (message, options) => manager.toast({ text: message, type: 'error', ...options }),
      success: (message, options) => manager.toast({ text: message, type: 'success', ...options }),
      warning: (message, options) => manager.toast({ text: message, type: 'warning', ...options })
    }

    manager.template('prompt', Prompt, {
      waitForResult: true,
      buttons: {
        'false': 'Cancel',
        'true': 'OK'
      }
    })
  }
}

export default Plugin