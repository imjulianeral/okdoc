import { fireConfig } from './config'

let app, uiConfig

;(async () => {
  if (typeof window !== 'undefined') {
    app = await import('firebase/app')

    await import('firebase/auth')
    await import('firebase/firestore')
    await import('firebase/storage')
    await import('firebase/analytics')

    app.initializeApp(fireConfig)
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
})()

export { app as firebase, uiConfig }
