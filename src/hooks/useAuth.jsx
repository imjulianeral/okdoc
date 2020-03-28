import { useState, useEffect } from 'react'
import { firebase } from '../firebase'

export default function useAuth() {
  const [user, setAuthUser] = useState(null)
  const [fetchingUser, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])
  return { user, fetchingUser }
}
