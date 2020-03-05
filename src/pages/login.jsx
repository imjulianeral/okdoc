import React from 'react'

import FirebaseUI from '../components/FirebaseUI'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const Login = () => {
  return (
    <Layout>
      <SEO title="Iniciar Sesión" />
      <h2 style={{ marginTop: '5rem' }}>Iniciar Sesión</h2>
      <FirebaseUI />
    </Layout>
  )
}

export default Login
