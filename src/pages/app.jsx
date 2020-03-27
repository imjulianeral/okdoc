import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/Layout'
import UserProfile from '../components/patients/UserProfile'
import ProfileForm from '../components/userForm/ProfileForm'
import DoctorsList from '../components/doctors/DoctorsList'
import Favorites from '../components/Favorites'
import Dates from '../components/Dates'
import DoctorProfile from '../components/doctors/DoctorProfile'

export default function app() {
  return (
    <Layout>
      <Router basepath="/app">
        <UserProfile path="/perfil" />
        <ProfileForm path="/editar-perfil" />
        <DoctorsList path="/doctores" />
        <DoctorProfile path="/doctor/:id" />
        <Favorites path="/favoritos" />
        <Dates path="/citas" />
      </Router>
    </Layout>
  )
}
