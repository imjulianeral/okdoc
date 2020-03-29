import React from 'react'

import useAuth from '../hooks/useAuth'

import Layout from './Layout'
import Spinner from './Spinner'

export default function Dates() {
  const { fetchingUser } = useAuth()

  if (fetchingUser) return <Spinner />

  return (
    <Layout>
      <h2 style={{ marginTop: '7rem' }}>Dates</h2>
    </Layout>
  )
}
