import React, { useContext } from 'react'

import FirebaseUIAuth from 'react-firebaseui-localized'
import { FirebaseContext } from '../firebase/context'
import { uiConfig } from '../firebase'

export default function FirebaseUI() {
  const { firebase } = useContext(FirebaseContext)

  return (
    <>
      {firebase && (
        <FirebaseUIAuth
          firebase={firebase}
          lang="es_419"
          config={uiConfig}
          auth={firebase.auth()}
        />
      )}
    </>
  )
}
