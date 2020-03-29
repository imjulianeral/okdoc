import React, { useState } from 'react'
import { Link } from 'gatsby'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import {
  LocalHospital,
  PersonPin,
  AccessibilityNew,
  SupervisorAccount,
} from '@material-ui/icons'
import { navBottomStyles } from './material/Material.config'

export default function BottomAdmin({ user }) {
  const [value, setValue] = useState()
  const classes = navBottomStyles()

  if (user === null) return null
  return (
    <BottomNavigation
      value={value}
      showLabels
      className={classes.stickToBottom}
    >
      <BottomNavigationAction
        onMouseEnter={() => setValue(0)}
        component={Link}
        to={'/app/doctores'}
        label="Doctores"
        icon={<LocalHospital />}
      />
      <BottomNavigationAction
        onMouseEnter={() => setValue(1)}
        component={Link}
        to={'/app/usuarios'}
        label="Usuarios"
        icon={<AccessibilityNew />}
      />
      <BottomNavigationAction
        onMouseEnter={() => setValue(2)}
        component={Link}
        to={'/app/admins'}
        label="Administradores"
        icon={<SupervisorAccount />}
      />
      <BottomNavigationAction
        onMouseEnter={() => setValue(3)}
        component={Link}
        to={'/app/perfil'}
        label="Perfil"
        icon={<PersonPin />}
      />
    </BottomNavigation>
  )
}
