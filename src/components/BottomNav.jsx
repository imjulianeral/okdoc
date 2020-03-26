import React, { useState } from 'react'
import { Link } from 'gatsby'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Favorite, LocalHospital, Event, PersonPin } from '@material-ui/icons'
import { navBottomStyles } from './material/Material.config'

export default function BottomNav() {
  const [value, setValue] = useState()
  const classes = navBottomStyles()

  return (
    <BottomNavigation
      value={value}
      showLabels
      // onChange={(event, newValue) => {
      //   setValue(newValue)
      // }}
      className={classes.stickToBottom}
    >
      <BottomNavigationAction
        onMouseEnter={() => setValue(0)}
        component={Link}
        to={'/app/favoritos'}
        label="Favoritos"
        icon={<Favorite />}
      />
      <BottomNavigationAction
        onMouseEnter={() => setValue(1)}
        component={Link}
        to={'/app/doctores'}
        label="Doctores"
        icon={<LocalHospital />}
      />
      <BottomNavigationAction
        onMouseEnter={() => setValue(2)}
        component={Link}
        to={'/app/citas'}
        label="Citas"
        icon={<Event />}
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
