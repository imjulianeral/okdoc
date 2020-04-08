import React, { useContext } from 'react'

import FirebaseUIAuth from 'react-firebaseui-localized'
import { FirebaseContext } from '../firebase/context'
// import { uiConfig } from '../firebase'

export default function FirebaseUI() {
  const { firebase } = useContext(FirebaseContext)

  return (
    <>
      {firebase && (
        <FirebaseUIAuth
          firebase={firebase}
          lang="es_419"
          config={{
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // We will display Google and Email as auth providers.
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            signInSuccessUrl: '/app/perfil',
          }}
          auth={firebase.auth()}
        />
      )}
    </>
  )
}
