import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/Layout'
import UserProfile from '../components/patients/UserProfile'
import DoctorsList from '../components/doctors/DoctorsList'
import Favorites from '../components/Favorites'
import Dates from '../components/Dates'

export default function app() {
  return (
    <Layout>
      <Router basepath="/app">
        <UserProfile path="/perfil" />
        <DoctorsList path="/doctores" />
        <Favorites path="/favoritos" />
        <Dates path="/citas" />
      </Router>
    </Layout>
  )
}
