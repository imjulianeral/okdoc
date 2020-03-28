import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/Layout'
import UserProfile from '../components/patients/UserProfile'
import ProfileForm from '../components/userForm/ProfileForm'
import DoctorsList from '../components/doctors/DoctorsList'
import Favorites from '../components/Favorites'
import Dates from '../components/Dates'
import DoctorProfile from '../components/doctors/DoctorProfile'
import PrivateRoute from '../components/PrivateRoute'

export default function app() {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute component={UserProfile} path="/perfil" />
        <PrivateRoute component={ProfileForm} path="/editar-perfil" />
        <PrivateRoute component={DoctorsList} path="/doctores" />
        <PrivateRoute component={DoctorProfile} path="/doctor/:id" />
        <PrivateRoute component={Favorites} path="/favoritos" />
        <PrivateRoute component={Dates} path="/citas" />
      </Router>
    </Layout>
  )
}
