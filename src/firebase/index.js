// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/analytics'

import { fireConfig } from './config'

let app
// const getFirebaseInstance = async () => {
//   if (typeof window !== 'undefined') {
//     app = await import('firebase/app')

//     await import('firebase/auth')
//     await import('firebase/firestore')
//     await import('firebase/storage')
//     await import('firebase/analytics')

//     if (app.apps.length === 0) {
//       app.initializeApp(fireConfig)
//       uiConfig = {
//         // Popup signin flow rather than redirect flow.
//         signInFlow: 'popup',
//         // We will display Google and Email as auth providers.
//         signInOptions: [
//           app.auth.GoogleAuthProvider.PROVIDER_ID,
//           app.auth.EmailAuthProvider.PROVIDER_ID,
//         ],
//         signInSuccessUrl: '/app/perfil',
//       }
//     }
//   }
// }

// getFirebaseInstance()

export default async function getFirebase() {
  if (typeof window !== 'undefined') {
    app = await import('firebase/app')

    await import('firebase/auth')
    await import('firebase/firestore')
    await import('firebase/storage')
    await import('firebase/analytics')

    if (app) return app
    app.initializeApp(fireConfig)
    console.log(app)
    return await app
  }
  return null
}

// export { app as firebase, uiConfig }
