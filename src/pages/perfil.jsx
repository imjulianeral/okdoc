import React from 'react'

import { Container } from '@material-ui/core'

import Layout from '../components/Layout'
import UserProfile from '../components/patients/UserProfile'

function Profile() {
  return (
    <Layout>
      <Container>
        <UserProfile />
      </Container>
    </Layout>
  )
}

export default Profile
