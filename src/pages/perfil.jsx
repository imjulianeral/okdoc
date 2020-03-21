import React from 'react'

import { Container } from '@material-ui/core'

import Layout from '../components/Layout'
import UserProfile from '../components/patients/UserProfile'
import SEO from '../components/SEO'

function Profile() {
  return (
    <Layout>
      <SEO title="Perfil" />
      <Container>
        <UserProfile />
      </Container>
    </Layout>
  )
}

export default Profile
