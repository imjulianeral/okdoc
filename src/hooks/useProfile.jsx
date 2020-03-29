import { useState, useEffect } from 'react'
import { firebase } from '../firebase'

import useAuth from './useAuth'

export default function useProfile() {
  const [userRecord, setUserRecord] = useState()
  const [children, setChildren] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { user, fetchingUser } = useAuth()

  useEffect(() => {
    if (user === null) return
    if (!fetchingUser) {
      const getProfile = async () => {
        const parent = await firebase.firestore().doc(`/users/${user.uid}`)

        const userData = await parent.get()

        const parentChildren = await firebase
          .firestore()
          .collection('children')
          .where('parent', '==', parent)
          .get()

        loopChildren(parentChildren)
        setUserRecord(userData.data())
        setIsLoading(false)
      }
      getProfile()
    }
  }, [fetchingUser, user])

  function loopChildren(snapshot) {
    const child = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    setChildren(child)
  }

  return { userRecord, children, isLoading }
}
