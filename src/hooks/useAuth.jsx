import { useState, useEffect } from 'react'
import useFirebase from '../hooks/useFirebase'

export default function useAuth() {
  const [user, setAuthUser] = useState(null)
  const [fetchingUser, setLoading] = useState(true)
  const firebase = useFirebase()

  useEffect(() => {
    if (!firebase) return
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
      setLoading(false)
    })
  }, [firebase])

  return { user, fetchingUser }
}
