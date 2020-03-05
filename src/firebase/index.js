let app

if (typeof window !== 'undefined') {
  app = require('firebase/app')

  require('firebase/auth')
  require('firebase/firestore')
  require('firebase/storage')
  require('firebase/analytics')
}

import { fireConfig } from './config'

class Firebase {
  constructor() {
    if (typeof window !== 'undefined') {
      app.initializeApp(fireConfig)
      this.auth = app.auth()
      this.db = app.firestore()
      this.storage = app.storage()
      this.uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Email as auth providers.
        signInOptions: [
          app.auth.GoogleAuthProvider.PROVIDER_ID,
          app.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        signInSuccessUrl: '/perfil',
      }
    }
  }
}

const firebase = new Firebase()
export { firebase }
