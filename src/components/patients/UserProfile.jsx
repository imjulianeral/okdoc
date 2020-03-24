import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import { Avatar } from '@material-ui/core'

import { FirebaseContext } from '../../firebase/context'
import useAuth from '../../hooks/useAuth'
import Spinner from '../Spinner'
import ProfileForm from '../userForm/ProfileForm'

export default function UserProfile() {
  const [userRecord, setUserRecord] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { firebase } = useContext(FirebaseContext)
  const user = useAuth()

  useEffect(() => {
    if (!firebase.apps) return
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return navigate('login')
      if (user !== null) {
        const fetchUserData = async () => {
          const userData = await firebase
            .firestore()
            .doc(`/users/${user.uid}`)
            .get()

          setUserRecord(userData.data())
          setIsLoading(false)
        }
        fetchUserData()
      }
    })
  }, [firebase])

  if (!user || isLoading) return <Spinner />

  return (
    <>
      {typeof userRecord === 'undefined' ? (
        <ProfileForm />
      ) : (
        <>
          <h2 style={{ marginTop: '5rem' }}>Bienvenido {user.displayName}</h2>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </>
      )}
    </>
  )
}
