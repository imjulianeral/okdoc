import React, { useContext } from 'react'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { FirebaseContext } from '../firebase/context'
import { uiConfig } from '../firebase'

export default function FirebaseUI() {
  const { firebase } = useContext(FirebaseContext)

  return (
    <>
      {firebase && (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </>
  )
}
