import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import useProfile from '../../hooks/useProfile'
import useAuth from '../../hooks/useAuth'
import Spinner from '../Spinner'
import ProfileForm from '../userForm/ProfileForm'
import ProfileData from './ProfileData'
import SEO from '../SEO'

export default function UserProfile() {
  const { user, fetchingUser } = useAuth()
  const { userRecord, children, isLoading } = useProfile()

  // useEffect(() => {
  //   if (!user && !fetchingUser) return navigate('login')
  // }, [user, fetchingUser])

  if (isLoading && fetchingUser) return <Spinner />

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
