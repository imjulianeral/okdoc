import React, { useEffect, useContext, useState } from 'react'
import { navigate } from 'gatsby'

import { FirebaseContext } from '../firebase/context'
import useAuth from '../hooks/useAuth'

import Layout from './Layout'
import Spinner from './Spinner'

export default function Dates() {
  const [isLoading, setIsLoading] = useState(true)
  const { firebase } = useContext(FirebaseContext)
  const user = useAuth()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return navigate('login')
      setIsLoading(false)
    })
  }, [firebase, user])

  if (!user || isLoading) return <Spinner />

  return (
    <Layout>
      <h2 style={{ marginTop: '7rem' }}>Dates</h2>
    </Layout>
  )
}
