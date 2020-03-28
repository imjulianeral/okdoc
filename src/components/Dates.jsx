import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import useAuth from '../hooks/useAuth'

import Layout from './Layout'
import Spinner from './Spinner'

export default function Dates() {
  const { user, fetchingUser } = useAuth()

  // useEffect(() => {
  //   if (!user && !fetchingUser) return navigate('login')
  // }, [user, fetchingUser])

  if (fetchingUser) return <Spinner />

  return (
    <Layout>
      <h2 style={{ marginTop: '7rem' }}>Dates</h2>
    </Layout>
  )
}
