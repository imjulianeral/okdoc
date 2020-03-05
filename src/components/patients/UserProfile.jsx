import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'

import { Avatar } from '@material-ui/core'

import { FirebaseContext } from '../../firebase/context'
import useAuth from '../../hooks/useAuth'

export default function UserProfile() {
  const { firebase } = useContext(FirebaseContext)
  const user = useAuth()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) navigate('login')
    })
  }, [firebase])

  if (user === null) return <p>Loading...</p>
  return (
    <>
      <h2 style={{ marginTop: '5rem' }}>Bienvenido {user.displayName}</h2>
      <Avatar alt={user.displayName} src={user.photoURL} />
    </>
  )
}
