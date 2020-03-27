import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'

import { FirebaseContext } from '../../firebase/context'

import useProfile from '../../hooks/useProfile'
import Spinner from '../Spinner'
import ProfileForm from '../userForm/ProfileForm'
import ProfileData from './ProfileData'
import SEO from '../SEO'

export default function UserProfile() {
  const { firebase } = useContext(FirebaseContext)
  const { userRecord, children, isLoading } = useProfile()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return navigate('login')
    })
  }, [firebase])

  if (isLoading) return <Spinner />

  return (
    <>
      <SEO title="Perfil" />

      {typeof userRecord === 'undefined' ? (
        <ProfileForm />
      ) : (
        <ProfileData user={userRecord} children={children} />
      )}
    </>
  )
}
