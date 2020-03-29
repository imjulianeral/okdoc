import React from 'react'

import useProfile from '../../hooks/useProfile'
import useAuth from '../../hooks/useAuth'
import Spinner from '../Spinner'
import ProfileForm from '../userForm/ProfileForm'
import ProfileData from './ProfileData'
import SEO from '../SEO'

export default function UserProfile() {
  const { fetchingUser } = useAuth()
  const { userRecord, children, isLoading } = useProfile()

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
