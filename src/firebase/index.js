import { fireConfig } from './config'

let app

if (typeof window !== 'undefined') {
  app = require('firebase/app')

  require('firebase/auth')
  require('firebase/firestore')
  require('firebase/storage')
  require('firebase/analytics')
}

let firebase, uiConfig

if (typeof window !== 'undefined') {
  firebase = app.initializeApp(fireConfig)
  uiConfig = {
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

export { firebase, uiConfig }
