import React from 'react'

import { Paper, Container } from '@material-ui/core'
import FirebaseUI from '../components/FirebaseUI'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const CrearCuenta = () => {
  return (
    <Layout>
      <SEO title="Crear Cuenta" />
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          style={{ marginTop: '5rem', color: '#163a5f', padding: '1rem' }}
        >
          <h2 style={{ textAlign: 'center' }}>Crear Cuenta</h2>
          <FirebaseUI />
        </Paper>
      </Container>
    </Layout>
  )
}

export default CrearCuenta
