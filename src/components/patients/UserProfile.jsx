import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { Container } from '@material-ui/core'

import { FirebaseContext } from '../../firebase/context'

import useAuth from '../../hooks/useAuth'
import Spinner from '../Spinner'
import ProfileForm from '../userForm/ProfileForm'
import ProfileData from './ProfileData'
import SEO from '../SEO'

export default function UserProfile() {
  const [userRecord, setUserRecord] = useState()
  const [children, setChildren] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { firebase } = useContext(FirebaseContext)
  const user = useAuth()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return navigate('login')
      if (user !== null) {
        const fetchUserData = async () => {
          const parent = await firebase.firestore().doc(`/users/${user.uid}`)

          const userData = await parent.get()

          const parentChildren = await firebase
            .firestore()
            .collection('children')
            .where('parent', '==', parent)
            .get()

          setUserRecord(userData.data())
          setChildren(parentChildren)
          setIsLoading(false)
        }
        fetchUserData()
      }
    })
  }, [firebase])

  if (!user || isLoading) return <Spinner />

  return (
    <Container>
      <SEO title="Perfil" />

      {typeof userRecord === 'undefined' ? (
        <ProfileForm />
      ) : (
        <ProfileData user={userRecord} children={children} />
      )}
    </Container>
  )
}
