import React from 'react'

import FirebaseUI from '../components/FirebaseUI'
import { Paper, Container } from '@material-ui/core'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const Login = () => {
  return (
    <Layout>
      <SEO title="Iniciar Sesión" />
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          style={{ marginTop: '5rem', color: '#163a5f', padding: '1rem' }}
        >
          <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
          <FirebaseUI />
        </Paper>
      </Container>
    </Layout>
  )
}

export default Login
