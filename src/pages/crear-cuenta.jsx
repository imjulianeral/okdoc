import React from 'react'

import FirebaseUI from '../components/FirebaseUI'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const CrearCuenta = () => {
  return (
    <Layout>
      <SEO title="Crear Cuenta" />
      <h2 style={{ marginTop: '5rem' }}>Crear Cuenta</h2>
      <FirebaseUI />
    </Layout>
  )
}

export default CrearCuenta
