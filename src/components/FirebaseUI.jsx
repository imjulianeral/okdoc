import React, { useContext } from 'react'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { FirebaseContext } from '../firebase/context'

export default function FirebaseUI() {
  const { firebase } = useContext(FirebaseContext)

  return (
    <>
      {firebase.auth && (
        <StyledFirebaseAuth
          uiConfig={firebase.uiConfig}
          firebaseAuth={firebase.auth}
        />
      )}
    </>
  )
}
